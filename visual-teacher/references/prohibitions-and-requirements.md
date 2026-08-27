# Prohibitions and Requirements — Detailed Explanation

This file contains detailed explanations of the 10 prohibitions and 16 requirements 
briefly listed in SKILL.md, along with examples and avoidance strategies. When the model 
reads this file, it should deeply understand the principles that prevent it from producing 
poor simulations.

---

## PART A: 10 PROHIBITIONS (Anti-Patterns)

### Y1: Changing results only via slider

**PROHIBITED:** When the user moves the slider, only the result number updates while 
nothing else changes in the background. For example: when increasing K from 3 to 5, the 
"Prediction: B" text on screen instantly becomes "Prediction: A".

**Why it's prohibited:** This is not a "simulation" but a "calculator". The user cannot 
understand WHY the result changed. They cannot see that when K=5, 5 neighbors are selected, 
the votes are 3-2, and therefore the result changes.

**Correct approach:** When the slider changes:
1. The simulation resets to Step 0
2. All distances are recalculated (if a parameter has changed)
3. Sorting is redone according to the new K value
4. A new neighbor list is selected
5. A new vote is performed
6. The user watches this entire process through atomic steps

**Code example — BAD:**
```javascript
slider.oninput = () => {
  K = parseInt(slider.value);
  result.textContent = computeResult(K); // Instant result
};
```

**Code example — GOOD:**
```javascript
slider.oninput = () => {
  K = parseInt(slider.value);
  trace = buildTrace(data, K); // Entire trace is recalculated
  player.reset();
  player.setTrace(trace);
  // The user watches the new process from the beginning
};
```

### Y2: Producing a static mockup

**PROHIBITED:** The HTML file being only a visually attractive but non-interactive 
diagram. Control buttons not working, steps not advancing.

**Why it's prohibited:** The user must be able to "watch" the process — advance step by 
step, go back, play. A static visual does not provide this.

**Check:** The following buttons MUST WORK in the produced HTML:
- ◄ Back (one step back)
- Next ► (one step forward)
- ▶ Play (auto-play)
- ↺ Reset (return to start)

Every button must have a click handler and must actually work.

### Y3: Large block in a single press

**PROHIBITED:** When the "Next" button is pressed, a large block of operations appears 
all at once. For example, all distances being calculated simultaneously, an entire row 
filling in, or a matrix cell being completed in a single shot.

**Why it's prohibited:** This violates the "atomic step" principle. The user wants to 
see HOW the process unfolds, not what the result is.

**Correct approach:** Each "Next" press should produce a SINGLE atomic operation:
- A single multiplication (3 × 4 = 12)
- A single addition (accumulator: 3 + 8 = 11)
- A single comparison (7 > 5 → winner is 7)
- A single assignment (C[1,1] = 13)

**Check:** If more than 1 number appears on screen when you press Next, there's a problem.

### Y4: Hiding intermediate values

**PROHIBITED:** Jumping directly from formula to result. For example:
- Writing "d = √(9+16) = 5" (where do 9 and 16 come from? How did the sum form?)
- Writing "C[1,1] = 13" (which multiplications? which sums?)

**Why it's prohibited:** Intermediate values show "how" the calculation happens. Without 
them, the user only knows the result, not the process.

**Correct approach:** Show each intermediate value as a separate step:
```
Step 3: Δx = 4 - 1 = 3
Step 4: (Δx)² = 3² = 9
Step 5: Δy = 6 - 2 = 4
Step 6: (Δy)² = 4² = 16
Step 7: 9 + 16 = 25
Step 8: √25 = 5
```

### Y5: Hiding decision points

**PROHIBITED:** When a selection is made, showing only the result:
- "The 3 nearest neighbors were selected" (which 3? why those 3?)
- "Class determined as B" (how many votes? how many votes did A get?)

**Why it's prohibited:** Decision points are the "intelligence" part of the algorithm. 
Seeing how the decision is made is the key to understanding the algorithm.

