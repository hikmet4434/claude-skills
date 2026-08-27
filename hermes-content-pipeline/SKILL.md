---
name: hermes-content-pipeline
description: Turn trending topics into a content brief — blog outline, post angles, and hooks — grounded in current web research. Use when the user wants a content plan, blog outline, or "what should I write about" based on what's trending. Read-only research; drafts only, no publishing.
---

# Content Pipeline

Generate a research-backed content brief. Read-only: it researches trends and
produces drafts/outlines. It never publishes or posts anywhere.

## Steps

1. **Set the lane.** Topic area + audience + format (blog, thread, newsletter).
   Default format: blog outline. Ask only if the topic is missing.
2. **Research trends** with `WebSearch` — what's being discussed in this niche in
   the last 1–2 weeks. Note recurring questions, debates, and gaps.
3. **Pick angles.** Propose 3–5 specific angles, each with: a working title, the
   hook (why someone clicks), and who it's for. Favor angles with a real point of
   view over generic listicles.
4. **Outline the top pick** (or one the user chooses):

   ```
   # Content Brief — <topic>

   ## Angle options
   1. **<title>** — hook. (audience)
   ...

   ## Outline: <chosen title>
   - **Hook:** ...
   - **Section 1 — ...:** key points
   - **Section 2 — ...:** key points
   - **CTA:** ...
   - **Sources to cite:** [link], [link]
   - **SEO:** primary keyword, 2–3 secondary
   ```

## Rules
- Ground trend claims in real, recent sources — link them in the brief.
- Output drafts and outlines only. Never auto-publish or post to any platform.
- If the user has a brand-voice setup, apply it; otherwise keep tone neutral and
  flag that voice should be set.
