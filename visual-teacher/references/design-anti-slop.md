# Design Anti-Slop — Guide to Avoiding "AI Slop" Design

## What Is "AI Slop"?

"AI Slop" refers to the generic, predictable, characterless design approach that AI models produce. Certain fonts, colors, and layouts are used so frequently that it is possible to look at an interface and say "this was made by AI." This skill makes avoiding these aesthetic pitfalls mandatory.

---

## PROHIBITED FONTS

### Fonts to Absolutely Avoid

| Font | Why Prohibited |
|------|-------------|
| **Inter** | The most frequently used font by AI. Present on every AI-generated site. |
| **Roboto** | Google's default font. Generic and boring. |
| **Arial** | The most basic font of the web. No character. |
| **Helvetica** | Overused. Signals a lack of creativity. |
| **System fonts** | -apple-system, BlinkMacSystemFont, etc. Default = boring. |
| **Open Sans** | The most overused font of the 2010s. |
| **Lato** | Same category as Inter. |

### Recommended Alternatives

**Display/Heading fonts (characterful, bold):**
- **Bricolage Grotesque** — Bold, geometric, modern
- **Space Grotesk** — Technical, monospace-feeling sans
- **DM Sans** — Clean but characterful
- **Outfit** — Geometric, contemporary
- **Cabinet Grotesk** — Editorial, powerful

**Body/Text fonts (readable but interesting):**
- **DM Sans** — For both heading and body
- **Outfit** — Good readability
- **Manrope** — Modern sans
- **Plus Jakarta Sans** — Geometric, balanced

**Monospace/Code fonts:**
- **JetBrains Mono** — Developer-focused, ligatures
- **Fira Code** — Programming ligatures
- **IBM Plex Mono** — Technical, clean
- **Source Code Pro** — Adobe's monospace

