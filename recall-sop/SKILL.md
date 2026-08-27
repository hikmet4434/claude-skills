---
name: recall-sop
description: >
  Standard operating procedure for using the Recall (getrecall.ai) knowledge base across all
  agents and workflows. Model-agnostic and harness-agnostic. Governs when to call Recall vs
  use active context, web search, or training knowledge; how to select and construct queries;
  how to evaluate results including empty results; failure mode taxonomy with mandatory user
  reporting (401/403 = reauth/re-key required, 429/5xx = wait/retry, MCP disconnect =
  reconnect); and efficiency metrics (hit rate, redundancy rate, latency, content utilization)
  to be tracked and reported for sessions with more than three Recall calls. Always load this
  skill before invoking any logimpint MCP tool. Applicable to Claude, n8n, Make, custom API
  integrations, and any other harness with Recall access.
---

# Recall Standard Operating Procedure

Model-agnostic, harness-agnostic wrapper for Recall (getrecall.ai) integration. Load this
before invoking any `logimpint` MCP tool. Governs: routing decisions, query construction,
result evaluation, failure reporting, and efficiency metrics.

---

## 1. Decision Framework

Evaluate in priority order — stop at first match:

```
1. Active context / project preload   → use it, skip Recall
2. Real-time / current data needed    → web search, skip Recall
3. KB likely has coverage             → Call Recall
4. None of the above                  → training knowledge, flag uncertainty
```

### SKIP — Use active context when:
- Answer is visible in the current conversation, project context, or preloaded skill/doc
- User has stated the information themselves this session
- Task is purely generative (no factual grounding needed)

### SKIP — Use web search when:
- Query requires real-time or current data (news, prices, live events)
- Information postdates reasonable KB save dates

### CALL Recall when:
- User references past research, saved content, or prior work ("that article I saved", "what I found about X")
- Query involves a domain with KB coverage: projects, research, Logos Imperium lore, Principia Shamanica, HSIM, saved bookmarks
- Cross-session continuity is needed and the answer is not in active context
- Agent needs grounding facts beyond training knowledge and the domain is non-real-time

### FALLBACK — Training knowledge when:
- Non-real-time but KB coverage is uncertain or unlikely
- Always flag: *"This is from training knowledge, not Recall — verify if currency matters."*

---

## 2. Tool Selection Matrix

| Goal | Tool |
|------|------|
| Broad semantic query | `search` |
| Filter by date, tag, or source URL | `filter_by_metadata` |
| Known document, need full content | `get_document_content` |
| Unknown KB structure / session start | `explore_kb` |

### Query Construction Rules
- Keep queries **3–7 words**, specific, content-noun-focused
- Never use meta-words ("discuss", "conversation about", "topic of") — use the actual subject
- Use `filter_by_metadata` with date ranges when recency matters
- For broad coverage, run 2–3 distinct `search` calls with varied angles rather than one omnibus query
- Long paste-in? Extract 2–4 distinctive keywords; never query with full text

---

## 3. Result Evaluation Protocol

### Results returned
1. Extract relevant content
2. Cite source document / URL in response
3. Supplement with training knowledge where needed, explicitly flagging the distinction
4. Note if results appear partial: *"Recall returned X but may not cover Y"*

### Empty results — do NOT assume gap immediately
1. Run `explore_kb` to inspect KB structure
2. If KB has relevant categories but no results → possible index lag or query mismatch → retry with different terms
3. If KB has no relevant categories → genuine gap → proceed with training knowledge, flag it

### Results seem stale or mismatched
Flag: *"Recall returned [X] — this may be outdated. Verify if currency is critical."*

---

## 4. Failure Mode Taxonomy

**All failures MUST be reported** with: error type, likely cause, and recommended action.

| Symptom | Code | Likely Cause | User Action? | Response |
|---------|------|-------------|--------------|----------|
| Authentication error | 401 | API key expired or revoked | **YES** — re-issue key in getrecall.ai settings | `Recall auth failed (401). API key needs re-issuing.` |
| Access denied | 403 | Wrong scope or revoked OAuth | **YES** — reauth / reconnect MCP | `Recall access denied (403). Reconnect logimpint in Claude settings.` |
| Rate limited | 429 | Too many requests in window | NO — wait and retry | Retry after 30–60s; report if persists >3 attempts |
| Server error | 500 | Service-side failure | NO — retry once | If persistent: `Recall service error (500). May be temporary.` |
| Service unavailable | 503 | Traffic / downtime | NO — backoff | Exponential backoff: 10s → 30s → 60s; then report |
| Empty results | — | Nothing saved OR index lag | Maybe | Run `explore_kb`; distinguish genuine gap from index issue |
| Timeout | — | Large query or network issue | NO — retry narrower | Retry with more specific query; report if repeated |
| Malformed response | — | API schema change | **YES** — wrapper update needed | `Recall response format unexpected. Wrapper may need updating.` |
| Tool not found / MCP error | — | MCP connector disconnected | **YES** — reconnect | `Recall MCP not connected. Reconnect logimpint in Claude settings.` |

### Failure Report Template
Every failure surfaces to the user in this structure:

```
⚠️ Recall failure: [error type / code]
Likely cause: [one line]
Recommended action: [user action required OR wait/retry]
Workflow status: [continuing with degraded state / halted]
```

---

## 5. Efficiency Metrics

Track per session when **>3 Recall calls** are made. Report at session end or on request.

| Metric | Definition | Target | Flag if |
|--------|-----------|--------|---------|
| Hit rate | % of calls returning usable results | >70% | <50% |
| Redundancy rate | % of calls where answer was already in context | <15% | >25% |
| Retry rate | % of calls requiring a retry | <20% | >30% |
| Failure rate | % of calls resulting in error | <5% | >10% |
| Query latency | Time from call to result | <3s avg | >5s |
| Content utilization | % of returned chunks actually used in response | >50% | <30% |

### Session Efficiency Report Format

```
📊 Recall session metrics
─────────────────────────
Calls made:          N
Hit rate:            X%
Redundancy:          X%  [note if high: increase pre-call context checks]
Failures:            N   [detail types if any]
Avg latency:         Xs
Content utilization: X%
```

---

## 6. Agent Integration

### System prompt snippet (paste into any agent)

```
You have access to a Recall knowledge base via the logimpint MCP connector.
Tools: search, filter_by_metadata, get_document_content, explore_kb.

Recall SOP:
1. Check active context first — only call Recall if the answer is not already present.
2. Tool selection: search (semantic), filter_by_metadata (date/tag/source),
   get_document_content (known doc), explore_kb (unknown KB structure).
3. Report ALL Recall failures using the standard failure template:
   error type / likely cause / recommended action / workflow status.
4. Sessions with >3 Recall calls: report efficiency metrics at session end.
5. Empty results ≠ nothing saved — run explore_kb to verify before concluding a gap.
```

### n8n / Make / direct API
- Recall MCP endpoint: `https://backend.getrecall.ai/mcp`
- Auth: Bearer token (API key from getrecall.ai settings)
- Error handling: 401/403 → halt + notify; 429/503 → retry with backoff; 500 → retry once then notify
- Cross-session metrics: write to Notion, Google Sheets, or a dedicated log endpoint

---

## 7. Known Limitations

- KB is only as good as what has been saved — gaps are normal
- **Index lag**: newly saved content may not be immediately searchable
- MCP connector is session-bound; auth tokens can expire between sessions
- Content utilization metrics are self-reported by the agent and may be approximate

---

## Revision History

| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2026-05-24 | Initial version |
