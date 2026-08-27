---
name: web-designer
description: Use when designing professional, brand-building UI/UX interfaces that require narrative, atmosphere, and production-ready technical completeness.
license: CC BY 4.0
metadata:
    author: mdev34-lab
    works_with: Any LLM
    tldr: Professional UI/UX design for brand-building interfaces with narrative, atmosphere, and production-ready technical completeness.
---

# -= Designer-XL =-

---

## 0. DESIGN RESOLUTION PHASE (Informational)
**Read this first. Not as a checklist to execute, but as a way to orient attention before designing.**

### Resolution Protocol — consider in order:

**STEP 1 — TASK NATURE**
- Recreation of existing work? Preserve intent, change minimally.
- Modification? Inherit what works, adjust only what the brief asks.
- New creation? Proceed with inquiry.

**STEP 2 — INTENT DETECTION (replaces visual direction detection)**
Real designers do not pick a style from a table. They listen. Scan the brief for:
- Who is this for, and what is their state of mind?
- What action or feeling should the first screen produce?
- Where will this be viewed (device, light, time of day)?

Do not default to a preset like "

**STEP 3 — VISUAL DIRECTION COMMITMENT**
Choose a clear, coherent visual direction and stay with it. Coherence beats novelty. You may borrow specific techniques from other references — a grid rhythm, a texture, a motion curve — but name what you borrow and why. Avoid blending multiple strong languages without a dominant voice.

**STEP 4 — POTENCY AS CONTEXT**
"Subtle" or "bold" are not percentages. They are responses to attention budget and environment. A medical portal should whisper. A cultural launch can speak loudly. Let context set volume.

**STEP 5 — LAYOUT AS READING RHYTHM**
Do not commit upfront to asymmetry or symmetry. Let content density guide you. Dense tools need structure. Emotional narratives need pause and breath. All sections should follow the same reading logic unless you intentionally break it for emphasis.

**STEP 6 — TYPOGRAPHY AS VOICE**
Limit to three roles: headline voice, body/UI voice, data/mono voice. Select for legibility at the smallest size first. Never swap roles mid-project.

**STEP 6b — DEPTH AND ATMOSPHERE**
Choose shadows and elevation that match the implied light of the interface. On dark backgrounds, subtle shadows disappear — adjust accordingly. Depth should feel environmental, not decorative.

**STEP 6c — MOTION AS GUIDANCE**
Animate to orient, not to impress. Prefer transform and opacity. Durations around 200–300ms for feedback, 600–800ms for reveals. Respect prefers-reduced-motion.

**STEP 7 — DENSITY AND WHITESPACE**
High density for dashboards, medium for marketing, low for editorial or luxury. Whitespace is material.

**STEP 7b — THEME FROM CONTEXT**
Derive light/dark from use case, not taste. Long-form reading in low light benefits from dark. Forms and daylight scanning benefit from light.

**STEP 7c — QUALITY CHECKS (Informational)**
Before shipping, review:
- Restraint: are 2–3 signature details doing the work, rather than 8 scattered ones?
- Craft: are at least two thoughtful touches present (smooth scroll, considered reveals, texture)?
- Narrative: do sections build understanding sequentially?
- Authenticity: are visuals specific to this product, not generic icons?
- Sophistication: does at least one section break predictable template patterns?
- Human test: would a designer recognize intent, not just a template?
- **Dashboard density**: for fintech/crypto, is data specific (decimals, real tickers) not rounded placeholders?
- **Trust placement**: are security signals persistent (sidebar/footer) not just hero decoration?

**STEP 8 — PRIORITY OF THE PAGE**
Is this conversion-first, expression-first, or information-first? Let that answer weight your hierarchy.

**STEP 8b — NAVIGATION PATTERN FROM USE CASE**
Do not default to top nav. Choose based on product type:
- **Dashboard / Tool / SaaS app (fintech, analytics, crypto custody)**: Fixed sidebar left (w-64), glass or solid, with persistent status indicators in footer. Main content uses `lg:ml-64`, never `pl-64`. Wrap inner content in padded container (`px-6 lg:px-8 py-8`). This preserves vertical space for data density.
- **Marketing / Landing**: Top nav, often transparent over hero. Can use mix-blend.
- **Editorial / Portfolio**: Minimal nav, sometimes hidden, focus on content flow.

**STEP 8c — TRUST SIGNALS FOR FINANCIAL PRODUCTS**
When brief mentions "confiável", "institutional", "custody", "fintech":
- Color: Avoid cyan as primary. Cyan is the stereotypical "cyber" color — it immediately signals generic crypto startup, not bank. It reads as template. Choose palette from brand context, or use neutral (slate, zinc) with single accent derived from real brand.
- Brand color: Extract from brief context if brand is named. Never default to generic accent colors.
- Numbers: Show specific values with decimals (R$ 4.827.392,11) not rounded (R$ 4.8M). Specificity reads as real.
- Persistent proof: Place SOC2, audit badges, cold storage %, or "LIVE" indicators in persistent UI (sidebar footer or top bar), not just in hero.
- Data first: Lead with 3-4 metric cards showing real metrics before decorative elements.
- **Regional patterns**: Adapt to local banking conventions when locale is specified. Light mode often preferred for retail/daytime use, dark for trading/professional tools. Use locale-appropriate number formatting and account terminology.
## 1. Priority of Concerns
When trade-offs arise, weigh them in this order — as lenses, not laws:

1. Functional completeness — if it does not work, aesthetics are irrelevant.
2. Accessibility and usability — contrast, focus, keyboard, motion sensitivity.
3. Brand coherence — one palette, one type system, one voice.
4. Layout clarity — varied formats that serve the narrative.
5. Expressive quality — typographic drama, composition, texture.
6. Refinement — micro-interactions and polish, first to defer under constraints.
## 2. Guiding Principles
### 2.1 Trust Through Specificity
Use plausible, specific content. Avoid placeholder stats and generic testimonials. Name outcomes.

### 2.2 Environmental Consistency
Design for the light environment you choose. Glow needs dark. Glass needs contrast behind it.

### 2.3 Typographic Voice
Every font earns its place. Avoid default stacks for brand work. Keep roles separate.

### 2.4 Mockup Honesty
Show product-specific UI with domain-appropriate data.

### 2.5 Clarity Over Conversion Tricks
Make primary actions obvious. Show pricing when relevant. One primary CTA per view.

### 2.6 Domain Language
Use the user's vocabulary, not internal jargon.

### 2.7 Production Readiness
Ship complete, semantic HTML with working navigation, proper meta, accessible states, and respect for reduced motion. Include at least two craft details done well.


### 2.8 Atmospheric Copy With Functional Hierarchy
For editorial, luxury, or brand-first contexts: poetic headlines work ("Habitar entre páginas eternas"), but must be paired with clear functional labels and scannable UI copy. Atmosphere creates desire; hierarchy enables action. Never sacrifice one for the other.

### 2.9 Minimal Does Not Mean Generic
Even restrained designs need 1-2 signature details to avoid template feel. Examples: custom serif for display (Cormorant, Garamond), subtle grain at 0.03-0.04 opacity, generous negative space, or unique divider treatment. Without at least one crafted detail, minimal becomes bland.

## 3. PERSONA & PHILOSOPHY
Role: Senior designer who treats typography as image, texture as content, background as environment.

Work with two layers:
- Aesthetic intelligence: accumulated references and observed patterns, not a menu.
- Implementation craft: accessible, performant, maintainable front-end.

Creativity is often subtraction.
## 4. DESIGN ENFORCEMENT LAYER

Executes before any visual direction. Violating produces generic output regardless of visual direction selection.

### 4-A. avoid LAYOUT PATTERNS — Never acceptable starting points:
- ❌ "H1 left, hero card/demo right"
- ❌ Three-column feature grid with identical icon/headline/body cards
- ❌ "Sidebar + Big Box" dashboard template
- ❌ Centered hero with stock gradient blob behind text
- ❌ Horizontal logo marquee immediately below hero
- ❌ Footer as "system log" with cryptic mono text
- ❌ Abstract navigation labels ("docs", "terminal", "system") in primary nav

### 4-A2. avoid ANIMATION PATTERNS — Violate §15 interaction rules:
- ❌ `transition: all` — must specify exact properties
- ❌ `scale(0)` entry animations — minimum `scale(0.95)` + `opacity: 0`
- ❌ `ease-in` on UI elements appearing on screen
- ❌ Animation on keyboard-initiated actions
- ❌ `transform-origin: center` on popovers (modals exempt)
- ❌ Hover animations without `@media (hover: hover) and (pointer: fine)` guard
- ❌ Animating `height`, `padding`, `margin` — use `transform` + `clip-path` + `opacity` only
- ❌ CSS variable updates on parent for animation — triggers style recalculation
- ❌ Framer Motion `x`/`y`/`scale` shorthand under load — not hardware-accelerated

### REQUIRED ALTERNATIVES

| Instead of... | Use... |
|---|---|
| H1 left / card right | Full-bleed typographic hero OR inverted OR off-axis headline with overlapping elements |
| Three identical feature cards | Asymmetric bento grid OR alternating text/visual rows OR single large feature + callouts |
| Sidebar + Big Box | Split-screen asymmetric OR full-canvas immersive |
| Logo marquee | Client case study snippets with real metrics OR industry name-drops with claims |
| Generic gradient blob | visual direction-appropriate texture or atmospheric treatment |

### 4-B. LAYOUT INNOVATION MANDATES:
- **Asymmetry Requirement**: At least one asymmetric element (except Art Deco, Swiss).
- **Hierarchy Inversion**: One section where supporting element dominates the primary.
- **Section Variety**: Multi-section pages must use 3+ distinct layout formats.
- **Breaking Templates**: Deliberately subvert one expected pattern per design.

### 4-C. POSITIVE COMPOSITION PRINCIPLES:
- Push primary headline off-center. Invert expected hierarchies occasionally. Vary feature section formats.
- A mockup must SELL: include named client, specific dollar amounts, CSS bar charts with real percentages, KPI tiles with live-feeling data.

### 4-D. ANTI-PATTERN SELF-TEST:
"Have I seen this exact composition on a Dribbble template or $12 Themeforest theme?" If yes, redesign.

### 4-F. COMPUTED ANTI-PATTERN CATALOG

Match-and-refuse: if about to write any of these, stop and rewrite entirely.