**Correct approach:** The decision scene:
1. ALL candidates are shown side by side
2. The comparison rule is explained
3. The winner is highlighted (glow, color, enlargement)
4. The losers fade (gray, shrink, strikethrough)
5. The rationale for the decision is written

### Y6: Skipping the formation of a number

**PROHIBITED:** A number "suddenly" appearing on the scene. As if it arrived there by magic.

**Why it's prohibited:** Numbers have a source, an operation process, and a target location. 
If this journey is invisible, the user cannot understand where the value came from.

**Correct approach:** For every number:
1. **Source:** Where does the value come from? (which cell, which step?)
2. **Movement:** It is animated from source to the operation area
3. **Operation:** The formula is applied in the operation area
4. **Result:** The intermediate value is formed
5. **Target:** The result is animated to its target location

### Y7: Complex code that doesn't teach

**PROHIBITED:** The code being very complex while the user experience is also complex or 
confusing. 3000 lines of HTML but the user doesn't understand what's going on.

**Why it's prohibited:** The goal is not "to write impressive code" but "to help the user 
understand the topic". The code can be complex (in the background), but the UX should be 
clean and educational.

**Correct approach:**
- The background logic (trace player, animation engine) can be complex
- But what appears on screen should be:
  - Clear steps
  - Distinct colors
  - Readable fonts
  - Understandable narration panel
  - Intuitive controls

**Check:** If someone you show it to asks "what does this do?", the UX is bad.

### Y8: Producing a calculator

**PROHIBITED:** A panel in the "enter input → calculate → see result" format. This is a 
"calculator", not a simulation.

**Why it's prohibited:** A calculator tells you "what" the result is, not "how" it was 
formed. The purpose of this skill is to show the "how".

**Difference:**
- **Calculator:** Input fields → Calculate button → Result box
- **Simulation:** Data table → Step-by-step processing → Animated result formation → Control buttons

### Y9: Fake animation

**PROHIBITED:** Using CSS transitions to only move boxes around without showing a real 
operation. Looking like "there's animation" when in fact only cosmetic changes are happening.

**Why it's prohibited:** Animation should explain the operation, not just look pretty.

**Correct approach:** Every animation should have a meaning:
- Operand movement → "this value is being taken from here"
- Formula display → "this operation is being applied"
- Result placement → "this value is going there"
- Color change → "this value is active/passive/winner/loser"

### Y10: Rote narration

**PROHIBITED:** Definition sentences like "This formula is this", "This concept is that".

**Why it's prohibited:** The user doesn't want definitions, they want UNDERSTANDING. "Why 
the formula is used here", "what each part does", "where the value produced by this 
operation goes".

**Correct approach:** Solution-flow narration:
- **Bad:** "Euclidean distance formula: d = √(Σ(xᵢ-yᵢ)²)"
- **Good:** "We use the Euclidean formula to calculate the distance between P₁ and the new 
  point. This formula gives the straight-line distance between two points. We square the 
  difference of each coordinate, sum them, then take the square root."

---

## PART B: 16 REQUIREMENTS

### Z1: Atomic step

**REQUIRED:** Each "Next" press should advance by a SINGLE smallest meaningful operation.

**What this means:**
- A multiplication (3 × 4 = 12)
- An addition (accumulator: 7 + 5 = 12)
- A comparison (7 > 5 → winner is 7)
- An assignment (C[1,1] = 13)

**What this does NOT mean:**
- "Calculate all distances" (too large)
- "Perform matrix multiplication" (too large)
- "Select K neighbors" (too large)

**Check:** If only 1 number appears on screen when the Next button is pressed, it's correct.

### Z2: Numbers form step by step

**REQUIRED:** Result numbers are not written ready-made. They form step by step from 
source to target.

