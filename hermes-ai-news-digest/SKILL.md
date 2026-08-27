---
name: hermes-ai-news-digest
description: Generate a concise digest of recent AI/ML developments using web search — top releases, research, and industry news. Use when the user asks for an AI news roundup, weekly AI digest, or "what's new in AI". Read-only; no external posting unless explicitly asked.
---

# AI News Digest

Produce a scannable digest of notable AI/ML developments. Safe, read-only: it
searches the web and summarizes. It never posts anywhere unless the user
explicitly asks and names a destination.

## Steps

1. **Scope.** Default window is the last 7 days. If the user gives a window
   ("today", "this month") use that. Ask only if genuinely ambiguous.
2. **Search** across these angles with `WebSearch` (run several focused queries,
   not one broad one):
   - Major model / product releases (labs: Anthropic, OpenAI, Google, Meta, Mistral, etc.)
   - Notable open-source releases (Hugging Face trending, GitHub)
   - Research highlights (arXiv, papers with code)
   - Industry / funding / policy news
3. **Verify** each headline against at least the source page before including it.
   Drop anything you can't attribute to a real, dated source.
4. **Write the digest** in this shape:

   ```
   # AI Digest — <date range>

   ## 🚀 Releases
   - **<thing>** — one line on why it matters. [source](url)

   ## 🔬 Research
   - **<paper/finding>** — one line. [source](url)

   ## 🏢 Industry
   - **<event>** — one line. [source](url)

   ## TL;DR
   The 3 things actually worth your attention this week.
   ```

## Rules
- Every item links to a real source. No unsourced claims.
- Prefer primary sources (official blog, arXiv) over aggregators.
- Keep each bullet to one sentence. The digest is for skimming.
- Do not send to Slack/Telegram/email unless the user explicitly asks.
