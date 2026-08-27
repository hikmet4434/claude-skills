---
name: visual-teacher
description: |
  Transform any topic, algorithm, formula, or problem into a traceable solution-flow explanation 
  with atomic step-by-step reasoning and a single-file animated HTML visualization.
  
  Use this skill whenever the user wants to:
  - Understand a topic through step-by-step calculations, transformations, or decision flows
  - See how numbers/formulas/concepts are constructed atomically (not just final results)
  - Get an interactive visual simulation where operations happen visibly
  - Learn through "input → operation → output → next reference" chains
  - See decision points where candidates are compared and winners/losers are marked
  
  Trigger phrases: "explain this step by step", "show me how this works atomically", 
  "visualize this process", "create an interactive simulation", "walk me through this calculation",
  "show the decision points", "trace this algorithm", "animate this formula", "break down this problem"
  
  Also trigger when user mentions: KNN, CNN, regression, p-value, matrix multiplication, 
  gradient descent, backpropagation, decision trees, hypothesis testing, confidence intervals,
  or any educational content that benefits from visual step-by-step breakdown.
version: 1.0.0
metadata:
  author: "Custom skill for visual learning"
  category: "education"
  tags: [visual-learning, simulation, step-by-step, atomic-steps, interactive, HTML, animation]
  source-repos: [awesome-claude-skills, scientific-agent-skills]
allowed-tools: ["Read", "Write", "Glob", "Grep", "WebSearch", "WebFetch"]
---

# Visual Teacher

## Purpose

Transform any topic into a traceable solution-flow explanation with atomic step-by-step reasoning 
and a single-file animated HTML visualization. The goal is NOT to give the final answer, but to 
show HOW the answer is constructed — every number, every decision, every transformation visible.

**Why this matters:** Most AI explanations jump from "here's the formula" to "here's the result", 
skipping the construction process. This skill forces atomic visibility: you see each multiplication, 
each comparison, each decision as it happens. Numbers don't appear from nowhere — they're built 
from sources, moved through operations, and arrive at targets.

**What makes this different:** This is NOT a "calculator panel" where you move a slider and the 
result changes instantly. This is a visual simulation where operations happen visibly, decisions 
are dramatized, and every intermediate value has a source and a destination.

## Trigger Conditions

### Use this skill when:

1. **User asks for step-by-step explanation** of any calculation, algorithm, or process
2. **User wants to see HOW something works**, not just WHAT the result is
3. **User mentions visualization, simulation, or animation** of a process
4. **Topic involves sequential transformations**: data → operations → results → decisions
5. **User wants to understand decision points**: where choices are made, why one option wins
6. **Educational content** that benefits from visual breakdown (KNN, CNN, regression, etc.)

### Do NOT use this skill when:

- User only wants the final answer (no process explanation needed)
- User asks for a simple definition or concept (no sequential steps)
- User wants code implementation only (no educational visualization)
- Topic has no clear sequential flow or transformation chain

## Core Principles

### 1. Atomic Steps Over Big Blocks

**Principle:** Every "next step" must be the smallest meaningful operation: one multiplication, 
one comparison, one assignment. Never show a whole row, matrix, or final result in one step.

**Why:** When you see "Distance = 5.83" appear instantly, you learn nothing about HOW it was 
calculated. But when you see: (4-1)² = 9, then (6-2)² = 16, then 9+16 = 25, then √25 = 5 — 
you understand the construction.

**How to apply:** Break every calculation into atomic operations. If a cell requires 9 multiplications 
and additions, that's 9 separate steps, not 1.

### 2. Trace Every Value's Journey

**Principle:** Every number/concept must have a visible source, transformation, and destination. 
No value appears from nowhere or disappears without explanation.

**Why:** When values seem to "magically appear", the user loses track of the logic chain. By 
showing "this value came from Step 3, was transformed by this formula, and will be used in Step 7", 
you create a traceable chain.

**How to apply:** Use the pattern: **Input (source) → Operation (formula) → Output (value) → Next Reference (where used)**

### 3. Dramatize Decision Points

**Principle:** When a choice is made (max/min/argmax/threshold/majority), show ALL candidates, 
mark the winner clearly, fade the losers, and explain the rule.

**Why:** Decisions are where understanding deepens. If you just see "K=3 neighbors selected", you 
don't understand WHY those 3. But if you see all 5 distances, the 3 smallest highlighted, and the 
rule "select K smallest", you understand the mechanism.

**How to apply:** For every decision, create a "decision scene" with candidates, comparison, winner 
marking, loser fading, and rule explanation.

### 4. Sync Animation With Explanation

**Principle:** The visual simulation and the text explanation must describe the SAME step at the 
SAME time. When the animation shows a multiplication, the text panel says "multiplying X and Y".

**Why:** If the visual and text are out of sync, the user gets confused. They see one thing happening 
but read about another. Synchronization creates a unified learning experience.

**How to apply:** Use a trace-based architecture where each step has both visual actions and text 
explanations, played together.

### 5. Real Arithmetic, Not Mockups

**Principle:** Every calculation must use REAL numbers from the problem, showing actual arithmetic. 
No fake animations or pre-computed results.

**Why:** If you see "3.1472 + 0.71 × (3.1472 - 4.1338) = 2.4467" with real numbers, you can 
verify and understand. If you see generic "A + B × C = D", you can't connect to the actual problem.

**How to apply:** Substitute all variables with actual values. Show the arithmetic explicitly.

## Output Structure

Every response must follow this 8-section structure in order:

### Section 0: Summary (2-3 sentences)