**Example — C[1,1] = 13:**
```
A[1,1]=3 read → moved to operation area
B[1,1]=1 read → moved to operation area
3 × 1 = 3 → accumulator = 3
A[1,2]=2 read → moved to operation area
B[2,1]=4 read → moved to operation area
2 × 4 = 8 → accumulator = 3 + 8 = 11
A[1,3]=1 read → moved to operation area
B[3,1]=2 read → moved to operation area
1 × 2 = 2 → accumulator = 11 + 2 = 13
C[1,1] = 13 → placed in result cell
```

### Z3: Real arithmetic

**REQUIRED:** Real numbers are substituted into formulas, and the arithmetic is written 
out explicitly.

**Bad:** `d = √(Σ(xᵢ-yᵢ)²) = 5`
**Good:** `d = √((4-1)² + (6-2)²) = √(9+16) = √25 = 5`

**Rule:** For every formula application:
1. Symbols are replaced with real values
2. Intermediate operations are shown
3. The result is written out explicitly

### Z4: Every intermediate value is visible

**REQUIRED:** No intermediate value is skipped or hidden.

**Check:** However many intermediate operations there are on the path from formula to 
result, all of them must be separate steps.

**Example:** `√(9+16) = 5` → there are 2 intermediate values here:
1. 9+16 = 25 (sum)
2. √25 = 5 (square root)

Both must be shown.

### Z5: The next reference is shown

**REQUIRED:** For every output, "where it will be used next" is specified.

**Example:**
```
Output: d₁ = 3.16
➡️ This value will be used in the sorting phase (Step 39)
```

**Why it's important:** The user must understand "why each value is calculated". Saying 
"this distance was calculated" is not enough; you must say "this distance will be sorted 
for neighbor selection".

### Z6: Decision candidates are compared

**REQUIRED:** When a decision is made, ALL candidates are shown side by side.

**Example — K=3 selection:**
```
Candidates:
P₁: d=3.16 (class A)
P₂: d=2.24 (class B) ← selected
P₃: d=2.24 (class A) ← selected
P₄: d=2.24 (class B) ← selected
P₅: d=3.61 (class A)

Rule: Smallest K=3 distances
Comparison: 2.24 = 2.24 = 2.24 < 3.16 < 3.61
Selected: P₂, P₃, P₄
```

### Z7: Winner/loser distinction

**REQUIRED:** The winner is clearly highlighted, the losers clearly fade.

**Visual rules:**
- Winner: bright color, glow effect, enlargement (scale 1.1)
- Loser: gray tone, opacity 0.3, shrinkage (scale 0.9), strikethrough

**Additional:** The "reason the winner won" should also be written:
- "7 > 5 and 7 > 2 → max = 7 selected"
- "2.24 is one of the 3 smallest values → selected"

### Z8: Panel-scene synchronization

**REQUIRED:** The explanation panel describes the SAME step as the SCENE.

**Bad scenario:**
- On scene: 3 × 4 = 12 animation is playing
- In panel: "It will be added to the accumulator in the next step" is written
- (The panel is 1 step ahead!)

**Correct scenario:**
- On scene: 3 × 4 = 12 animation is playing
- In panel: "A[1,1]=3 is being multiplied by B[1,1]=1: 3 × 1 = 3"
- (Synchronized!)

**How to achieve:** Every trace step contains both the scene animation and the panel text. 
Both are updated at the same time.

### Z9: Single-file HTML

**REQUIRED:** All HTML + CSS + JS must be in a single `.html` file.

**Why:** The user must be able to open the file and run it immediately. There must be NO 
build step, npm install, or external file downloads.