**Example font pairing:**
```css
:root {
  --font-display: 'Bricolage Grotesque', sans-serif;
  --font-body: 'DM Sans', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

---

## PROHIBITED COLOR SCHEMES

### Colors to Absolutely Avoid

**1. Purple Gradients on White**
```css
/* PROHIBITED */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```
This is present on 80% of AI-generated landing pages.

**2. Purple Gradients on Dark**
```css
/* PROHIBITED */
background: #0f0f23;
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```
The dark mode version is equally overused.

**3. Generic Blue (#0066CC, #007AFF)**
Apple/Google/system blue. Generic.

**4. Rainbow Gradients**
```css
/* PROHIBITED */
background: linear-gradient(90deg, red, orange, yellow, green, blue, purple);
```
Excessive, meaningless, distracting.

### Recommended Color Approaches

**Approach 1: Bold Monochrome + Single Accent**
```css
:root {
  --bg-primary: #0f0f1a;
  --bg-secondary: #1a1a2e;
  --text-primary: #e0e0e0;
  --text-secondary: #888;
  --accent: #4ecdc4; /* Single strong accent color */
  --accent-glow: rgba(78, 205, 196, 0.4);
}
```

**Approach 2: Warm Neutrals + Earthy Accent**
```css
:root {
  --bg-primary: #faf9f7; /* Warm off-white */
  --bg-secondary: #f0ede8;
  --text-primary: #2d2d2d;
  --text-secondary: #666;
  --accent: #d97757; /* Terracotta */
}
```

**Approach 3: High Contrast Editorial**
```css
:root {
  --bg-primary: #ffffff;
  --text-primary: #000000;
  --accent: #ff3d00; /* Bold red-orange */
  --accent-secondary: #0066ff;
}
```

**Approach 4: Retro-Futuristic**
```css
:root {
  --bg-primary: #1a1a2e;
  --bg-secondary: #16213e;
  --text-primary: #eee;
  --accent-1: #ff006e; /* Hot pink */
  --accent-2: #00f5d4; /* Cyan */
  --accent-3: #fee440; /* Yellow */
}
```

---

## PROHIBITED LAYOUTS

### Layouts to Absolutely Avoid

**1. Predictable Centered Hero**
```
┌─────────────────────────────────────┐
│                                     │
│         Big Heading                 │
│         Subheading                  │
│         [CTA Button]                │
│                                     │
└─────────────────────────────────────┘
```
This is the hero section of every AI-generated landing page.

**2. Symmetric Grid (3x3, 4x4)**
```
┌─────┐ ┌─────┐ ┌─────┐
│Card │ │Card │ │Card │
└─────┘ └─────┘ └─────┘
┌─────┐ ┌─────┐ ┌─────┐
│Card │ │Card │ │Card │
└─────┘ └─────┘ └─────┘
```
Symmetric, predictable, boring.

**3. Cookie-Cutter Dashboard**
```
┌─────────────────────────────────────┐
│ Sidebar │ Main Content │ Stats     │
└─────────────────────────────────────┘
```
Every dashboard is the same.

### Recommended Layout Approaches

**Approach 1: Asymmetric + Overlap**
```
┌─────────────────────────────────────┐
│  ┌──────────┐                       │
│  │ Heading  │  ┌─────────────────┐  │
│  └──────────┘  │                 │  │
│                │  Visual Scene   │  │
│  ┌──────┐     │                 │  │
│  │Info  │     └─────────────────┘  │
│  └──────┘                           │
└─────────────────────────────────────┘
```
Elements overlap, asymmetric.

**Approach 2: Editorial Magazine**
```
┌─────────────────────────────────────┐
│ ████████████████████████████████████ │ ← Full-width image
│                                     │
│  Big Heading (left-aligned, bold)   │
│                                     │
│  ┌─────────┐  Text text text        │
│  │ Visual  │  text text text        │
│  └─────────┘  text text text        │
│                                     │
└─────────────────────────────────────┘
```
Magazine-style, editorial.

**Approach 3: Diagonal Flow**
```
┌─────────────────────────────────────┐
│  ╱ Heading                          │
│ ╱                                   │
│╱     ┌─────────┐                    │
│      │ Visual  │                    │
│      └─────────┘                    │
│                  Text text          │
│                   text text         │
└─────────────────────────────────────┘
```
Diagonal flow, creates eye movement.

**Recommended layout for this skill (simulation):**
```
┌─────────────────────────────────────────────────────────┐
│  [Parameter controls: slider, input]                    │
├─────────────────────────────────────────────────────────┤
│  [Control buttons: ◄ Back | Forward ► | ▶ | Speed | ↺]  │
├──────────────────────────┬──────────────────────────────┤
│                          │                              │
│  VISUAL SCENE            │  NARRATION PANEL             │
│  ┌─────────────────┐     │  ┌────────────────────────┐  │
│  │ Source Values   │     │  │ Step 14 / 87           │  │
│  │ (table/matrix)  │     │  │ Distance Calculation   │  │
│  └─────────────────┘     │  │                        │  │
│           ↓              │  │ Calculating the x      │  │
│  ┌─────────────────┐     │  │ difference between P₁  │  │
│  │ Working Area    │     │  │ and the new point:     │  │
│  │ (formula/accum.)│     │  │ 4 - 1 = 3              │  │
│  └─────────────────┘     │  │                        │  │
│           ↓              │  │ ➡️ In the next step,   │  │
│  ┌─────────────────┐     │  │ it will be squared     │  │
│  │ Target Results  │     │  └────────────────────────┘  │
│  │ (result matrix) │     │                              │
│  └─────────────────┘     │  [Step Log - scroll]         │
│                          │                              │
└──────────────────────────┴──────────────────────────────┘
```

---

## PROHIBITED EFFECTS

### Effects to Absolutely Avoid

**1. Generic Fade-In**
```css
/* PROHIBITED — meaningless */
.fade-in {
  animation: fadeIn 1s ease-in;
}
```
Why fade? What does it mean? Just to "look nice"?

**2. Box Shadow Overkill**
```css
/* PROHIBITED */
box-shadow: 0 10px 40px rgba(0,0,0,0.3);
```
Excessive shadow ruins the depth illusion.

**3. Rounded Corners Everywhere**
```css
/* PROHIBITED */
border-radius: 16px; /* Same for every element */
```
Everything same radius = monotony.

**4. Gradient Text**
```css
/* PROHIBITED — overused */
background: linear-gradient(90deg, #667eea, #764ba2);
-webkit-background-clip: text;
color: transparent;
```

### Recommended Effect Approaches

**1. Meaningful Animations**
```css
/* GOOD — animation has meaning */
.operand.moving {
  /* Value MOVING from source to target */
  transition: all 450ms cubic-bezier(0.4, 0, 0.2, 1);
}

.accumulator .term.latest {
  /* Latest added term HIGHLIGHTED */
  background: rgba(255, 165, 0, 0.15);
  color: #ffa500;
  animation: slideIn 350ms ease-out;
}

.candidate.winner {
  /* Winner MARKED */
  border-color: #4ecdc4;
  box-shadow: 0 0 20px rgba(78, 205, 196, 0.4);
  transform: scale(1.1);
}
```

**2. Subtle, Intentional Shadows**
```css
/* GOOD — subtle, warm */
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

/* GOOD — glow for active elements */
box-shadow: 0 0 16px rgba(78, 205, 196, 0.3);
```

**3. Varied Border Radius**
```css
/* GOOD — varied radii */
.card { border-radius: 12px; }
.button { border-radius: 8px; }
.badge { border-radius: 4px; }
.avatar { border-radius: 50%; }
```

**4. Meaningful Gradients**
```css
/* GOOD — gradient has meaning */
.decision-result {
  /* Winner result emphasis */
  background: linear-gradient(135deg, 
    rgba(78, 205, 196, 0.1) 0%, 
    rgba(78, 205, 196, 0.05) 100%
  );
  border: 2px solid #4ecdc4;
}
```

---

## BOLD AESTHETIC DIRECTION

Choose an aesthetic direction for each simulation. Not randomly — intentionally.

### Option 1: Brutalist Technical
- **Font:** Space Grotesk + JetBrains Mono
- **Color:** Black-white + single neon accent (#ff006e)
- **Layout:** Grid, sharp lines, asymmetry
- **Vibe:** Technical, serious, developer-focused

### Option 2: Editorial Warm
- **Font:** Bricolage Grotesque + DM Sans
- **Color:** Warm neutrals (#faf9f7, #2d2d2d) + terracotta (#d97757)
- **Layout:** Magazine-style, plenty of whitespace
- **Vibe:** Sophisticated, approachable

### Option 3: Retro-Futuristic
- **Font:** Cabinet Grotesk + IBM Plex Mono
- **Color:** Dark background (#1a1a2e) + hot pink (#ff006e) + cyan (#00f5d4)
- **Layout:** Diagonal flow, overlapping elements
- **Vibe:** Sci-fi, energetic, bold

### Option 4: Organic Soft
- **Font:** Outfit + Manrope
- **Color:** Soft pastels (#f8f4f0, #e8d5c4) + sage green (#7a9e7e)
- **Layout:** Curved lines, organic shapes
- **Vibe:** Calm, natural, approachable

### Option 5: High-Contrast Minimal
- **Font:** Space Grotesk + Inter (only for body)
- **Color:** Pure white + pure black + bold red (#ff3d00)
- **Layout:** Extreme whitespace, single accent
- **Vibe:** Clean, focused, editorial

---

## CONTROL CHECKLIST

Ask these questions when the simulation design is complete:

### Font
- [ ] Did I avoid using Inter/Roboto/Arial?
- [ ] Did I choose at least 1 characterful display font?
- [ ] Is the font pairing cohesive?

### Color
- [ ] Did I avoid using purple gradients?
- [ ] Do I have a single bold accent color?
- [ ] Is the color palette cohesive?

### Layout
- [ ] Did I avoid a predictable centered hero?
- [ ] Is there asymmetry or an interesting flow?
- [ ] Is whitespace intentional?

### Effects
- [ ] Does every animation have a meaning?
- [ ] Did I avoid generic fade-ins?
- [ ] Are shadows subtle?

### General
- [ ] Would someone say "AI-generated" when seeing this design?
- [ ] Is it characterful and memorable?
- [ ] Does it hinder the user experience?

---

## EXAMPLE: Design for KNN Simulation

**Selected direction:** Brutalist Technical

**Font:**
```css
--font-display: 'Space Grotesk', sans-serif;
--font-body: 'DM Sans', sans-serif;
--font-mono: 'JetBrains Mono', monospace;
```

**Color:**
```css
--bg-primary: #0f0f1a;
--bg-secondary: #1a1a2e;
--text-primary: #e0e0e0;
--text-secondary: #888;
--accent: #ff006e; /* Hot pink */
--accent-glow: rgba(255, 0, 110, 0.3);
--success: #4ecdc4;
--warning: #ffa500;
```

**Layout:**
- Left: Data table (monospace, grid)
- Center: Working area (large, central)
- Right: Narration panel (editorial style)
- Top: Controls (minimal, technical)

**Details:**
- Sharp corners (border-radius: 4px)
- Thin lines (1px solid #333)
- Monospace numbers
- Hot pink highlights (active operands)
- Cyan success (computed results)

This design:
✅ Does not look AI-generated
✅ Characterful and memorable
✅ Technical and serious
✅ Does not hinder the user experience