What is the topic/problem? What is the main mechanism? What kind of transformation will happen?

**Example:** "KNN classifies a new point by finding its K nearest neighbors and taking a majority vote. 
The process involves: calculating distances, sorting them, selecting K smallest, and voting on class."

### Section 1: Inventory / Given Items (table)

List ALL data, parameters, constants, formulas, and definitions that will be used.

| Symbol / Name | What it is | Role in the system | Source |
|---|---|---|---|
| X | Input features | Data to classify | given |
| K | Number of neighbors | Controls voting | given |
| d(p,q) | Distance function | Measures similarity | formula |

**Source must be one of:** given, derived, formula, assumption, previous step output.

**Rule:** No variable may appear later without first being introduced here (unless explicitly 
introduced in a later derived-values table).

### Section 2: Target and Stopping Criterion

State exactly what must be found, proved, classified, selected, optimized, or understood. Also 
state how we know the process is complete.

**Example:** "Classification is complete when the majority class among K nearest neighbors is 
selected and assigned to the new point."

### Section 3: Starting Point

Explain:
- First concrete object used
- Why the solution starts there
- What representation is needed first

**For numerical topics:** Show the initial state as a table, vector, matrix, graph, or list.

**For conceptual topics:** Show the initial concept map.

### Section 4: Step-by-Step Transformation Flow (CORE)

This is the heart of the explanation. Every step must use this exact 5-line block:

```
### Step N — short name

- Input: value/concept and where it came from
- Operation / Formula: rule applied; if numerical, substitute real values and show arithmetic
- Output: produced value/concept
- Next reference: where this output will be used later
- Decision, if any: condition, candidates, winner/loser, and reason
```

**Rules:**

1. Do not skip arithmetic. If the formula is `d = √(Σ(xᵢ-yᵢ)²)`, show: (4-1)² = 9, (6-2)² = 16, 
   9+16 = 25, √25 = 5.

2. Do not jump from formula to final value. Show every intermediate calculation.

3. If a value is built from multiple terms, show each term separately. For matrix multiplication 
   `C[1,1] = A[1,1]·B[1,1] + A[1,2]·B[2,1] + A[1,3]·B[3,1]`, show:
   - Step 4.1: A[1,1]·B[1,1] = 3×1 = 3, accumulator = 3
   - Step 4.2: A[1,2]·B[2,1] = 2×4 = 8, accumulator = 3+8 = 11
   - Step 4.3: A[1,3]·B[3,1] = 1×2 = 2, accumulator = 11+2 = 13
   - Step 4.4: C[1,1] = 13

4. If a loop exists, explicitly show the loop return: "Return to Step K (until stopping criterion met)".

5. If a decision exists, show the comparison rule: "7 > 5 and 7 > 2, so max = 7 selected".

6. If information is missing, mark it as `ASSUMPTION:` and continue with a reasonable assumption.

**For detailed examples, see:** [references/topic-examples.md](references/topic-examples.md)

### Section 5: Transformation and Reference Map (table)

Create a summary table showing the entire flow at a glance:

| Stage | Input + source | Operation | Output | Later reference / usage |
|---|---|---|---|---|
| 1 | X, K (given) | — | Initial data | Step 2 |
| 2 | X (Step 1) | Calculate distances | d₁, d₂, ..., dₙ | Step 3 |
| 3 | d₁...dₙ (Step 2) | Sort ascending | Sorted distances | Step 4 |

**Rule:** Every output must either:
- Become an input to a later step, OR
- Become a decision candidate, OR
- Become a final result, OR
- Be explicitly discarded with reason

**No orphan values.**

### Section 6: True Sandbox Simulation (Frontend/Backend Flexible)

This is the critical deliverable. Produce a fully functional, highly interactive sandbox application. While a single-file HTML with JS is often easiest for browsers, you are NOT strictly restricted to it. If the complexity requires a backend script or multiple files, you may organize the tech stack accordingly.

**Hard rules:**

1. **True Interactivity:** The user MUST be able to manipulate the simulation. Allow them to click to place points, toggle features, drag elements, or generate random values to prove the system is fully dynamic and not a hardcoded slideshow.
2. **Dynamic Step Controls:** Keep the "Next" and "Previous" buttons, but they must step through the *current dynamic state* of the algorithm based on the user's latest interaction, rather than stepping through a pre-calculated static JSON array.
3. **Explanatory Tooltips:** Provide dynamic tooltips ("baloncular") on the UI that explain the *why* and *how* of every step concurrently as the topic unfolds.
4. Do NOT give only Python code without a frontend UI.
5. Do NOT give only Mermaid diagrams or static SVGs.

**For detailed HTML requirements, see Section "Simulation Requirements" below.**

**IMPORTANT CREATIVITY RULE:** Do NOT use a single rigid HTML template or mold. Every topic has different visualization needs. While you must follow the interactive and atomic principles, you are expected to design creative, bespoke layouts and interfaces that perfectly match the specific problem. Avoid "cookie-cutter" designs. Let your creativity shape the presentation!

### Section 7: Mental Algorithm and Pitfalls

Give a reusable thinking pattern:

```
When you see this type of problem:
1. Identify given items
2. Identify target
3. Choose first representation
4. Apply smallest transformation
5. Track where each output goes
6. Mark decisions
7. Validate final result
```

Also list 2-5 common mistakes and how to avoid them.

**Example:**
- **Mistake:** Jumping from formula to final answer without showing arithmetic
- **Fix:** Always substitute real numbers and show each calculation step
- **Mistake:** Forgetting to track where intermediate values are used
- **Fix:** Every output must have a "next reference" field