**Exception:** Libraries can be loaded via CDN (GSAP, anime.js, D3):
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
```

**PROHIBITED:**
- External CSS file (`<link href="style.css">`)
- External JS file (`<script src="app.js"></script>` — CDN excluded)
- Build step (`npm run build`)
- Module import (`import ... from ...`)

### Z10: Forward/backward controls

**REQUIRED:** The user must be able to control the process step by step.

**Mandatory controls:**
1. ◄ Back (one step back)
2. Next ► (one step forward)
3. ▶ Play (auto-play)
4. ⏸ Pause (stop playback)
5. ↺ Reset (return to start)

**Optional but recommended:**
- Speed setting (slow/normal/fast)
- Granularity (atomic/phase)
- Step counter (Step 14 / 87)

### Z11: Source → Operation → Result → Target

**REQUIRED:** The journey of every value must be visually traceable.

**4-stage journey:**
1. **Source:** Where does the value come from? (cell, table, previous step)
2. **Operation:** Which formula is being applied? (in the working area)
3. **Result:** How was the intermediate value formed?
4. **Target:** Where is the result going? (accumulator, result cell)

### Z12: Granularity management

**REQUIRED:** The user must be able to switch between atomic mode and phase mode.

**Atomic mode:** Each Next = 1 atomic operation
**Phase mode:** Each Next = 1 phase (several atomic steps)

**Example:**
- Atomic: Each multiplication is a separate step (45 steps for a 3×3 matrix)
- Phase: Each cell is a separate step (9 steps for a 3×3 matrix)

### Z13: Parameter reset

**REQUIRED:** When a parameter changes, the simulation is rebuilt FROM SCRATCH, not just 
the result.

**Bad:** When changing K=3 → K=5, only the "Prediction: A" text changes.
**Good:** When changing K=3 → K=5:
1. The simulation returns to Step 0
2. The entire trace is recalculated with the new K value
3. The user watches the new process from the beginning

### Z14: Micro-step definition

**REQUIRED:** The concept of "step" is defined as the smallest meaningful operation.

**Micro-steps:**
- Read a single data point
- Take a single difference
- Perform a single multiplication
- Perform a single addition
- Perform a single comparison
- Make a single selection
- Carry a single result

**Macro-steps (PROHIBITED):**
- Calculate the entire table
- Draw the entire graph
- Show the result

### Z15: Answer to the "why" question

**REQUIRED:** Every operation explains "why it is being done".

**Bad:** "Step 4: 3² = 9"
**Good:** "Step 4: As required by the distance formula, we square the x difference: 3² = 9. 
This value will contribute to the sum inside the square root of the Euclidean distance."

### Z16: Transformation and reference chain

**REQUIRED:** For every value, "what it transforms into" and "where the transformed thing 
is referenced" is shown.

**Chain example:**
```
x = 4 (given)
  ↓
x - 1 = 3 (Step 3: x difference)
  ↓
3² = 9 (Step 4: square)
  ↓
9 + 16 = 25 (Step 7: sum)
  ↓
√25 = 5 (Step 8: distance)
  ↓
Sorting (Step 39)
  ↓
K selection (Step 40)
  ↓
Vote count (Step 42)
  ↓
Class = B (Step 43)
```

At every step there should be information about "this value came from here, it will go there".

---

## PART C: QUALITY CONTROL CHECKLIST

After the simulation is produced, check the following 20 items:

### Content Quality
- [ ] Was every variable introduced in Section 1?
- [ ] Does every output have a subsequent reference?
- [ ] Is every arithmetic done with real numbers?
- [ ] Was every decision shown with candidates?
- [ ] Are winner/loser visually distinguished?

### HTML/App Quality
- [ ] Are the step controls dynamic (not a static slideshow)?
- [ ] Can the user interact with the scene directly (e.g. place points)?
- [ ] Are there explanatory tooltips ("baloncular") updating in real-time?
- [ ] Does it react instantly to parameter changes and recalculate?
- [ ] Is it a real sandbox calculation, not a mockup?
- [ ] Is there no AI slop? (Inter/Roboto, purple gradient, predictable layout)

### Pedagogical Quality
- [ ] Does the user understand the "how"?
- [ ] Is there a "why" explanation?
- [ ] Are decision rationales shown?
- [ ] Is a mental algorithm provided?
- [ ] Are common mistakes listed?

### Technical Quality
- [ ] Is the architecture a dynamic state engine (NOT a static JSON trace)?
- [ ] Are the animations and user interactions meaningful?
- [ ] Is performance good? (60 FPS)
- [ ] Is it responsive?