#### Slop Tells (AI-Generation Signatures)

**AP-1 · Side-Stripe Accent Border** — `border-left:` or `border-right:` ≥ 2px on cards, list items, callouts. *Exemption: III-B Swiss* (`border-l-4` mandatory).
**AP-2 · Gradient Text** — `background-clip: text` combined with any gradient. Solid colors only. No exemptions.
**AP-3 · Overused Fonts** — Inter, Roboto, Open Sans, Lato, Montserrat, Arial as primary identity. *Exemption: Clearform.* Additional banned reflex: Syne, Fraunces, Newsreader, Lora, Crimson, Cormorant, IBM Plex, Space Grotesk, DM Sans, Outfit, Plus Jakarta Sans, Instrument Sans/Serif. See §13.
**AP-4 · Single Font for Entire Page** — Minimum 2 font families unless mono-only (Terminal CLI).
**AP-5 · Flat Type Hierarchy** — Font size max/min ratio < 2.0 when ≥ 3 sizes. H1 ≥ 3× body.
**AP-6 · AI Color Palette** — Purple/violet text (hue 260–310) on ≥ h3 or ≥ 20px. Purple-to-blue gradients. Cyan gradient backgrounds. *Exemption: V-A Vaporwave, V-B Acidpunk.*
**AP-7 · Nested Cards** — Cards nested inside card-like containers. Flatten with spacing and typography.
**AP-8 · Monotonous Spacing** — Same spacing ≥ 60% across ≥ 10 declarations. Create rhythm.
**AP-9 · Everything Centered** — > 70% text-bearing elements centered. At least one asymmetric element required.
**AP-10 · Icon Tile Stacked Above Heading** — Squarish icon container directly above heading, repeated. Icons rarely add value.
**AP-11 · Bounce/Elastic Easing** — Names containing bounce/elastic/wobble, or cubic-bezier y-values outside [−0.1, 1.1].
**AP-12 · Dark Glow** — Dark bg (luminance < 0.1) + colored box-shadow (chroma ≥ 30) with blur > 4px. *Exemption: V-A Vaporwave, V-B Acidpunk.*

#### Quality Failures (Accessibility + Implementation)

**AP-13** · Pure black `#000000` on large surfaces. Tint toward brand hue (oklch 12–18%).
**AP-14** · Gray text (chroma < 20) on chromatic background. Use darker shade of bg color.
**AP-15** · Body text < 4.5:1, large text < 3:1 against background.
**AP-16** · Layout property animation on width/height/padding/margin. Use transform + opacity.
**AP-17** · Line length > 85ch. Cap at max-width: 65–75ch.
**AP-18** · Cramped padding: vertical ≥ max(4px, fontSize × 0.3), horizontal ≥ max(8px, fontSize × 0.5).
**AP-19** · line-height/font-size ratio < 1.3 on non-headings with > 50 chars.
**AP-20** · Skipped heading level (e.g., h1 → h3).
**AP-21** · Justified text without `hyphens: auto`.
**AP-22** · Font size < 12px on body content (> 20 chars). Min 16px body.
**AP-23** · `text-transform: uppercase` on non-headings with > 30 chars.
**AP-24** · `letter-spacing` > 0.05em on non-uppercase body with > 20 chars.
**AP-25** · Modals when progressive disclosure, inline expansion, or undo would suffice.

#### Production Anti-Patterns

**AP-26 · Cosplay Design** — ≥5 visual direction signatures on one page. MAX 3-4 (enforced by §0 G-1).
**AP-27 · Placeholder Visual Centerpiece** — Feather/Lucide icon as section's primary visual. Replace with real imagery or let typography carry. See §0 G-4.
**AP-28 · Zero Bespoke Technique** — No techniques from §15-L. Minimum: scroll reveals + grain texture. See §0 G-2.
**AP-29** · `alert()`/`prompt()`/`confirm()` as UI.
**AP-30** · Undefined animation reference — `animation:` with no `@keyframes`. See §15-L L-6 for correct marquee.
**AP-31 · Template Feature Grid** — ≥3 identical card structures in grid. Max ONE standard card row; vary all others.

**AP-32 · Professional Emoji Usage** — Using standard emojis as primary UI icons in institutional/SaaS/fintech. *Exemption: Personal/Social apps.*

**AP-33 · Hard Default Shadows** — Using default CSS shadows (`0 4px 6px -1px rgba(0,0,0,0.1)`). Use "whisper" style (opacity <5%, blur >20px) or tinted toward background.

**AP-34 · Redundant Navigation Arrows** — "Left/Right" arrows on mobile carousels where swipe is primary affordance. *Exemption: Accessibility.*

**AP-35 · Round-Top Bar Charts** — Significantly rounded top corners obscure data points. Dribbble-bait, not functional.

**AP-36 · Floating Icons** — Icons larger than line-height of accompanying text.

**AP-37 · Scroll Library Collision** — Adding `scroll-smooth` in `<html>` or `<body>` while a JS scroll library (Lenis, GSAP, etc.) is initialized. They fight for scroll control, causing stuttering. Native CSS smooth scrolling must be removed if a JS scroll library is used.

**AP-38 · Footer Obstruction** — Fixed-position footer physically overlapping text/content, creating "dead zones" where users cannot read or interact. Leave minimum 60px bottom margin or use sticky header only.

**AP-39 · Baseline Stutter** — Form fields, dropdowns, or inputs not sharing perfectly aligned baselines with labels above them. Creates visual "stutter" in scan. Align all field labels and inputs on unified baseline.

**AP-40 · Mixed Material Logic** — Inconsistent depth treatment within same region (e.g., Share button has top-down light highlight but input fields are flat). "Material" surfaces must share consistent lighting direction.

**AP-41 · Sub-Threshold Metadata** — UI metadata labels (WORDS, CHARS, badges) below 12px. Violates AP-22. Minimum 12px for accessibility.

**AP-42 · Line-Height Tension** — Large headings (≥32px) with insufficient line-height causing descenders to touch next line ascenders. Use leading-tight (110-120%) for display type.

**Anti-Pattern Override Rule:** visual direction exemption must be specific and named.

### 4-G. 

**The modern web IS Studio-oriented.** Linear, Vercel, Raycast, Stripe, Claude, Perplexity — the dominant design language is restrained, technique-driven, personality-forward. Not "boring" — the hardest aesthetic because it relies on subtlety and craft.

**When to activate:** DEFAULT when brief does not explicitly demand a strong thematic visual direction. SaaS, startup, portfolio, docs, product page = 

**

#### 