### Section 8: Validation Checklist

Before finalizing, verify:

- [ ] Every variable has a source (given / derived / formula / assumption)
- [ ] Every output has a later reference or final role (no orphans)
- [ ] Every arithmetic result matches the shown calculation (real numbers, not placeholders)
- [ ] Every decision shows candidates, comparison rule, winner, and reason
- [ ] HTML is single-file (no external dependencies except CDN)
- [ ] Visual scene is not a static mockup (has atomic step controls)
- [ ] Step controls walk through atomic trace items (not big blocks)
- [ ] Explanation panel is synchronized with the visible step
- [ ] Parameter changes reset and recalculate the process (not just update final number)
- [ ] No "AI slop" design (no Inter/Roboto/Arial fonts, no purple gradients, no predictable layouts)

## Atomic Step Rules

### What Counts as an "Atomic Step"?

An atomic step is the **smallest meaningful operation** that produces or transforms a value:

✅ **Atomic:**
- One multiplication: `3 × 4 = 12`
- One addition to accumulator: `accumulator = 7 + 5 = 12`
- One comparison: `7 > 5, so 7 is current max`
- One assignment: `C[1,1] = 13`
- One subtraction: `4 - 1 = 3`
- One square: `3² = 9`
- One square root: `√25 = 5`
- One candidate evaluation: `d₃ = 1.8, class = B`

❌ **NOT atomic (too big):**
- "Calculate all distances" (should be N separate steps)
- "Sort the array" (should be individual comparisons/swaps)
- "Compute the matrix product" (should be cell-by-cell, term-by-term)
- "Select K nearest neighbors" (should be individual comparisons)

**Rule:** If an operation involves multiple sub-operations, break it down. If a cell requires 
9 multiplications and additions, that's 9+ steps, not 1.

### The 5-Line Block Pattern

Every step in Section 4 must use this exact format:

```
### Step N — short name

- Input: value/concept and where it came from
- Operation / Formula: rule applied; if numerical, substitute real values and show arithmetic
- Output: produced value/concept
- Next reference: where this output will be used later
- Decision, if any: condition, candidates, winner/loser, and reason
```

**Example:**

```
### Step 3 — Calculate distance to Point 1

- Input: P₁ = (1, 2), new point = (4, 6) (from Step 1)
- Operation: d = √((4-1)² + (6-2)²) = √(9 + 16) = √25 = 5
- Output: d₁ = 5
- Next reference: Will be used in Step 8 (sorting distances)
- Decision: None
```

### Dynamic State Engine Architecture

Do NOT use a static pre-computed JSON trace list. The simulation must be a dynamic state engine. The JavaScript (or backend) must contain the actual algorithm logic. 

When the user interacts (e.g., clicks to add a new point in KNN or generates random data):
1. The simulation calculates the new steps dynamically.
2. The "Next" and "Previous" controls allow the user to step forward and backward through the calculation process of that *specific* new state.
3. Tooltips and explanation panels update in real-time to explain the newly generated steps.

The scene, controls, tooltips, and explanation panel must react to user inputs on the fly.

### Prohibited Behaviors (10 Rules)

These behaviors are FORBIDDEN because they defeat the purpose of atomic visualization:

1. **No slider-only result changes:** Moving a slider or changing an input must NOT just update the final number. It must trigger a recalculation of the dynamic state so the user can step through the new process.

2. **No static slideshows or pre-computed traces:** The simulation MUST be a living sandbox. Do not output a hardcoded array of steps. Let the code generate the steps on the fly.

3. **No big-block reveals:** One "Next" click must NOT reveal a whole row, matrix, or final answer. 
   It must advance by ONE atomic operation.

4. **No hidden intermediate values:** Every intermediate calculation must be visible. Don't skip 
   from formula to result.

5. **No hidden decision logic:** Every decision must show candidates, comparison, winner, and reason. 
   Don't just say "selected the best".

6. **No instant number appearance:** Numbers must not appear from nowhere. They must be built from 
   sources, moved through operations, and arrive at targets.

7. **No complex-but-uneducational code:** The code can be complex internally, but the user experience 
   must be simple, clear, and educational.

8. **No calculator panels:** Don't build a "enter input → see output" panel. Build a visual simulation 
   where operations happen visibly.

9. **No fake animations:** Don't use CSS transitions to just move boxes around. Show real operations 
   with real arithmetic.

10. **No memorization-style explanations:** Don't say "this formula is X". Say "this formula is used 
    here because... and each part does...".

**For detailed anti-patterns, see:** [references/prohibitions-and-requirements.md](references/prohibitions-and-requirements.md)

### Required Behaviors (16 Rules)

These behaviors are MANDATORY for every simulation:

1. **Atomic steps:** Every "Next" click advances by ONE atomic operation
2. **Step-by-step number construction:** Numbers are built visibly, not shown instantly
3. **Real arithmetic:** Use actual numbers from the problem, show actual calculations
4. **Visible intermediate values:** Every intermediate result is shown
5. **Next reference tracking:** Every output shows where it will be used next
6. **Decision candidate comparison:** All candidates shown side-by-side before selection
7. **Winner/loser marking:** Winner highlighted, losers faded or crossed out
8. **Panel-scene synchronization:** Explanation panel describes the current step, not a different one
9. **Single-file HTML:** All HTML + CSS + JS in one file, no external dependencies except CDN
10. **Step controls:** Previous, Next, Play/Pause, Speed, Reset buttons
11. **Source → Operation → Result → Target flow:** Every value's journey is visible
12. **Granularity control:** Toggle between "atomic step" and "stage" modes
13. **Parameter reset:** Changing a parameter resets and replays the simulation
14. **Micro-step definition:** "Step" = one read / one subtract / one multiply / one add / one compare
15. **"Why" explanation:** Every operation explains WHY it's being done
16. **Transformation and reference chain:** Every value shows what it transforms into and where that's used

