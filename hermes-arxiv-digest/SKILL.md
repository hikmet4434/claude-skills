---
name: hermes-arxiv-digest
description: Scan recent arXiv papers on given topics and produce short summaries with takeaways. Use when the user wants a paper digest, arXiv roundup, or summaries of recent research in an area (e.g. LLMs, agents, RAG). Read-only.
---

# arXiv Paper Digest

Summarize recent arXiv papers on the user's topic(s). Read-only and citation-first.

## Steps

1. **Get the topic(s)** from the user. If none given, default to the topic of the
   current project or ask one short question.
2. **Find papers.** Use the Hugging Face MCP `paper_search` tool when available
   (it indexes arXiv), otherwise `WebSearch` against `arxiv.org`. Pull the most
   recent / most relevant 5–10 papers. Default window: last 7 days.
3. **For each paper**, read the abstract (fetch the arXiv abstract page) and capture:
   - Title + authors (first author et al.) + arXiv id
   - The problem it tackles (1 line)
   - What's new / the key result (1 line)
   - Link
4. **Write the digest:**

   ```
   # arXiv Digest — <topic> — <date range>

   ### <Title>  (arXiv:XXXX.XXXXX)
   <First author> et al.
   - **Problem:** ...
   - **New:** ...
   - [abstract](https://arxiv.org/abs/XXXX.XXXXX)

   ## Pick of the batch
   The one paper worth reading in full, and why.
   ```

## Rules
- Always include the real arXiv id and link; verify it resolves.
- Summarize only from the abstract/paper, never from memory of the title.
- If the user has Obsidian or a notes path configured and asks to save, write a
  markdown file — otherwise just output the digest in chat.