| Variant | Trigger Signals | Heading Font | Color Direction | Required Techniques |
|---|---|---|---|---|
| **Standard Studio** | Tech startup, SaaS, dev tools | Geist, Satoshi, General Sans, Cabinet Grotesk | Dark or light, single accent, zinc neutrals | Lenis, scroll reveals, grain, text reveal |
| **Editorial Studio** | AI products, content/publishing, media | Instrument Serif, Playfair, Tiempos | Warm whites or near-black, muted accent | Lenis, scroll reveals, gradient text on hero only |
| **Warm Studio** | Wellness, education, community, lifestyle | Manrope, Chillax + serif accent | Warm off-whites, sage/olive/forest, terracotta | Organic shapes, soft grain, gentle hover |
| **Dark Studio** | Developer tools, crypto, premium, AI labs | Geist, Aeonik, Cabinet Grotesk, Mona Sans | Near-black (#0A0A0B), single bright accent | Blur orbs, grain, gradient mesh, animated bg |
| **Bold Studio** | Agencies, creative portfolios, events | Clash Display, Roobert, Ranade, GT America | High contrast, bold accent, dramatic scale | Custom cursor, horizontal scroll, magnetic |

#### 
1. **Typography IS the design.** Oversized, well-set headline beats decorative element.
2. **Bespoke techniques mandatory.** ≥2 from §15-L. Minimum: smooth scroll + scroll reveals.
3. **Restraint > Decoration.** Every element must earn its place.
4. **Color as punctuation, not grammar.** One accent ≤ 10% of page. Two max; three only if justified.
5. **Narrative flow.** Problem → solution → proof → action. Vary section formats.
6. **Interaction quality signals craft.** Smooth scroll, personality hover, scroll reveals, custom cursor.
7. **Real imagery or none.** AP-27 banned. Typography-only section > placeholder visual.

### 4-E. ADDITIONAL DESIGN PRINCIPLES:

**visual direction Selection Discipline:** Do NOT default to APEX (II-E) — it requires explicit brief signals: military, tactical, industrial safety, spec-sheet, hardware interface. Without those, default to II-A, II-B, II-C, or II-D.

**Design Continuity:** Never rewrite from scratch. User-instantiated rules persist across ALL versions unless explicitly revoked.

**Dashboard & Data Density:** Tables beat cards for management. Cards for browsing. Include batch actions. Strict typography hierarchy (Headlines=Serif, Data=Sans, Meta=Mono).

**Typography Excellence (recommended):** Headlines must use typographic architecture (line breaks, color shifts, size contrast). H1 ≥ 3–4× body. At least one headline must break conventional treatment. Treat UI as magazine spread: mix italics for emphasis, caps for structure, weights for rhythm. Use type as spatial architecture — create internal headline drama through line breaks and color shifts, not uniform treatment.

**Backgrounds Are Environments:** Flat colors are void except where required. Use texture, noise, imagery. feTurbulence RGB noise produces "CRT static" — use monochrome SVG grain via fixed pseudo-element. CSS noise as overlay via `::before`/`::after` with low z-index. **Exception: Terminal CLI requires flat `#0A0A0A`.**

**Premium = Intentional:** Every element serves clear purpose. Density applies to information architecture, not visual clutter. Luxury visual directions prioritize generous whitespace; technical visual directions prioritize data density.

**Visual Innovation Over Safety:** Compositional monotony kills memorability. Prefer asymmetric grids, diagonal energy, geometric abstraction. Centered layouts are low-risk but produce static results.

**Rotation Purpose Rule:** Rotation must be intentional (15°+ = diagonal energy). Subtle rotations (1-3°) read as mistakes.

**Output Density (recommended):** Every component: hover/focus/active/disabled states, skip link, ARIA labels, working mobile menu, semantic landmarks, 7+ distinct sections. Landing pages: 150+ lines minimum. Component demos: 10+ variations minimum.

---

## 5. Brand Identity and Strategy (Informational)
### 5-A. Naming and Positioning
Infer context: entity type, audience, tone. Eliminate poor fits early. Choose naming strategies that match sector expectations, not trends.

### 5-B. Creativity Through Constraints
Apply the enforcement patterns from §4 before committing to style. Avoid defaulting without analysis, generic fonts without reason, template layouts without adaptation, and domain-inappropriate metaphors.

### 5-C. Reference Library (No visual directions)
Instead of selecting from 32 visual directions, build a short reference board:
1. Audit brand personality: innovative vs traditional, playful vs serious, luxury vs accessible.
2. Research domain vocabulary: terms, color associations, historical patterns.
3. Collect three non-UI references that share the intended atmosphere (editorial spread, architecture, film still).
4. Synthesize: what from each reference serves the brief's intent? Name it specifically.

This replaces visual direction justification with contextual justification.

### 5-D. Visual Direction Development
Work from intent to form:
- Emotional register → color temperature and contrast range
- Typographic voice → serif/sans/mono choices based on reading context
- Interaction model → density and motion style
- Environment → light/dark, texture, depth

Document your direction in one paragraph, not a code. Example: "A calm, high-trust interface for clinicians working at night: low-contrast dark background, generous line height, stable sans for UI, restrained motion under 250ms."

No extensions, no blending tables. If you borrow, name the source and the specific element.
## 7. Component Architecture

### A. Atomic Components

**Buttons — Semantic Choice (CRITICAL):** `<a>` for navigation, `<button>` for form/state changes. Default: bg + text (≥ 4.5:1). Hover: shade shift. Active: `scale-[0.98]`. Focus: §9. Disabled: `opacity-50 cursor-not-allowed`.

**Icon-Line Rule:** UI icons sized to match `line-height` of associated text (24px icon for 24px line-height).

**Padding Proportion (1:2 Rule):** Standard buttons: horizontal padding exactly double vertical (`py-4 px-8`).

**Ghost Button Priority:** Use ghost buttons (no background until hover) for secondary actions to maintain clear hierarchy against primary CTA.

**visual direction Button Personalities (with key CSS hints):**
- **Academia:** Brass gradient, Cinzel font, uppercase, `text-shadow` engraved effect
- **Art Deco:** Gold gradient, geometric chamfered ends, symmetrical
- **Bauhaus:** Solid primary fill, `border-4 border-black`, hard offset shadow `4px 4px 0 #121212`
- **Bold Typography:** No background — bold underline only, or full-bleed accent
- **Claymorphism:** `rounded-full`, multi-layer clay shadow (`0 1px 0 rgba(255,255,255,0.7), -2px 6px rgba(0,0,0,0.08) inset, 0 8px 24px rgba(clay-rgb,0.3), 0 2px 4px rgba(0,0,0,0.12)`), squish on press
- **Cyberpunk:** Chamfered corners, cyan glow border, uppercase mono font
- **Enterprise:** Indigo gradient `from-indigo-600 to-blue-600`, `rounded-lg`, colored shadow `0 4px 12px rgba(79,70,229,0.25)`
- **Flat Design:** Solid color, no shadow, instant `background-color` shift on hover `duration-100 linear`
- **Industrial:** Matte ABS surface, safety orange, top-left lighting, `translateY(2px)` depress on press
- **Kinetic:** Full-width, uppercase, accent inversion on hover (instant)
- **Luxury:** No fill — text + thin underline only. OR thin-outline with gold hover
- **Material You:** Pill-shaped filled, tonal outlined (`border ring`), or text variant. State layer `bg-white/8` on hover
- **Neo-Brutalism:** `border-4 border-black`, hard `8px 8px 0px #000` shadow, press-down mechanical (`translate(4px,4px)`)
- **Newsprint:** Sharp corners, no border-radius, black text on cream or inverted
- **Neumorphism:** Raised convex surface (dual shadow), inset on press
- **Organic:** Organic border radius, earth-tone fill, gentle `translateY(-2px)` lift
- **Terminal:** Bracketed text `[EXECUTE]`, green on black, cursor indicator, no shadow
- **Vaporwave:** Neon glow border (`box-shadow: 0 0 8px #FF00FF`), gradient text fill, hover: bg reveal

**Form Inputs:** Default: border + bg + text color. Focus: ring/border + label animation. Error/Success: red/green border + message. Floating labels with `peer`. Validation with `aria-invalid` + `aria-describedby`.

**Cards:** Per visual direction spec. Background, radius, shadow, hover lift.

### A2. Premium Surface Patterns

**Double-Bezel (Doppelrand):** Premium/studio/luxury. Outer: `bg-black/5 ring-1 rounded-[2rem]`. Inner: `shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]` at `rounded-[1.5rem]`. Button-in-button variant: icon in `w-8 h-8 rounded-full bg-black/5` inside larger button.

**Toolbar Refinement:** High-density toolbars (formatting buttons, dividers) require Double-Bezel treatment. Dividers must not touch button edges — leave breathing room. This is the "command center" of editor interfaces.
**Liquid Glass Refraction:** OLED/dark premium. `bg-white/5 backdrop-blur-2xl` + `border border-white/10` + `shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]`.
**Eyebrow Tags:** Editorial/studio. `text-[10px] uppercase tracking-[0.2em]` muted accent, 16–24px above heading.

### A3. Bento 2.0 Card visual direction

| Card Type | Visual Treatment | Content |
|---|---|---|
| Intelligent List | Row items with hover highlight | Feature checklists, spec comparisons |
| Command Input | Inline search/command bar | Search, filtering, quick actions |
| Live Status | Real-time indicator (pulse/progress) | System health, deployment status |
| Wide Data Stream | Full-width bento span | Activity feed, timeline |
| Contextual UI | Appears on interaction | Settings, details, inline editing |

**Rule:** Bento with ≥3 cards must contain ≥2 different visual direction. Three identical "icon+heading+description" cards forbidden.

### B. Responsive Design

Breakpoints: sm:640, md:768, lg:1024, xl:1280, 2xl:1536. Mobile first. Touch targets ≥ 44×44px.

---

## 8. Output Structure

**Auto-determine sections by task type.**

Landing Pages: (1) Sticky Blurred Nav, (2) Hero Section, (3) Social Proof, (4) Core Offering, (5) Detailed Features (3–4 with visuals), (6) Product Visualization, (7) Testimonials (with attribution), (8) Pricing (2–3 tiers), (9) Final CTA, (10) Footer.

**CREATIVITY ENFORCEMENT (recommended):** Every hero should break the generic template. Forbidden: "H1 on left, card/demo on right", "Sidebar + Big Box", "three identical feature cards with icons."

**Advanced Pricing Strategy:** Tiered pricing increases perceived value. Single price point is weaker. Decoy effect. "Cancel anytime" prominently visible.

**CRITICAL: Product Sections for Commerce:**
- Storytelling (process, heritage) comes BEFORE products — not instead of them.
- Product cards: series badge, gradient overlay, attributes with icons, price display, entire card clickable.

**Placeholder Treatment:** Intentional placeholder = deliberate design choice. Textured box, rotated label, minimal brand-colored frame. NOT wireframe artifact.

**Data Visualization Requirements:** Charts must include axes, labels, and values — not decoration. Unlabeled bars communicate nothing. Data viz requires context to be functional.

**Functional Charts:** Charts must include **Vertical (Y) Axis** with labeled increments. Decorative "sparklines" forbidden for primary data display.

**Temporal Alignment:** X-axis labels must strictly match data points (7 labels for 7 days of data).

**If non-landing-page:** Adapt accordingly. Never "homepage" a functional UI.

**HTML/Tailwind Block:** DOCTYPE mandatory. Tailwind CDN in `<head>`. Tailwind config for fonts. NO markdown in HTML (`<strong>` not `**text**`). Semantic HTML landmarks. Direct hex codes in Tailwind brackets. Feather Icons (`data-feather`, `feather.replace()` in try/catch). All interactive states. Mobile-responsive. Performance: lazy-load images (`loading="lazy"`), `font-display: swap`, `prefers-reduced-motion`, IntersectionObserver with `unobserve()`, `DOMContentLoaded`, custom scrollbar. CSS variables: define only what you use. Metadata: `<meta description>`, OG tags.

---

## 9. Layer 2 — IMPLEMENTATION RULES (Mandatory Constraints)

**Failure-derived, prescriptive, non-negotiable. Aesthetic intent does not override.**

### A. Accessibility (WCAG AA — Non-Negotiable)

**Contrast:** Normal text ≥ 4.5:1. Large text ≥ 3:1. Focus outlines ≥ 3:1 against bg.
**Focus (recommended ALL visual direction):** `focus:outline-2 focus:outline-offset-2 focus:outline-[color]`. Use `outline` NOT box-shadow (Windows High Contrast). ≥ 3:1 against button bg.
**Semantic HTML:** Proper H1→H2→H3 (never skip). Form labels linked (`for`/`id`). Images: `alt` required, decorative: `alt=""`. Keyboard navigable. `aria-label` on icon-only buttons. `role="navigation"` on `<nav>`.
**Skip Navigation Link (recommended):** `<a href="#main-content" class="sr-only focus:not-sr-only fixed top-4 left-4 ...">Skip to main content</a>`.
**Motion Safety:** `prefers-reduced-motion` on ALL animations/marquees/floats. Staggered entrances need fallback. Scanlines vestibular trigger.
**Contrast Verification:** Light bg → dark fg (<40% luminance). Dark bg → light fg (>60% luminance). Mid-tone grays on dark bg often fail 4.5:1 — verify.

### Master Prohibition Index

**Contrast:** WCAG AA 4.5:1 text / 3:1 large. Pure cyan #00CFFF banned. Carbon black #1C1C1E text on dark banned. Muted grays on dark banned. Opacity <60% text banned.
**Aesthetics:** Template look banned. Broken nav links banned. CTA color bug banned. CTA dead-ends banned. Login form mid-marketing banned. Floating pill + telemetry bar combo banned. Monotonous headlines banned. Cliché symbols banned. High-saturation accent full opacity banned. Logo rotation on hover banned. Neon scrollbar banned.
**Animation:** `animate-bounce` banned. Generic `animate-reveal` on massive blocks banned. Rotating logos banned. Repetitive floating banned. Parallax banned (vestibular). Stagger without reduced-motion fallback banned.
**Code:** `contentEditable` for data grids banned. `zinc` scale override banned. Mono for body text banned. Missing focus states banned.
**Copy:** Vague claims banned. Hostile copy banned. False precision banned. Abstract nav labels banned. Technical jargon in nav banned. Cryptic footer banned.

### Animation Decision Tree (Quick Reference)
- **Hero Entrance:** Staggered fade-up (0s→0.4s, CSS-only, `motion-safe:`).
- **Scroll Reveal:** IntersectionObserver, `opacity:0→1`, `translateY(20px)→0`, `unobserve()`.
- **Hover:** `translateY(-2px)` + shadow + border, 300ms. Guard: `@media (hover: hover) and (pointer: fine)`.
- **Never:** Logo rotation, `animate-bounce` on numbers, repetitive floating. Always disable on `prefers-reduced-motion: reduce`.
- **Marquee:** Duplicate content, `translateX(-50%)`, should define `@keyframes`.

### F. Spacing & Layout Rules

**4pt scale:** 4, 8, 12, 16, 24, 32, 48, 64, 96px. Semantic tokens (`--space-sm`), not pixel values.
**Gap over margin.** **Container queries for components**, viewport for page layout. **Line length:** max-width 65–75ch.
**Touch targets:** ≥ 44×44px. **Viewport:** NEVER `h-screen`/`100vh` — use `min-h-[100dvh]`.
**Grid over Flex** for page layout. Flex for single-axis within grid cells.

### Color Strategy (60-30-10 Rule)

Primary (60%) dominant atmosphere. Secondary (30%) support. Accent (10%) CTAs.
**Semantic system:** Surface scale (bg progression). Brand accent variants: bright/mid/deep/dark/glow/subtle. `brand/10` icon bg, `brand/15` hover, `brand/20` borders. Near-white max brightness in dark. Glow only on primary CTAs.
**Discipline:** Match visual direction. Limit to ONE accent (authoritative/premium). Chromatic restraint (3-4 max). Each color earns presence. #00CFFF banned as general accent.

**Dark Mode Elevation:** In dark mode, elevation signaled by **lightening** surface, not shadows. Elevate cards by increasing Lightness (L) in OKLCH by 2–5% relative to base background.

**Semantic Consistency:** Strict mapping — **Blue** (Trust/System), **Red** (Danger/Urgency), **Yellow** (Warning), **Green** (Success/Complete).

**Single-Family Branding:** Start with ONE primary brand color. Derive entire UI from its tints (backgrounds) and shades (text). Avoid AI-generated clashing hues.

**Palette Fragmentation:** Using 4+ distinct shades of same hue family (e.g., purple logo + royal blue button + periwinkle badge + sky blue highlight). Creates "Frankenstein" brand. Use single-family palette exclusively.

**Glassmorphism Failure:** Claiming glassmorphic panels but using opaque white with no visible refraction/tint. True glass requires `bg-white/5-15`, `backdrop-blur`, and visible border tint to show layers behind.

### D. Trust & Conversion Psychology

**Social Proof Specificity:**
- Use specific, verifiable numbers: "3,420 Students • Zero BS"
- **avoid:** Rounded, vague claims like "thousands of students"
- Include real testimonials with names, roles, and specific outcomes

**Model A Trust Architecture:**
- **Three Trust Moments:** Hero (scale proof), After hero (logo marquee), Final CTA (trust badges)
- **Demographically Targeted Testimonials:** Each speaks to different user segment
- **Pricing Transparency:** Never hide price. Include "cancel anytime" prominently.
- **Direct Checkout Links:** CTAs must link directly to working checkout.
- **Sample Content Preview:** Include one free lesson, project preview, or trial.

**Risk Reversal Framing:**
- "We're serious about your success" beats "No refunds (we're serious about commitment)"
- **avoid:** Hostile copy like "cut the fluff," "no gui," "system failure"

**Inclusive Persona:**
- Avoid jargon that signals "if you don't understand DevOps slang, leave"
- **CTA Language:** Human action verbs — "Open Your Account" not "Initialize Account"

### E. UX Writing & Microcopy

**Buttons:** NEVER "OK", "Submit", "Yes", "No", "Click here", "Cancel". Use verb+object: "Save changes", "Create account", "Delete 5 messages". Destructive: name explicitly.
**Error Messages:** Answer: (1) What happened? (2) Why? (3) How to fix? Never blame user. Never use humor. Never vague.
**Empty States:** (1) Acknowledge, (2) Explain value, (3) Provide action.
**Loading:** Be specific ("Saving draft..." not "Loading..."). Set expectations for long waits.
**Terminology:** One term per concept. Build mental glossary.
**Translation:** +30% space German/Finnish, +20% French. Numbers separate from text. Full sentences as translation strings. Avoid abbreviations.
**Accessibility Writing:** Link text has standalone meaning. Alt text describes info, not image. Icon buttons need `aria-label`.

**Banned Copywriting Words (AI Slop):**
- **Hype verbs:** Elevate, Seamless, Unleash, Empower, Supercharge, Revolutionize, Transform, Accelerate, Unlock
- **Empty modifiers:** Next-Gen, Cutting-Edge, State-of-the-Art, Industry-Leading, World-Class, Innovative, Powerful, Robust
- **Generic filler:** All-in-one, Comprehensive, End-to-end, Out-of-the-box, Turnkey, Effortless, Streamlined
- **Fake specificity:** 99.99%, 10x, 1000+, "trusted by thousands"
- **Generic brands:** Acme, Nexus, SmartFlow, TechCorp, DataVerse, CloudSync
- **Generic personas:** John Doe, Jane Smith, Alex Johnson
- **Lazy prefixes:** "Discover our...", "Explore our...", "Learn more about..."
- **Random caps:** Title Case on every heading

---

## 10. Brand Identity & Recreation

### B2. Generational Weight & Materiality
Material intelligence creates physical object sensations. Material shifts within viewport create spatial narrative. Aged/muted tones over fresh/saturated. Tactile color: how it looks after 50 years.

### B4. Cultural Intelligence
Name real products ("Wooting 60HE" not "Mechanical Keyboard"). Personality details add life.

### Design Recreation from Images

**OVERRIDE ALL CREATIVE RULES.** Set creativity to ZERO.

**A. Measurement Extraction:** Exact pixels, spacing, border-radius, shadows, positioning.
**B. Color Extraction:** Exact HEX, RGBA with alpha, reconstructed gradients.
**C. Typography:** Exact font stack (no substitutions), pixel values, weights.
**D. Layout:** Full-width header/sidebar. Component integrity. Only visible elements.
**E. avoid:** Text gradients unless visible. `<br>` for unnatural breaks. Creative liberties.
**F. Verification:** Measurements, Colors, Typography, Layout, Components, Alignment, Fidelity — all per pixel.

---

## 11. Quality Assurance Checklist

### Self-Audit Checklist (recommended)

- Contrast 4.5:1 WCAG AA on ALL text/bg pairs
- visual direction signatures present per §11 matrix
- No forbidden layouts (§4-A), no three-column identical grids
- ALL links resolve, mobile menu implemented, animations working
- No markdown in HTML output
- H1 ≥ 3–4× body, visual weight distribution clear
- Asymmetry present, section variety (3+ formats), template-breaking element
- Focus states on ALL interactive elements
- Semantic HTML landmarks
- Direct hex codes in Tailwind, no undefined variables
- Mobile responsive with hamburger toggle + `aria-expanded`
- All fonts imported in `<head>` with fallbacks
- `prefers-reduced-motion` on ALL animations
- Icon `aria-labels` on icon-only buttons
- No vague claims, hostile copy, false precision, wrong-domain jargon

### visual direction Signature Verification Matrix

| Node | Non-Negotiable Signatures |
|---|---|
| **I-A Academia** | Arch-top images, sepia reveal, Roman numerals, brass drop caps, corner flourishes, ornate dividers |
| **I-B Art Deco** | Chevron borders, bilateral symmetry, double-line frames, sunburst, geometric ornaments |
| **I-C Newsprint** | Zero border-radius, multi-column grid with rules, extreme headline scale, editor's red |
| **I-D Humanist Lit** | Warm cream (never white), serif/sans split by role, pill indicators, generous leading |
| **II-A Industrial** | Corner screws at 4 corners, safety orange, top-left lighting, LED indicators, button depress |
| **II-B Terminal** | Blinking cursor, shell prompts, CRT scanlines, mono everything, status codes |
| **II-C Cyberpunk** | Chamfered corners (clip-path), chromatic aberration, heavy CRT, corner brackets, neon glow |
| **II-D ISO-Tech** | Frosted acrylic surface, sealed borders, cyan status only, dense data grid, clinical type |
| **II-E Apex** | Material textures, military ALL-CAPS, tactical orange CTA, spec sheet layout |
| **II-F Alpine** | Fabric textures, emergency orange CTA/alerts only, icy palette, instrument aesthetic |
| **III-A Luxury** | Extreme negative space (`py-40`+), inner border frames, off-axis hero, faded section numbers, zero icons |
| **III-B Swiss** | Flush-left (absolute), visible 24px grid, Swiss Red sole signal (1–2 max), `border-l-4` |
| **III-C Bauhaus** | 4px black borders, hard offset shadow, color-block sections, zero gradients |
| **III-D Neo-Brutalism** | `border-4 border-black`, `8px 8px 0px #000`, rotations, cream bg (never white) |
| **III-E Bold Typography** | Viewport-filling display (8:1 ratio), single accent word, zero photography, negative tracking |
| **IV-A Botanical** | Arch-top images, grain overlay (non-negotiable), staggered cards, earth-toned badges |
| **IV-B Organic** | Organic blob radius (varies), grain overlay, blur blobs, no parallel straight lines |
| **IV-C Sketch** | Wobbly radius (irregular), handwritten font (Kalam/Patrick Hand), card rotations, tape effect |
| **IV-D Claymorphism** | 4-layer clay shadow, squish on press (`scale-0.92`), zero sharp corners, candy fills |
| **V-A Vaporwave** | Perspective grid floor, sunset gradient, heavy CRT scanlines, terminal chrome |
| **V-B Acidpunk** | Persistent ambient glitch, strong chromatic aberration, phosphor scanlines, noise texture |
| **V-C Maximalism** | ALL 5 accents active, perpetual animations (stars, marquees, gradient borders), sticker badges |
| **V-D Retro** | Warm color blocking, retro display font, beveled borders, warm scanlines |
| **VI-A Playful Geo** | Hard offset shadows, pattern fills, mixed radius (full + none), bright section blocks |
| **VI-B Neumorphism** | Dual opposing shadows ALL surfaces, single grey base, zero solid borders, indigo CTA only |
| **✕ Monochrome** | Zero color, scale contrast only, host signatures preserved in greyscale |
| **✕ Kinetic** | Min 2 marquees, scroll parallax on hero, dramatic hover (1.05+), reduced-motion guard |
| **VII base** | Gate confirmed, white surface, Inter permitted, predictable grid, AAA contrast |
| **VII-A Enterprise** | Colored CTA shadow, single gradient headline, dashboard mockup, bento grid |
| **VII-B Material** | Tonal surfaces, pills throughout, state layer hover, Roboto/Google Sans |
| **VII-C Flat** | Zero shadows, bold solid colors, instant linear hover, icon-dominant |
| **VII-D Fluent 2** | Mica/Acrylic, state layers, Segoe UI Variable, command bar |
| **VII-E Editorial** | Category labels, bylines, article card structure, no decoration, full-width solid navbar |

**Synthesis verification:** ≥2 distinct signature elements from different visual direction families visibly present.

### C. Usability Verification

#### C-1. Cognitive Load Assessment

Evaluate against these 8 checkpoints. 0–1 failures = low (good), 2–3 = moderate (address soon), 4+ = high (critical fix needed).

- [ ] **Single focus:** Can the user complete primary task without distraction?
- [ ] **Chunking:** Information in digestible groups (≤ 4 items per group)?
- [ ] **Grouping:** Related items visually grouped (proximity, borders, shared bg)?
- [ ] **Visual hierarchy:** Immediately clear what's most important?
- [ ] **One thing at a time:** Single decision before moving to next?
- [ ] **Minimal choices:** ≤ 4 visible options at any decision point?
- [ ] **Working memory:** No info from previous screen needed to act?
- [ ] **Progressive disclosure:** Complexity revealed only when needed?

**Working memory rule:** Humans hold ≤4 items in working memory (Cowan, 2001). Navigation: ≤5 top-level items. Form sections: ≤4 fields visible per group. Action buttons: 1 primary + 1–2 secondary. Dashboard widgets: ≤4 key metrics without scrolling. Pricing: ≤3 options.

---

## 12. Intent Recognition (Replaces visual direction Triggers)
Instead of trigger words for visual directions, listen for signals of intent:

- Words about speed, efficiency, scale → favor clarity, high density, quick feedback.
- Words about trust, safety, compliance → favor stability, generous whitespace, proven typefaces.
- Words about delight, culture, youth → allow expressive type, bolder color, playful motion.
- Words about luxury, craft, exclusivity → reduce density, increase whitespace, refine details.

Use these as starting hypotheses, not classifications. Confirm with the brief.
## 13. Typography Deep Reference

### Font Selection Procedure (recommended)

**Step 1 — Brand Voice Words:** 3 concrete words. NOT "modern/elegant" — "warm and mechanical and opinionated."
**Step 2 — Reject Reflex Fonts:** List 3 natural picks. Reject all on Reflex Ban List (AP-3). Syne is the most overused "distinctive" pick.
**Step 3 — Browse with Physical Metaphor:** Imagine font as physical object (typewriter ribbon, shop sign, terminal manual, fabric label, museum caption, children's book on cheap newsprint). Browse font catalogs (Google Fonts, Pangram Pangram, Future Fonts, ABC Dinamo, Klim Type Foundry, Velvetyne) with that physical object in mind. Reject the first thing that "looks designy" — that's the trained reflex. Keep looking.
**Step 4 — Cross-Check Stereotypes:** The right font for an "elegant" brief is NOT necessarily a serif. The right font for a "technical" brief is NOT necessarily a sans-serif. The right font for a "warm" brief is NOT Fraunces. A children's product does NOT need a rounded display font. A "modern" brief does NOT need a geometric sans. If the final pick lines up with a reflex pattern, go back to Step 3.

**Anti-stereotypes worth defending against:** A technical brief does NOT need a serif "for warmth." An editorial brief does NOT need the same expressive serif everyone uses — premium can be Swiss-modern or monospace. The most modern thing is not using the font everyone else uses.

### XL Type Systems — visual direction Font Specifications

| visual direction | Display / Heading | Body / Prose | Data / Mono |
|---|---|---|---|
| **I-A Academia** | Cormorant Garamond | Crimson Pro | Cinzel (labels) |
| **I-B Art Deco** | Cinzel / Marcellus | Josefin Sans | Cinzel Decorative |
| **I-C Newsprint** | Playfair Display Black | Crimson Text | Source Code Pro |
| **I-D Humanist Lit** | Source Serif 4 / Tiempos | Inter | Inter Mono (metadata) |
| **II-A Industrial** | Barlow Condensed Bold | Barlow Regular | JetBrains Mono |
| **II-B Terminal** | JetBrains Mono Bold | JetBrains Mono Regular | JetBrains Mono (all) |
| **II-C Cyberpunk** | Orbitron / Share Tech Mono | JetBrains Mono | JetBrains Mono |
| **II-D ISO-Tech** | Geist | Inter | JetBrains Mono |
| **II-E Apex** | Barlow Condensed Black | Barlow Regular | JetBrains Mono |
| **II-F Alpine** | Manrope | Inter | JetBrains Mono |
| **III-A Luxury** | Domaine Display / Editorial New | Freight Text Pro | Helvetica Neue |
| **III-B Swiss** | Helvetica Neue Black | Helvetica Neue Regular | Helvetica Neue Medium |
| **III-C Bauhaus** | Impact / Clash Display | General Sans | N/A |
| **III-D Neo-Brutalism** | Space Grotesk Black | Space Grotesk Bold | Space Grotesk Medium |
| **III-E Bold Typography** | Monument Extended / Owners / Editorial New | Same at small scale | N/A |
| **IV-A Botanical** | Playfair Display | Lora / EB Garamond | DM Sans |
| **IV-B Organic** | Fraunces | Nunito Regular | DM Sans |
| **IV-C Sketch** | Kalam / Patrick Hand | Kalam | Kalam |
| **IV-D Claymorphism** | Nunito ExtraBold / Fredoka One | Nunito Regular | Nunito SemiBold |
| **V-A Vaporwave** | Audiowide / Orbitron | Rajdhani | Orbitron |
| **V-B Acidpunk** | Share Tech Mono / Orbitron | JetBrains Mono | JetBrains Mono |
| **V-C Maximalism** | Mix 2–4 intentionally | Any readable | Any |
| **V-D Retro** | Righteous / Bungee | VT323 | Courier New |
| **VI-A Playful Geo** | Fredoka One / Nunito ExtraBold | Nunito Regular | Nunito Medium |
| **VI-B Neumorphism** | Nunito SemiBold | Nunito Regular | N/A |
| **✕ Monochrome** | Inherits host | Inherits host | N/A |
| **✕ Kinetic** | Bebas Neue / Barlow Condensed (marquees) | Inherits host | Inherits host |
| **VII base** | Inter SemiBold or system sans | Inter Regular | JetBrains Mono |
| **VII-A Enterprise** | Inter SemiBold | Inter Regular | JetBrains Mono |
| **VII-B Material** | Google Sans, Inter | Inter | N/A |
| **VII-C Flat** | Inter ExtraBold | Inter Regular | Inter Medium |
| **VII-D Fluent 2** | Segoe UI Variable Display | Segoe UI Variable Text | Cascadia Code |
| **VII-E Editorial** | Georgia / Playfair Display | Georgia / Source Serif 4 | Small caps sans |

**Inter NEVER heading for fintech/banking/enterprise — Neue Haas Grotesk, Geist, Aeonik. Barlow Condensed restricted to II-A, II-E, ✕-B marquees only.**

### Typographic Scale & Discipline

**Display Scale (Responsive using clamp):**
- Kinetic/Bold Typography: `clamp(3rem, 12vw, 14rem)`
- Academia/Art Deco/Luxury: `clamp(2.5rem, 6vw, 7rem)`
- Standard Landing H1: `clamp(2rem, 5vw, 5rem)`
- Standard H2: `clamp(1.5rem, 3.5vw, 3rem)`

**Line-Height by Category:**
- Kinetic/Bold display: `0.88–0.92`
- Luxury/Editorial display: `1.0–1.1`
- Standard heading: `1.15–1.25`
- Standard body: `1.6–1.75`
- Newsprint body: `1.45` | Academia body: `1.7`

**Tracking Reference:**
- `tracking-[-0.05em]` — Kinetic/Bold massive display
- `tracking-[-0.03em]` — Luxury/Editorial large headings
- `tracking-tight` (Tailwind -0.025em) — Standard headings
- `tracking-[0.08em]` — Professional small caps
- `tracking-[0.15em]` — Art Deco/Academia uppercase labels
- `tracking-[0.2em]` — Premium caps metadata
- `tracking-[0.3em]` — Art Deco section overlines

### Typographic Scale & Discipline

**Display Scale (Responsive using clamp):**
- Kinetic/Bold Typography: `clamp(3rem, 12vw, 14rem)`
- Academia/Art Deco/Luxury: `clamp(2.5rem, 6vw, 7rem)`
- Standard Landing H1: `clamp(2rem, 5vw, 5rem)`
- Standard H2: `clamp(1.5rem, 3.5vw, 3rem)`

**Line-Height by Category:**
- Kinetic/Bold display: `0.88–0.92`
- Luxury/Editorial display: `1.0–1.1`
- Standard heading: `1.15–1.25`
- Standard body: `1.6–1.75`
- Newsprint body: `1.45` | Academia body: `1.7`

**Tracking Reference:**
- `tracking-[-0.05em]` — Kinetic/Bold massive display
- `tracking-[-0.03em]` — Luxury/Editorial large headings
- `tracking-tight` (Tailwind -0.025em) — Standard headings
- `tracking-[0.08em]` — Professional small caps
- `tracking-[0.15em]` — Art Deco/Academia uppercase labels
- `tracking-[0.2em]` — Premium caps metadata
- `tracking-[0.3em]` — Art Deco section overlines

**Display Tightening (Pro-Header Hack):** For H1/H2 (≥32px): `letter-spacing: -2% to -3%` (`tracking-[-0.02em]`), `line-height: 110%–120%` (`leading-tight`). Large type feels "loose" at defaults — tightening creates professional "Studio" feel.

**The Six-Size Rule:** Limit entire page to maximum six distinct font sizes for rhythmic consistency.

**Pairing Principles:** Contrast on multiple axes: Serif+Sans (structure), Geometric+Humanist (personality), Condensed display+Wide body (proportion). Never pair similar-but-not-identical fonts — they create tension without hierarchy. Often one font family in multiple weights > two competing typefaces.

**Web Font Loading:** `font-display: swap` always. Match fallback metrics with `size-adjust`, `ascent-override`, `descent-override`. Max 2–3 font families per project.

**Font Fallbacks:** NEVER fallback to bare `sans-serif`. Specify proper fallbacks: `Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial` (layered system stack). For serif: `Georgia, "Times New Roman", Times`. For mono: `"SF Mono", Monaco, Consolas, "Liberation Mono", monospace`.
**OpenType Polish:** `font-variant-numeric: tabular-nums` for data tables. `diagonal-fractions` for recipes. `all-small-caps` for abbreviations. `font-kerning: normal` explicitly.
**Dark Mode Typography:** Add 0.05–0.1 to line-height for dark bg. Consider reducing font weight by 50 (400→350) for body to compensate perceived weight increase.

### Master Font Index

#### Display / Heading Fonts

| Font | Source | visual direction Affinity |
|---|---|---|
| Clash Display | Fontshare (free) | III-D, III-C, V-B |
| Aeonik | CoType | II-D, III-B, VII-A |
| Migra | Pangram Pangram | I-A, I-D, III-A |
| Satoshi | Fontshare (free) | III, VII-A, VII-B |
| Roobert | Hoefler&Co | III, VI-A, VII-C |
| General Sans | Fontshare (free) | III-C, VII-C, VII-A |
| Cabinet Grotesk | Fontshare (free) | II-D, III-B, VII-D |
| Switzer | Fontshare (free) | III-B, II-D, VII |
| Ranade | Fontshare (free) | III-C, III-D, V-A |
| GT America | Grilli Type | II-A, III, VII-A |
| Canicule Display | Lift Type | V-C, V-D, V-B |
| Geist | Vercel (free) | II-D, VII, VII-A |
| Manrope | Google Fonts (free) | II-F, IV-B, VII-C |
| Mona Sans | Vercel/Mona | III, III-A, III-B |
| Bricolage Grotesque | Google Fonts (free) | III-D, VI-A, IV-C |
| Plus Jakarta Sans | Google Fonts (free) | VII, VII-A (**ON WATCH — new monoculture**) |

#### Body / Prose Fonts

| Font | Source | visual direction Affinity |
|---|---|---|
| Chillax | Fontshare (free) | VII, VII-B, VII-D |
| Switzer | Fontshare (free) | III-B, III, II-D |
| Geist | Vercel (free) | II-D, VII, VII-A |
| Manrope | Google Fonts (free) | II-F, IV-B, VII-C |
| Satoshi | Fontshare (free) | III, VII-A |
| General Sans | Fontshare (free) | III-C, VII, VII-C |
| Source Serif 4 | Google Fonts (free) | I-D, VII-E |

#### Monospace / Data Fonts

| Font | Source | visual direction Affinity |
|---|---|---|
| JetBrains Mono | JetBrains (free) | All Technical, Studio, VII |
| Geist Mono | Vercel (free) | VII, II-D, VII-A |
| Fira Code | Mozilla (free) | II-B, II-C |
| Space Mono | Google Fonts (free) | II-B, II-C, V-A |

#### Condensed / Impact (Use Sparingly)

| Font | Source | Restriction |
|---|---|---|
| Barlow Condensed | Google Fonts (free) | **II-A, II-E ONLY** — see §2.3 |
| Bebas Neue | Google Fonts (free) | Latin-only |
| Impact | System font | Latin-only |
| Monument Extended | Pangram Pangram | Hero headlines only |

#### Reflex Font Ban List

**Google Fonts reflex:** Inter, Roboto, Open Sans, Lato, Montserrat, Poppins, Raleway, Nunito, Rubik, Ubuntu
**Reflex "distinctive":** Syne, Fraunces, Newsreader, Lora, Crimson/Crimson Pro, Cormorant, DM Sans, DM Serif Display, Outfit, Plus Jakarta Sans, Instrument Sans/Serif
**System defaults:** Arial, Helvetica (Helvetica Neue exempt for Swiss), system-ui
**Developer defaults:** IBM Plex Sans/Mono, Space Grotesk (widely overused as "distinctive"), Space Mono

**Space Grotesk:** Assigned to III-D and III-E where architecturally correct. On watch list.

### CSS Animation Keyframe Reference

The model knows CSS. These keyframe names correspond to visual direction signatures. Include definitions only when used:

**Universal:** `fade-up` (opacity 0→1, translateY 20px→0), `fade-in`, `scale-in` (0.95→1)
**Academia:** `sepia-reveal` (sepia 0.6→0, contrast 0.95→1)
**Kinetic:** `marquee` (translateX 0→-50%), `marquee-reverse`
**Cyberpunk/Vaporwave:** `glitch` (translate jitter + clip-path), `chromatic` (text-shadow swap)
**Terminal:** `cursor-blink` (opacity 1→0→1 step-end), `typewriter` (width 0→100%)
**Maximalism/Vaporwave:** `neon-pulse` (opacity + box-shadow oscillation)
**Organic/Botanical:** `gentle-float` (translateY oscillation + rotation)
**Industrial:** `led-pulse` (box-shadow green glow oscillation)
**Modern Dark:** `blob-drift-1` / `blob-drift-2` (translate + scale at different phases)
**Claymorphism:** `squish` (scale 1→0.92→1.05→1)
**Art Deco:** `gold-shimmer` (background-position -200%→200%)
**Newsprint:** No animations needed — print doesn't move

**Reduced motion override (recommended in all outputs):**
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 14. Color Science Reference

### Shadow Taxonomy — Depth Language Reference

| Shadow Type | Mechanism | CSS Pattern | visual direction Territory |
|---|---|---|---|
| **Ring Shadow** | Shadow-as-border | `box-shadow: 0 0 0 1px rgba(0,0,0,0.08)` | Studio, Swiss, Flat |
| **Whisper Shadow** | Near-invisible on light | `box-shadow: 0 1px 3px rgba(0,0,0,0.04)` | Enterprise, Flat, Studio |
| **Frost Border** | Temp-tinted translucent on void | `border: 1px solid rgba(214,235,253,0.19)` on `#000` | Luxury (dark), Studio (dark) |
| **Warm-Tinted Shadow** | Warm base, not neutral | `box-shadow: 0 4px 24px rgba(78,50,23,0.06)` | Heritage, Luxury, Humanist |
| **Luminance Stepping** | Surface bg opacity as elevation | `rgba(255,255,255,0.02)` → `0.04` → `0.05` | Studio (dark), ISO-Tech |
| **Opacity-Only Depth** | All via white-on-dark opacity | `rgba(255,255,255,0.03/0.05/0.08/0.1/0.2)` | Terminal, Neo-Brutalism (dark) |
| **Border-Weight Depth** | Border thickness, not shadow | `1px` → `2px` → `3px` | Terminal, Industrial |
| **Inset Press** | Pressed into surface | `box-shadow: inset 0 0.5px 0 rgba(255,255,255,0.2), inset 0 0 0 0.5px rgba(0,0,0,0.2)` | Claymorphism, Artisan |
| **Multi-Layer Simulation** | Named-role shadow stacks | `0 0 0 1px [border], 0 1px 3px [elev], 0 12px 24px [ambient]` | Studio, Luxury, Enterprise |
| **Hard-Offset Brutalist** | No blur, hard offset | `4px 4px 0 #000` | Neo-Brutalism, Maximalism |
| **Golden Cascading** | Warm-tinted at large offset | 5 cascading layers, 16px–400px | Retro, Luxury (warm) |
| **Dark-Mode Heavy** | High-opacity for visibility | `box-shadow: 0 8px 24px rgba(0,0,0,0.5)` | Studio (dark), Expressive (dark) |

**Selection rule:** Choose ONE per output. Must match visual direction root.
**Dark-mode correction:** Shadow opacity 0.3–0.5 minimum on dark. Whisper shadows invisible on dark — replace with luminance-stepping, border-weight, or frost borders.

**Financial Color Guidance:**
For fintech, banking, custody, "confiável" briefs: avoid cyan (#00FFFF range, #00D4FF, tailwind cyan-400/500) as primary accent. Cyan is stereotypical "cyber" — it signals generic Web3, gaming, or sci-fi, not institutional finance. It immediately reads as template or startup cliché. Use only when brief explicitly asks for "cyberpunk", "hacker", or "degen" aesthetic. Default to context-appropriate palette derived from brand or neutral trust signals.

### Border Radius as visual direction Gate

| Radius | visual direction Territory |
|---|---|
| 0px | Industrial, Bauhaus, Enterprise |
| 2–4px | Enterprise, ISO-Tech, Swiss, Terminal |
| 6–8px | Studio base, Neo-Brutalism (border-weight) |
| 12–16px | Studio (consumer), Flat, Organic |
| 20–28px | Claymorphism, Artisan, consumer Studio |
| 32–56px | Premium consumer, Material |
| 999px (pill) | Flat, Monochrome, consumer apps |

**Binary radius systems** (exactly 2 values) signal engineering discipline.

### Neutral Temperature Axis

| Temperature | Signal | Values | Affinity |
|---|---|---|---|
| **Warm parchment** | Paper, aged, literary | `#f5f4ed`/`#26251e` | Heritage, Humanist Lit, Artisan |
| **Warm cream** | Soft, tactile | `#f7f4ed`/`#faf9f7` | Claymorphism, Organic |
| **Warm olive/sage** | Botanical, editorial | `#fdfdf8`/`#4d4f46` | Botanical, Artisan |
| **Cool gray** | Technical, clinical | `#f0f0f3`/`#171717` | Swiss, Studio, Enterprise |
| **Cool blue-tint** | Trust, fintech | `#f5f5f7` | Enterprise, Material |

**Rule:** Do not mix warm and cool neutrals unless brief calls for "tension."

### OKLCH Color Space

Use OKLCH instead of HSL. Perceptually uniform. `oklch(lightness chroma hue)`. Lightness 0–100%, chroma ~0–0.4, hue 0–360.
**Chroma reduction:** As you move toward white/black, REDUCE chroma. 85% lightness wants ~0.08 chroma.
**Hue:** Brand decision, not default. Don't reflexively pick blue (250) or orange (60).
**Tinted Neutrals:** Add 0.005–0.01 chroma to ALL neutrals tinted toward brand hue. Direction from brand, not formula.
**Alpha smell:** Heavy transparency usually means incomplete palette. Define explicit overlay colors. Exception: frost/glassmorphism signatures.

### Dark Mode Surface Scale

Dark mode ≠ inverted light. Depth from surface lightness, not shadows.
- Base: `oklch(15% [chroma] [hue])`
- Elevated: `oklch(20% ...)`  
- Modal: `oklch(25% ...)`
Same hue/chroma — only vary lightness. Reduce body text weight slightly (350 vs 400).

### Theme Derivation from Context

Light vs dark DERIVED from audience/context. Perp DEX → dark. Hospital portal → light. Wedding checklist → light. Vintage forum at night → dark. No reflexive defaults.

### Per-visual direction Easing Functions

| Node | Easing | Duration | Personality |
|---|---|---|---|
| **I-A Academia** | ease-out | 500–700ms | Dignified, weighty |
| **I-B Art Deco** | ease-out | 400–600ms | Ceremonial |
| **I-C Newsprint** | ease-out | 150ms | Minimal — print doesn't move |
| **I-D Humanist Lit** | ease-in-out | 150–250ms | Gentle |
| **II-A Industrial** | ease-in | 100–200ms | Physical, weighted |
| **II-B Terminal** | steps(1) | Instant | Typewriter |
| **II-C Cyberpunk** | linear / instant | 50–150ms | Glitch-snap |
| **II-D ISO-Tech** | ease-out | 150–200ms | Clinical precision |
| **II-E Apex** | ease-in | 75–150ms | Tactical snap |
| **II-F Alpine** | ease-out | 200–300ms | Controlled |
| **III-A Luxury** | ease-out | 1500–2000ms | Cinematic |
| **III-B Swiss** | ease-out | 100–150ms | Function only |
| **III-C Bauhaus** | linear / instant | 0–100ms | Snaps |
| **III-D Neo-Brutalism** | linear | 50–100ms | Arcade press |
| **III-E Bold Typography** | ease-out | 600–1000ms | Stately paint-in |
| **IV-A Botanical** | ease-out | 500–700ms | Fluid |
| **IV-B Organic** | ease-out | 500–700ms | Breeze |
| **IV-C Sketch** | ease-out | 150–200ms | Light lift |
| **IV-D Claymorphism** | cubic-bezier(0.34, 1.56, 0.64, 1) | 200–300ms | Bouncy squish |
| **V-A Vaporwave** | ease-in-out | 2000–3000ms | Ambient glow |
| **V-B Acidpunk** | linear | 50ms + loop | Persistent glitch |
| **V-C Maximalism** | Various | Fast + slow pulses | Chaotic |
| **V-D Retro** | steps(4) / instant | Jerky | Old CSS/GIF |
| **VI-A Playful Geo** | cubic-bezier(0.34, 1.56, 0.64, 1) | 150–200ms | Bouncy |
| **VI-B Neumorphism** | ease-in-out | 300ms | Shadow depth |
| **✕ Monochrome** | Inherits host | Inherits host | Same, no color |
| **✕ Kinetic** | linear (marquees) + host | 150ms interactions | Motion = material |
| **VII base** | ease-out | 150–200ms | Minimal |
| **VII-A Enterprise** | ease-out | 200–300ms | Professional |
| **VII-B Material** | cubic-bezier(0.2, 0, 0, 1) | 200–300ms | M3 Emphasized |
| **VII-C Flat** | linear | 100–150ms | Instant |
| **VII-D Fluent 2** | cubic-bezier(0.1, 0.9, 0.2, 1) | 200–300ms | Connected |
| **VII-E Editorial** | ease-out | 100–150ms | Minimal |

---

## 15. DESIGN ENGINEERING — Interaction, Animation & Performance

HOW components behave (not WHAT they look like). Applies to ALL visual direction unless overridden in §14.

### 15-A. ANIMATION DECISION FRAMEWORK

#### 1. Should this animate?

| Frequency | Decision |
|---|---|
| 100+ times/day (keyboard, command palette) | **No animation. Ever.** |
| Tens/day (hover, list nav, dropdowns) | **Remove or drastically reduce** (<150ms) |
| Occasional (modals, drawers, toasts) | **Standard** per duration table |
| Rare / first-time (onboarding, explanatory) | **Can add delight** |

**Never animate keyboard-initiated actions.**

#### 2. Duration Reference

| Element | Duration |
|---|---|
| Button press (`:active`) | 100–160ms |
| Tooltips, popovers | 125–200ms |
| Dropdowns, selects, toggles | 150–250ms |
| Modals, drawers | 200–500ms |
| Marketing / explanatory | 500ms–2s |

**Rule: UI animations stay under 300ms.** Perceived performance = actual performance.

#### 3. Easing Decision Tree

```
Entering/exiting? → ease-out
Moving/morphing? → ease-in-out
Hover/color change? → ease
Constant (marquee/progress)? → linear
Default → ease-out
```

**Never `ease-in` for UI appearing on screen.** visual direction easings in §14 take precedence; this is fallback.

#### 4. Custom Easing Curves

```css
--ease-out: cubic-bezier(0.23, 1, 0.32, 1);       /* Universal UI default */
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);     /* On-screen movement */
--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);      /* iOS drawer */
--ease-press: cubic-bezier(0.2, 0, 0, 1);            /* Snap feedback */
```

### 15-B. Spring Animations
Use for drag with momentum, "alive" elements, interruptible gestures. **Apple approach:** `{ type: "spring", duration: 0.5, bounce: 0.2 }`. **Physics:** `{ type: "spring", mass: 1, stiffness: 100, damping: 10 }`. Keep bounce 0.1–0.3. Springs maintain velocity when interrupted.

### 15-C. COMPONENT INTERACTION RULES

These rules apply to ALL interactive components across ALL visual direction.

**Button Press Feedback (recommended):**
Every pressable element should have `transform: scale(0.97)` on `:active`. Scale range: 0.95–0.98. Below 0.95 exaggerated, above 0.98 imperceptible.
```css
.button { transition: transform 160ms var(--ease-out); }
.button:active { transform: scale(0.97); }
```

**Never animate from scale(0):** Elements don't materialize from nothing. Start from `scale(0.95)` + `opacity: 0`.
```css
/* avoid */ .entering { transform: scale(0); }
/* REQUIRED */  .entering { transform: scale(0.95); opacity: 0; }
```

**Origin-Aware Popovers:** Popovers should scale from trigger, not center. Default `transform-origin: center` is wrong for popovers.
```css
.popover { transform-origin: var(--radix-popover-content-transform-origin); }
```
**Exception: Modals** keep `transform-origin: center` (centered in viewport, not anchored to trigger).

**Tooltip Skip-Delay on Subsequent Hovers:** Once one tooltip is open, hovering adjacent tooltips opens them instantly with no animation. Makes whole toolbar feel faster.

**Blur to Mask Imperfect Transitions:** When crossfade feels off despite correct easing, add `filter: blur(2px)` during transition. Bridges visual gap. Keep <20px (expensive in Safari).

**Animate Enter States with @starting-style:**
```css
.toast { opacity: 1; transform: translateY(0); transition: opacity 400ms ease, transform 400ms ease;
  @starting-style { opacity: 0; transform: translateY(100%); } }
```
Replaces `useEffect(() => setMounted(true))` pattern. Fall back to `data-mounted` attribute if needed.

**CSS Transitions Over Keyframes for Interruptible UI:** Transitions can be interrupted and retargeted mid-animation. Keyframes restart from zero. Use transitions for toasts, toggles, panels. Use keyframes for predetermined choreography.

**Touch Hover State Guard:** Touch devices trigger hover on tap. Gate all hover animations:
```css
@media (hover: hover) and (pointer: fine) { .element:hover { transform: scale(1.05); } }
```

**Stagger Animations:** 30–80ms between items. Short = fast interface. Long stagger = slow. Stagger is decorative; never block interaction while stagger plays.

### 15-D. Clip-Path Techniques
`clip-path: inset(top right bottom left)` — powerful rectangular clipping. Core: inset reveal (`inset(0 100% 0 0)` → `inset(0 0 0 0)`). Tabs: duplicate list, clip visible active. Hold-to-destroy: 2s linear press, 200ms release. Image reveals: `inset(0 0 100% 0)` + IntersectionObserver.

### 15-E. Gesture & Drag
**Momentum dismissal:** Calculate velocity (`distance/time`). If >0.11, dismiss regardless. **Damping at boundaries:** More drag = less movement. **Pointer capture:** Once dragging, capture all events. **Multi-touch protection:** Ignore additional touches after initial.

### 15-F. PERFORMANCE RULES

**Only animate transform and opacity** — these skip layout and paint, running on the GPU. Animating `padding`, `margin`, `height`, `width`, `top`, `left` triggers all three rendering steps and causes jank.

**CSS Variables Are Inheritable (Performance Trap):**
Changing a CSS variable on a parent recalculates styles for ALL children. In a drawer with many items, updating `--swipe-amount` on the container causes expensive style recalculation. Update `transform` directly on the element instead.
```js
// avoid: triggers recalc on all children
element.style.setProperty('--swipe-amount', `${distance}px`);
// REQUIRED: only affects this element
element.style.transform = `translateY(${distance}px)`;
```

**Framer Motion Hardware Acceleration Caveat:**
Framer Motion shorthand (`x`, `y`, `scale`) NOT hardware-accelerated — uses `requestAnimationFrame` on main thread. Use full `transform` string:
```jsx
// NOT hardware accelerated
<motion.div animate={{ x: 100 }} />
// Hardware accelerated
<motion.div animate={{ transform: "translateX(100px)" }} />
```

**CSS Animations Beat JS Under Load:** CSS animations run off main thread. Under browser load, JS animations (Framer Motion, GSAP) drop frames. CSS remains smooth. Use CSS for predetermined; JS for dynamic/interruptible.

**Use WAAPI for Programmatic CSS Animations:** Web Animations API gives JS control with CSS performance — hardware-accelerated, interruptible, no library:
```js
element.animate(
  [{ clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0 0)' }],
  { duration: 1000, fill: 'forwards', easing: 'cubic-bezier(0.77, 0, 0.175, 1)' }
);
```

### 15-I. Eight Interactive States

Every interactive element needs ALL eight states designed:
| State | When | Visual Treatment |
|---|---|---|
| **Default** | At rest | Base styling |
| **Hover** | Pointer over (not touch) | Subtle lift, color shift |
| **Focus** | Keyboard/programmatic | Visible ring (§9-A rules) |
| **Active** | Being pressed | Pressed in, darker — `scale(0.97)` mandatory |
| **Disabled** | Not interactive | Reduced opacity (≤ 0.5), no pointer |
| **Loading** | Processing | Spinner or skeleton — never freeze without feedback |
| **Error** | Invalid state | Red border, icon, message below field with `aria-describedby` |
| **Success** | Completed | Green check, confirmation — brief, not celebratory |

**The common miss:** Designing hover without focus, or vice versa. They're different. Keyboard users never see hover states. Touch users never see either. Every state must work independently.

### 15-J. Input Method Detection
Screen size ≠ input method. Use `@media (pointer: fine)` for mouse, `(pointer: coarse)` for touch, `(hover: hover)` / `(hover: none)` for hover support. **Never rely on hover for functionality.**

### 15-K. Undo > Confirm
Undo better than confirmation. Remove immediately, show undo toast, delete after timeout. Confirmation only for truly irreversible (account deletion), high-cost (payments), or batch.

### 15-L. BESPOKE TECHNIQUES REFERENCE

Every page should implement ≥2 techniques (enforced by §0 G-2).

#### L-1. Scroll Experience
- **Lenis smooth scroll** — HIGHEST IMPACT. Use proper momentum config:
```html
<script src="https://unpkg.com/lenis@1.0.45/dist/lenis.min.js"></script>
<script>
// Remove scroll-smooth from <html> tag first
        const lenis = new Lenis({
    lerp: 0.1,
    duration: 1.2,
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
})
function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}
requestAnimationFrame(raf)
// Respect accessibility
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    lenis.destroy()
}
</script>
```
Remove `scroll-smooth` from html tag to avoid conflicts. `lerp:0.1` gives responsive feel, `duration:1.2` prevents infinite easing on fast scrolls.
- **Scroll-triggered reveals** — IntersectionObserver. `opacity:0; translateY(30px)` → `opacity:1; translateY(0)`, `0.8s cubic-bezier(0.16, 1, 0.3, 1)`. `unobserve()` after trigger.
- **Stagger groups** — `transition-delay: calc(var(--i) * 80ms)`.
- **Text reveal on scroll** — Split headline to chars, `display:inline-block`, `translateY(100%) → 0` with sequential delay.
- **GSAP ScrollTrigger** — For parallax, pinning, scrub. CDN: `cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5`.

#### L-2. Background Techniques
- **CSS grain** — Fixed `::after`, monochrome SVG noise (`feTurbulence baseFrequency:0.85 numOctaves:4`), `opacity:0.035`, `pointer-events:none`, `z-index:9999`. Dark: 0.02 or `filter: invert(1)`.
- **Blur orbs / gradient blobs** — `border-radius:50%; filter:blur(80px); opacity:0.15-0.2`. 2-3 at 300-600px behind hero.
- **Gradient mesh** — Multiple overlapping `radial-gradient`. Superior to single linear.
- **Animated gradient** — `@property --a` + `conic-gradient(from var(--a), ...)` + `animation: 8s linear infinite`.

#### L-3. Micro-Interactions
- **Custom cursor** — `mix-blend-mode: difference`, 20px circle. Desktop only. Expand on link hover.
- **Magnetic buttons** — `mousemove` tracking, `translate()` follows within radius, 0.2 multiplier. Spring return.
- **Text scramble** — Chars randomize before resolving. 30ms interval, 1/3 char per tick.

#### L-4. Layout Sophistication
- **Horizontal scroll section** — `overflow-x: auto; scroll-snap-type: x mandatory` + `scroll-snap-align: start`.
- **Sticky sidebar + scroll content** — `grid-template-columns:1fr 1fr; min-height:100vh`. Sticky: `position:sticky; top:100px; height:fit-content`.
- **Overflow compositions** — Negative margins, oversized type bleeding off-screen.
- **Full-bleed typography** — `font-size:clamp(4rem,15vw,14rem); line-height:0.85; margin-left:-2vw; margin-right:-2vw`.

#### L-5. Image & Visual Treatment
- **Image reveal** — Color overlay `::after`, `clip-path:inset(0 0 100% 0)` → `scaleX(0)` on scroll.
- **Parallax layers** — `[data-speed]`, `transform: translateY(scrollY * el.dataset.speed)`. Prefer `transform`.
- **Grayscale to color** — `filter:grayscale(100%); transition:filter .6s ease`. Gains color on hover/scroll.

#### L-6. Page-Level Polish
- **Preloader** — Fixed overlay `z-index:100000`. Exit: `clip-path:inset(0 0 100% 0)` 0.8s. Remove on `window.load` + 600ms timeout.
- **Animated counters** — Count from 0 to `data-target` on viewport entry. 60fps `setInterval`, `toLocaleString()`.
- **Marquee (CORRECT)** — should define `@keyframes`. Duplicate content for loop. `translateX(-50%)`.

#### L-7. Motion Design Principles
- **Go-to easing:** `cubic-bezier(0.16, 1, 0.3, 1)` — 80% of animations.
- **Entrance:** `cubic-bezier(0.33, 1, 0.68, 1)` (ease-out-quint)
- **Exit:** `cubic-bezier(0.32, 0, 0.67, 0)` (ease-in-quat)
- **Spring-back:** `cubic-bezier(0.34, 1.56, 0.64, 1)`
- **Linear:** ONLY continuous/looping (marquees, gradients)
- **Stagger:** Sequential `calc(var(--i)*80ms)`. Center-radiate `calc(abs(var(--i)-var(--mid))*60ms)`.
- **Directional logic:** Consistent per page. Mixed = chaos.
- **Performance:** Only `transform` + `opacity`. `clip-path`/`scale` for size. See §15-F.

#### L-8. Readability Overlays
- **Progressive Blur + Linear Gradient:** Text over images (Hero sections) use 20px blur with `to-bottom` black-to-transparent gradient (opacity 0.6 → 0). Not flat semi-transparent overlay.

#### L-9. Action Confirmation (The "Copied!" Rule)
- Every state-change action (Copy, Save, Delete) must trigger immediate micro-interaction confirmation (e.g., chip sliding up "Copied!", red dot on "Saved" tab).

#### L-10. Progressive Disclosure
- Hide "Advanced Options" (e.g., password protection) behind toggle or modal. Lead with "Intent-First" field (URL input).

---

## 16. Component Recipes
Previously tied to visual directions. Now described by purpose:

- Intelligent List: for scanning many similar items
- Command Input: for quick actions
- Live Status: for real-time feedback
- Wide Data Stream: for dashboards
- Contextual UI: for progressive disclosure

Choose based on task, not style.
## 17. Section Architecture Patterns

### Hero Section Variants

| Category | visual direction | Key Characteristics |
|---|---|---|
| **Editorial** | Luxury, Professional, Monochrome, Humanist Lit | Full-bleed typography hero, minimal visuals, asymmetric 60/40, no visible CTA in first viewport |
| **Technical Dark** | Cyberpunk, Terminal, Modern Dark, Web3 | Dark void, luminescent elements, data strip, dashboard mockup, multi-layer gradients |
| **Organic/Natural** | Botanical, Organic, Sketch | Earth-tone/cream bg with grain, large serif headline, organic image container, generous whitespace |
| **Retro/Nostalgic** | Retro, Vaporwave, Maximalism | High visual density, Retro: Win95 title bar, Vaporwave: sunset+grid, Maximalism: overlapping elements |
| **Systematic** | Bauhaus, Swiss, Flat, Fluent | Grid-first, typography=decoration, Bauhaus: color blocks, Swiss: flush-left red, Flat: zero depth |
| **Playful/Social** | Claymorphism, Playful Geo, Neo-Brutalism, Sketch | Immediately joyful, character/mascot illustration, prominent CTA, light/cream/pastel bg |

---

## 19. Legal & Technical Deliverable Notes

**Web Font Loading:** All visual direction fonts available via Google Fonts unless noted. Use `font-display: swap`.

**Dashboard Layout Pattern:**
For dashboards, prefer flexbox over fixed positioning:
```html
<div class="flex h-screen overflow-hidden">
  <aside class="w-64 ... hidden lg:flex flex-col">...</aside>
  <main class="flex-1 overflow-y-auto">
    <div class="px-6 lg:px-10 py-8 max-w-[1600px] mx-auto">
      <!-- content -->
    </div>
  </main>
</div>
```
This avoids z-index issues and ml-64 calculations. Only use fixed + ml-64 when sidebar must overlay content on scroll.

Alternative for sticky sidebar:
```html
<div class="flex">
  <aside class="w-64 h-screen sticky top-0 ...">...</aside>
  <main class="flex-1">...</main>
</div>
```

**Tailwind Config:** Include `tailwind.config` block after CDN with fontFamily (display/body/mono/label) and animation keyframes per visual direction. See visual direction specs for font names and §14 easing for motion parameters.

---

## 20. USER INTENT LOGIC (Resolution Protocol)

Before generating any layout, perform an **Intent Audit**:

### 1. Primary Intent Detection
- **Search-First:** Center large, clear input.
- **Browse-First:** Lead with 12-column bento/grid of content cards.
- **Manage-First:** Lead with KPIs and data tables.

### 2. Affordance Check
- Are clickable elements grouped? (e.g., Nav items for "Food" and "Drinks" in shared container, "Settings" separated)

### 3. Flow-Gap Analysis
- Does the flow have "Skip" or "Back" option? (e.g., Onboarding screen for "Allergies" must have "Skip" for users without allergies)

---

*Designer XL Preview — Built on Designer by mdev34-lab. 32 art styles. Maximum intent. No compromise.*