## Simulation Requirements

### HTML Structure

The HTML file must contain:

1. **Visual scene** (left or center): Shows sources, working area, targets
2. **Explanation panel** (right or bottom): Shows current step's text explanation
3. **Step controls** (top or bottom): Previous, Next, Play/Pause, Speed, Reset
4. **Parameter controls** (optional, top): Sliders or inputs for changing parameters

**Recommended layout:**

```
┌─────────────────────────────────────────────────────────┐
│  [Parameter controls: sliders, inputs]                  │
├─────────────────────────────────────────────────────────┤
│  [Step controls: ◄ Prev | Next ► | ▶ Play | Speed | ↺] │
├──────────────────────────┬──────────────────────────────┤
│                          │                              │
│  Visual Scene            │  Explanation Panel           │
│  - Source values         │  - Current step description  │
│  - Working area          │  - Input, operation, output  │
│  - Target values         │  - Next reference            │
│  - Animations            │  - Decision info (if any)    │
│                          │                              │
└──────────────────────────┴──────────────────────────────┘
```

### Animation Rules

1. **Operand movement:** When an operation uses values, those values should visually move from their 
   source location to the working area (or at least highlight and draw a line).

2. **Working area accumulation:** If a value is built from multiple terms (e.g., accumulator), show 
   each term being added: `0 → +3 = 3 → +8 = 11 → +2 = 13`.

3. **Result placement:** The result should visually move from the working area to its target location.

4. **Highlighting:** Active sources glow or highlight. Computed values stay filled. Pending targets 
   show "?" until filled.

5. **Decision dramatization:** For decisions, show all candidates side-by-side, highlight the current 
   comparison, mark the winner (glow/pulse), fade the losers (gray out or strikethrough).

**For animation code examples, see:** [references/animation-recipes.md](references/animation-recipes.md)

### Step Controls

The simulation must have these controls:

- **◄ Previous:** Go back one atomic step
- **Next ►:** Advance one atomic step
- **▶ Play / ⏸ Pause:** Auto-play through steps (with pause)
- **Speed:** Slow / Medium / Fast (adjusts animation duration)
- **↺ Reset:** Return to step 0, clear all computed values
- **Granularity toggle** (optional): Switch between "atomic step" and "stage" mode

**Default timing:** ~700ms per step, ~450ms per animation

### Parameter Controls (Optional)

If the simulation has adjustable parameters:

- Provide sliders or input fields for key parameters
- When a parameter changes:
  - Reset the simulation to step 0
  - Recalculate ALL affected values
  - Replay the process (don't just update the final number)

**Why:** If changing K from 3 to 5 only updates the final classification, the user doesn't see HOW 
the process changed. They need to see that now 5 neighbors are selected instead of 3, and the vote 
count changes.

### Technical Requirements

1. **Single file:** All HTML, CSS, and JavaScript must be in one `.html` file
2. **No build tools:** The file must work when opened directly in a browser
3. **No localStorage/sessionStorage:** Don't persist state between sessions
4. **CDN libraries allowed:** You can use GSAP, anime.js, D3, etc. via CDN `<script src="...">`
5. **Canvas or SVG/DOM:** Use whichever best shows the movement and operations
6. **Real calculations:** The HTML must actually compute the values, not show pre-computed mockups
7. **Responsive:** Should work on different screen sizes (but prioritize desktop/laptop)

### Domain-Specific Visualization Patterns

#### Priority Queue / Heap Operations
For algorithms like Dijkstra, A*, or any algorithm using priority queues:

**Visualization approach:**
- **Distance/cost table:** Show all nodes with their current distances/costs. Highlight the node being extracted (min-heap extract-min).
- **Relaxation animation:** When a shorter path is found, animate the distance update: old value fades out, new value fades in with highlight.
- **Priority queue state:** Show a simplified "queue view" (not full heap structure) with the next few nodes to be processed. Example:
  ```
  Priority Queue (next 5):
  [Node 3: dist=5] [Node 7: dist=8] [Node 2: dist=12] ...
  ↑ extract-min
  ```
- **Path highlighting:** When a node is finalized, highlight the shortest path from source to that node.

**Why abstraction?** Full binary heap visualization (tree structure with parent-child relationships) is complex and distracts from the algorithm's core logic. The queue abstraction focuses on "what's next" rather than "how the heap is structured".

#### Pathfinding (A*, BFS, DFS)
For grid-based pathfinding algorithms:

**Visualization approach:**
- **Grid coloring:**
  - Open set (frontier): Light green background
  - Closed set (visited): Light red/pink background
  - Current node: Bright yellow with pulsing animation
  - Final path: Bright yellow line connecting start to goal
  - Obstacles: Dark gray/black
- **Cell info overlay:** When a cell is being evaluated, show:
  ```
  f(n) = g(n) + h(n)
  f = 15 + 8 = 23
  ```
- **Neighbor expansion:** Animate the 4 (or 8) neighbors being checked, with their f-values calculated and added to open set if better.
- **Backtracking:** When goal is reached, animate the path reconstruction by following parent pointers backward.

**Step-by-step for A*:**
1. Start node added to open set
2. Extract node with lowest f(n)
3. Check if goal → if yes, reconstruct path
4. For each neighbor:
   - Calculate tentative g(n) = current.g + distance(neighbor)
   - If better than known, update and add to open set
5. Move current node to closed set
6. Repeat from step 2

#### Circuit Analysis
For electrical circuits (Ohm's law, Kirchhoff's laws):

**Visualization approach:**
- **Schematic diagram:** Draw circuit with standard symbols (resistor zigzag, battery, etc.)
- **Current flow animation:** Show electrons (dots) flowing through wires. Speed proportional to current magnitude.
- **Component highlighting:** When calculating V, I, or R for a component, highlight it with glow effect.
- **Voltage drops:** Show voltage at each node (numbers next to nodes). Animate voltage drop across components.
- **Kirchhoff's laws:**
  - KCL (current): Show current entering/leaving a node with arrows. Sum = 0.
  - KVL (voltage): Show loop with voltage rises/drops. Sum = 0.

**Example step:**
```
Step 5: Calculate current through R₁

Input: V_source = 12V, R₁ = 4Ω, R₂ = 6Ω (series)
Operation: I = V / (R₁ + R₂) = 12V / (4Ω + 6Ω) = 12V / 10Ω = 1.2A
Output: I = 1.2A (same through both resistors, series circuit)
Visual: Current arrows animate through circuit, speed = 1.2A
```

#### Thermodynamics Cycles
For heat engines, refrigeration cycles (Carnot, Otto, Diesel):

**Visualization approach:**
- **P-V diagram:** Plot pressure vs. volume with state points (1, 2, 3, 4).
- **Process curves:** Draw each process (isothermal, adiabatic, isobaric, isochoric) with different colors/styles.
- **State point animation:** Animate the state point moving along the process curve from state 1 → 2 → 3 → 4 → 1.
- **Work calculation:** Show area under the curve (shaded region) = work done.
- **Heat transfer:** Show Q_in (red arrow into system) and Q_out (blue arrow out of system).
- **Efficiency:** Calculate η = W_net / Q_in = (Q_in - Q_out) / Q_in

**Example step:**
```
Step 3: Isothermal expansion (State 2 → State 3)

Input: T = 600K (constant), V₂ = 0.5 m³, V₃ = 1.0 m³, n = 1 mol
Operation: 
  - Work: W₂₃ = nRT ln(V₃/V₂) = (1)(8.314)(600) ln(1.0/0.5)
         = 4988.4 × 0.693 = 3457 J
  - Heat: Q₂₃ = W₂₃ = 3457 J (isothermal, ΔU = 0)
Output: W₂₃ = 3457 J, Q₂₃ = 3457 J
Visual: State point moves along isotherm curve, area under curve shaded
```

#### Recursive Algorithms
For recursion (factorial, Fibonacci, tree traversal):

**Visualization approach:**
- **Call stack:** Show stack frames as boxes, with each frame containing:
  - Function name and parameters
  - Local variables
  - Return address
- **Push/pop animation:** When a recursive call is made, animate a new frame being pushed onto the stack. When it returns, animate the frame popping off and the return value being passed back.
- **Base case highlight:** When base case is reached, highlight the frame with a special color (e.g., green).
- **Stack unwinding:** Show the return values propagating back up the stack.

**Example for factorial(4):**
```
Stack state at max depth:

┌─────────────────┐
│ factorial(0)    │ ← Base case: return 1
│ return 1        │
├─────────────────┤
│ factorial(1)    │ Waiting for factorial(0)
│ return 1 * ?    │
├─────────────────┤
│ factorial(2)    │ Waiting for factorial(1)
│ return 2 * ?    │
├─────────────────┤
│ factorial(3)    │ Waiting for factorial(2)
│ return 3 * ?    │
├─────────────────┤
│ factorial(4)    │ Waiting for factorial(3)
│ return 4 * ?    │
└─────────────────┘

Unwinding:
factorial(0) returns 1
factorial(1) = 1 * 1 = 1, returns 1
factorial(2) = 2 * 1 = 2, returns 2
factorial(3) = 3 * 2 = 6, returns 6
factorial(4) = 4 * 6 = 24, returns 24
```

#### Stress-Strain / Material Testing
For mechanical engineering (tensile testing, material properties):

**Visualization approach:**
- **Stress-strain curve:** Plot σ (stress) vs. ε (strain) with key points marked.
- **Key points:**
  - Proportional limit (Hooke's law region)
  - Yield point (plastic deformation begins)
  - Ultimate tensile strength (maximum stress)
  - Fracture point (material breaks)
- **Loading animation:** Show the curve being drawn as load increases.
- **Specimen deformation:** Show a sample specimen (rectangle) stretching and necking.
- **Calculations:** For each region, show the formula:
  - Elastic: σ = E·ε (Hooke's law)
  - Plastic: σ = K·εⁿ (power law)

**Example step:**
```
Step 5: Calculate stress at yield point

Input: F_yield = 250 kN, A₀ = 500 mm² (original cross-section)
Operation: σ_yield = F_yield / A₀ = 250,000 N / 500 mm² = 500 MPa
Output: σ_yield = 500 MPa
Visual: Stress-strain curve highlights yield point, specimen shows slight permanent deformation
```

### Design Anti-Patterns ("AI Slop" to Avoid)

These design choices are overused and make the simulation look generic:

❌ **Forbidden fonts:** Inter, Roboto, Arial, system fonts (use distinctive fonts instead)
❌ **Forbidden colors:** Purple gradients on white/dark backgrounds (use bold, cohesive palettes)
❌ **Forbidden layouts:** Predictable centered hero layouts (use asymmetric, overlapping, grid-breaking)
❌ **Forbidden effects:** Generic fade-ins without purpose (use meaningful animations)

**Instead:**

✅ Choose a bold aesthetic direction (brutalist, editorial, retro-futuristic, organic, etc.)
✅ Use distinctive typography (Bricolage Grotesque, Space Grotesk, DM Sans, JetBrains Mono)
✅ Create atmosphere with gradient meshes, noise textures, geometric patterns
✅ Make animations meaningful (show operations, not just decoration)

**For design guidelines, see:** [references/design-anti-slop.md](references/design-anti-slop.md)

### Conceptual Topic Adaptation

If the topic has no arithmetic (e.g., DNS resolution, TCP handshake, concept explanation):

- **Atomic step** = one conceptual transformation or inference
- **Source** = concept or idea (highlighted)
- **Operation** = logical transformation (arrow/flow moves to target)
- **Output** = new concept or state
- **Decision** = branch choice (show alternatives, mark selected path, fade rejected paths with reason)

The skeleton (atomic steps + movement + decision emphasis) stays the same. Only the content changes 
from numbers to concepts.

**Example for DNS:**

```
### Step 3 — Query Root Server

- Input: Domain "example.com" (from Step 2)
- Operation: Root server checks TLD ".com", returns referral to .com nameservers
- Output: Referral to .com TLD servers
- Next reference: Step 4 will query .com TLD server
- Decision: None
```

Visual: "example.com" highlights, arrow moves to root server icon, root server returns referral 
message, referral moves to next step.

## Topic Adaptation Guide

### Numerical / Mathematical Topics

**Pattern:** Value → Formula → Intermediate result → Final result

**Example topics:**
- KNN classification
- Matrix multiplication
- Gradient descent
- Hypothesis testing (p-value, confidence intervals)
- Regression coefficients

**Key considerations:**
- Show every arithmetic operation explicitly
- Use real numbers from the problem
- For iterative algorithms, show the loop and convergence
- For decisions (max/min/threshold), dramatize the comparison
- **For physics problems:** Show units at every step (e.g., "v₀ = 10 m/s", "t = 2 s", "x = v₀·t = 10 m/s × 2 s = 20 m")
- **For statistics without clear decisions:** Add validation checkpoints instead (e.g., "Check: Is CI width reasonable?", "Verify: Does R² make sense?")

### Conceptual Topics

**Pattern:** Concept → Inference → Connection → Result

**Example topics:**
- DNS resolution
- TCP 3-way handshake
- How blockchain works
- What is recursion

**Key considerations:**
- Replace numbers with concepts
- Show logical flow and dependencies
- For branching logic, show all paths and mark the chosen one
- Use metaphors to ground abstract concepts
- **For cryptographic operations (hashing, encryption):** Use abstraction level appropriate to learning goal. For "how blockchain works", show hash input → output (don't show SHA-256 bitwise operations). For "how SHA-256 works", show bitwise operations step-by-step.
- **For recursive algorithms:** Show call stack explicitly with frame push/pop. Highlight base case detection and stack unwinding. Use indentation or tree diagram to show recursion depth.

### Algorithms

**Pattern:** Data → Operation → State update → Decision

**Example topics:**
- QuickSort
- Dijkstra's shortest path
- Binary search
- Gradient descent

**Key considerations:**
- Show the data structure state at each step
- Highlight the current element/node being processed
- For decisions (if/else, while condition), show the comparison
- For loops, show the iteration and termination condition
- **For graph algorithms (Dijkstra, A\*):** Use node/edge highlighting with distance table. Show priority queue operations explicitly (extract-min, decrease-key). Animate path relaxation step-by-step.
- **For pathfinding (A\*, BFS, DFS):** Use grid visualization with open/closed set highlighting. Show f(n) = g(n) + h(n) calculation for each node. Animate neighbor expansion and backtracking.
- **For algorithms with large datasets (100+ elements):** Use abstraction - show 5-10 representative elements, then indicate "pattern continues for remaining elements"

### Physics / Engineering

**Pattern:** Given quantity → Formula → Intermediate quantity → Target quantity

**Example topics:**
- Projectile motion
- Circuit analysis
- Thermodynamics cycles
- Stress-strain calculations

**Key considerations:**
- Show units at every step
- Explain why each formula is chosen
- Show the physical meaning of intermediate results
- For vector quantities, show direction and magnitude
- **For circuit analysis:** Use schematic diagram with current flow animation. Highlight active components during calculation. Show Kirchhoff's law application step-by-step.
- **For thermodynamics:** Use P-V diagram with state point animation. Show each process (isothermal, adiabatic, etc.) separately. Highlight cycle completion and efficiency calculation.
- **For stress-strain:** Show material diagram with loading path. Highlight yield point, ultimate strength, fracture point as decision checkpoints.

### Machine Learning / AI

**Pattern:** Data → Features → Calculation → Score → Decision

**Example topics:**
- KNN classification
- CNN convolution
- Decision tree splits
- Neural network forward pass

**Key considerations:**
- Show the data flow through the model
- For neural networks, show matrix multiplications term-by-term
- For decisions (classification, regression), show the score comparison
- Explain what each layer/operation is learning
- **For neural networks with many neurons (100+):** Show 3-5 neurons per layer in detail, then indicate "remaining neurons follow same pattern". Focus on one complete forward pass path.
- **For ensemble methods (Random Forest, Gradient Boosting):** Show 3 trees in detail with their predictions, then show aggregation step (voting/averaging). Don't show all 100+ trees.
- **For optimization problems (SVM, logistic regression):** Show iterative refinement: initial parameters → loss calculation → gradient → parameter update → repeat. Highlight convergence check.
- **For dimensionality reduction (PCA):** Show covariance matrix calculation, then eigenvalue/eigenvector computation (use numerical method abstraction if complex), then projection step.

### Signal Processing

**Pattern:** Time-domain signal → Transform → Frequency components → Analysis/Synthesis

**Example topics:**
- Fourier Transform (continuous/discrete)
- Convolution
- Filtering (low-pass, high-pass)
- Sampling and reconstruction

**Key considerations:**
- Show time-domain waveform and frequency-domain spectrum side-by-side
- For Fourier Transform, show decomposition into sinusoidal components step-by-step
- Animate how individual sine waves combine to form the original signal
- Use color coding: time-domain (blue), frequency-domain (red), individual components (various colors)
- **For continuous transforms:** Use numerical approximation with N sample points (discretization)
- **For convolution:** Show sliding window operation step-by-step, with kernel flipping for mathematical convolution
- **For filtering:** Show frequency response curve and how it attenuates/amplifies different frequency components

**Visualization approach:**
- **Dual-domain display:** Time-domain plot (left) + frequency-domain spectrum (right)
- **Sinusoidal decomposition:** Show 3-5 dominant frequency components as individual sine waves, then animate their superposition
- **Convolution animation:** 
  1. Show input signal and kernel
  2. Flip kernel (for mathematical convolution)
  3. Slide kernel across signal step-by-step
  4. At each position, show pointwise multiplication and summation
  5. Build output signal point-by-point
- **Filtering visualization:**
  1. Show original signal's frequency spectrum
  2. Overlay filter's frequency response curve
  3. Show pointwise multiplication (spectrum × filter response)
  4. Inverse transform to get filtered signal

**Example step for Fourier Transform:**
```
Step 5: Calculate amplitude of 3rd harmonic (f₃ = 3 Hz)

Input: Signal x(t), frequency f₃ = 3 Hz, N = 100 samples
Operation: 
  - a₃ = (2/N) Σ x(tₙ)·cos(2π·3·tₙ)
  - b₃ = (2/N) Σ x(tₙ)·sin(2π·3·tₙ)
  - A₃ = √(a₃² + b₃²)
  - φ₃ = arctan(b₃/a₃)
Output: A₃ = 0.45, φ₃ = 1.2 rad
Visual: 3 Hz sine wave (A=0.45, φ=1.2) appears in decomposition panel, 
        frequency spectrum shows spike at f=3 Hz with height 0.45
```

### Reinforcement Learning

**Pattern:** State → Action → Reward → Next state → Value update

**Example topics:**
- Q-learning
- Policy iteration
- Value iteration
- Multi-armed bandits

**Key considerations:**
- Show agent-environment interaction loop explicitly
- For Q-learning, show Q-table updates step-by-step
- Animate exploration vs. exploitation (ε-greedy policy)
- Show episode progression and convergence
- Use grid world or simple environment for visualization
- **For large state spaces:** Use abstraction - show representative states, then indicate pattern continues

**Visualization approach:**
- **Environment display:** Grid world with agent position, goal, obstacles
- **Q-table visualization:** 
  - Show table with states (rows) × actions (columns)
  - Highlight current (state, action) cell
  - Animate Q-value update with color intensity (low → high)
- **Agent behavior:**
  1. Current state highlighted
  2. ε-greedy decision: random action (explore) vs. max Q action (exploit)
  3. Action executed, agent moves
  4. Reward observed (show reward value)
  5. Q-value updated: Q(s,a) ← Q(s,a) + α[r + γ·max Q(s',a') - Q(s,a)]
  6. Show update calculation step-by-step
- **Learning curve:** Plot episode reward over time, show convergence
- **Policy visualization:** After learning, show arrows in each cell indicating best action

**Example step for Q-learning:**
```
Step 12: Update Q-value for (state=2, action=right)

Input: 
  - Current state s=2, action a=right
  - Observed reward r=10
  - Next state s'=3
  - Q(s,a) = 0.5 (current value)
  - max Q(s',a') = 0.8 (best action from s')
  - α = 0.1 (learning rate), γ = 0.9 (discount)

Operation:
  Q(s,a) ← Q(s,a) + α[r + γ·max Q(s',a') - Q(s,a)]
  Q(2,right) ← 0.5 + 0.1[10 + 0.9·0.8 - 0.5]
            ← 0.5 + 0.1[10 + 0.72 - 0.5]
            ← 0.5 + 0.1[10.22]
            ← 0.5 + 1.022
            ← 1.522

Output: Q(2,right) = 1.522
Visual: Q-table cell (2,right) updates from 0.5 to 1.522, 
        color intensity increases, calculation shown in side panel
```

## Quality Checklist

Before delivering the final output, verify:

### Content Quality

- [ ] Every variable in Section 1 has a source (given / derived / formula / assumption)
- [ ] Every output in Section 4 has a "next reference" (no orphan values)
- [ ] Every arithmetic in Section 4 uses real numbers and shows actual calculations
- [ ] Every decision shows candidates, comparison rule, winner, and reason
- [ ] Section 5 (transformation map) summarizes the entire flow correctly
- [ ] Section 7 (mental algorithm) gives a reusable thinking pattern
- [ ] Section 8 (validation) lists 2-5 common mistakes

### HTML Quality

- [ ] HTML is a single file (no external files except CDN)
- [ ] HTML can be opened directly in a browser (no build step needed)
- [ ] Visual scene is interactive (has step controls)
- [ ] Step controls advance by ONE atomic operation per click (not big blocks)
- [ ] Explanation panel is synchronized with the current step
- [ ] Parameter changes reset and replay the simulation (not just update final number)
- [ ] No "AI slop" design (no Inter/Roboto/Arial, no purple gradients, no predictable layouts)
- [ ] Animations are meaningful (show operations, not just decoration)
- [ ] All calculations in HTML match Section 4 (real arithmetic, not mockups)

### Educational Quality

- [ ] A user who reads the explanation AND watches the simulation understands HOW the answer is constructed
- [ ] No step "magically" produces a result without showing the process
- [ ] Decision points are dramatized (candidates shown, winner marked, reason explained)
- [ ] The "why" is explained, not just the "what"
- [ ] A user could apply the mental algorithm (Section 7) to a similar problem

## References

Detailed documentation is available in the `references/` directory. Read these files when you need 
more detail:

- **[references/trace-schema.md](references/trace-schema.md)** — Full trace JSON schema with field 
  descriptions and examples
- **[references/animation-recipes.md](references/animation-recipes.md)** — GSAP/anime.js code examples 
  for operand movement, accumulator, decision dramatization
- **[references/topic-examples.md](references/topic-examples.md)** — Complete examples for KNN, matrix 
  multiplication, DNS resolution
- **[references/prohibitions-and-requirements.md](references/prohibitions-and-requirements.md)** — Detailed 
  explanations of the 10 prohibitions and 16 requirements
- **[references/design-anti-slop.md](references/design-anti-slop.md)** — Design guidelines to avoid 
  generic AI aesthetics

## Assets

Examples are available in the `assets/` directory:

- **[assets/example-trace.json](assets/example-trace.json)** — Complete trace for a KNN example (~50 steps)

## Example Usage

### Example 1: KNN Classification

**User prompt:** "Explain KNN classification step by step with a visual simulation"

**Skill response:**

1. **Section 0 (Summary):** KNN classifies a new point by finding its K nearest neighbors and 
   taking a majority vote.

2. **Section 1 (Inventory):** List all given data (training points, new point, K value), formulas 
   (distance function), and derived values (distances, sorted list, vote counts).

3. **Section 2 (Target):** Classify the new point. Complete when majority class is determined.

4. **Section 3 (Starting point):** Show the training data as a table and the new point coordinates.

5. **Section 4 (Step-by-step flow):**
   - Step 1: Calculate distance to Point 1: d₁ = √((4-1)² + (6-2)²) = 5
   - Step 2: Calculate distance to Point 2: d₂ = √((4-3)² + (6-5)²) = 1.41
   - ... (N steps for N points)
   - Step N+1: Sort distances ascending: [1.41, 2.24, 3.16, 5, 7.07]
   - Step N+2: Select K=3 smallest: [1.41, 2.24, 3.16]
   - Step N+3: Get classes of 3 neighbors: [B, A, B]
   - Step N+4: Count votes: B=2, A=1
   - Step N+5: Majority vote: B wins (2 > 1)

6. **Section 5 (Transformation map):** Table showing the entire flow from input data to final classification.

7. **Section 6 (HTML simulation):** Single-file HTML with:
   - Visual scene showing training points, new point, distance calculations
   - Working area showing accumulator for distance formula
   - Decision scene showing all distances, then 3 smallest highlighted
   - Vote count visualization with B winning
   - Step controls to advance through each atomic operation

8. **Section 7 (Mental algorithm):** "When you see a classification problem: (1) identify the data, 
   (2) define the distance metric, (3) calculate all distances, (4) sort and select K, (5) vote."

9. **Section 8 (Validation):** Checklist confirming all values have sources, all decisions are 
   dramatized, HTML is interactive.

### Example 2: Matrix Multiplication

**User prompt:** "Show me how matrix multiplication works atomically"

**Skill response:**

1. **Section 0:** Matrix multiplication computes each cell of the result as a dot product of a row 
   and a column.

2. **Section 1:** List matrices A (3×3), B (3×3), result matrix C (3×3), and the dot product formula.

3. **Section 2:** Compute all 9 cells of C. Complete when all cells are filled.

4. **Section 3:** Show matrices A and B with their values.

5. **Section 4:** For C[1,1]:
   - Step 1: A[1,1]·B[1,1] = 3×1 = 3, accumulator = 3
   - Step 2: A[1,2]·B[2,1] = 2×4 = 8, accumulator = 3+8 = 11
   - Step 3: A[1,3]·B[3,1] = 1×2 = 2, accumulator = 11+2 = 13
   - Step 4: C[1,1] = 13
   
   Then repeat for C[1,2], C[1,3], ..., C[3,3] (36 total atomic steps).

6. **Section 5:** Transformation map showing the flow for all 9 cells.

7. **Section 6:** HTML simulation with:
   - Matrices A, B, C displayed as grids
   - Working area showing accumulator
   - Animations showing values moving from A and B to working area, then result to C
   - Step controls to advance through each multiplication and addition

8. **Section 7:** Mental algorithm for matrix multiplication.

9. **Section 8:** Validation checklist.

## Final Notes

This skill is designed to transform how AI explains complex topics. Instead of jumping from formula 
to answer, it forces atomic visibility of every operation. Instead of hiding decision logic, it 
dramatizes choices. Instead of giving static diagrams, it creates interactive simulations.

The key insight: **Understanding comes from seeing the construction, not just the result.**

When you use this skill, you're not just getting an explanation — you're getting a visual trace of 
how knowledge is built, step by atomic step.
