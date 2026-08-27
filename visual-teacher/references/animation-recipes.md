# Animation Recipes — GSAP / anime.js / CSS Code Examples

## General Principles

1. **Animation should be meaningful:** Not just decoration, but a tool that explains the operation
2. **Timing should be consistent:** Default ~450ms/step, ~700ms total step duration
3. **Easing should be smooth:** `ease-in-out` or cubic-bezier
4. **Parallel animations:** Independent movements can start simultaneously
5. **Sequential animations:** Dependent movements (source→operation→target) are played in sequence

## 1. Operand Movement — From Source to Working Area

### CSS Transition Method (Basic)

```css
.operand {
  position: absolute;
  transition: all 450ms cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: bold;
  font-size: 1.2rem;
}

.operand.highlight {
  box-shadow: 0 0 12px rgba(255, 165, 0, 0.8);
  transform: scale(1.1);
}

.operand.moving {
  z-index: 100;
  opacity: 0.9;
}
```

```javascript
function moveOperand(sourceEl, targetEl, duration = 450) {
  const sourceRect = sourceEl.getBoundingClientRect();
  const targetRect = targetEl.getBoundingClientRect();

  // Clone the operand for animation
  const clone = sourceEl.cloneNode(true);
  clone.classList.add('moving');
  clone.style.position = 'fixed';
  clone.style.left = sourceRect.left + 'px';
  clone.style.top = sourceRect.top + 'px';
  clone.style.width = sourceRect.width + 'px';
  clone.style.height = sourceRect.height + 'px';
  clone.style.transition = `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
  document.body.appendChild(clone);

  // Highlight source
  sourceEl.classList.add('highlight');

  // Trigger animation
  requestAnimationFrame(() => {
    clone.style.left = targetRect.left + 'px';
    clone.style.top = targetRect.top + 'px';
    clone.style.width = targetRect.width + 'px';
    clone.style.height = targetRect.height + 'px';
  });

  return new Promise(resolve => {
    setTimeout(() => {
      clone.remove();
      sourceEl.classList.remove('highlight');
      resolve();
    }, duration);
  });
}
```

### GSAP Method (Advanced)

```javascript
// CDN: <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>

function moveWithGSAP(sourceEl, targetEl, options = {}) {
  const { duration = 0.45, easing = "power2.inOut", color = "#ff8c00" } = options;

  const sourceRect = sourceEl.getBoundingClientRect();
  const targetRect = targetEl.getBoundingClientRect();

  const clone = sourceEl.cloneNode(true);
  clone.style.position = 'fixed';
  clone.style.left = sourceRect.left + 'px';
  clone.style.top = sourceRect.top + 'px';
  clone.style.pointerEvents = 'none';
  document.body.appendChild(clone);

  // Timeline: highlight → move → land
  const tl = gsap.timeline();

  tl.to(sourceEl, {
    boxShadow: `0 0 16px ${color}`,
    scale: 1.1,
    duration: 0.15
  })
  .to(clone, {
    left: targetRect.left,
    top: targetRect.top,
    duration: duration,
    ease: easing
  }, "-=0.1")
  .to(sourceEl, {
    boxShadow: "none",
    scale: 1,
    duration: 0.15
  })
  .fromTo(targetEl,
    { backgroundColor: color + "33" },
    { backgroundColor: "transparent", duration: 0.3 },
    "-=0.15"
  );

  tl.call(() => clone.remove());

  return tl;
}
```

## 2. Accumulator — Term-by-Term Accumulation

### Visual Flow
```
┌─────────────────────────────────────┐
│  Accumulator                        │
│  ┌─────────────────────────────┐    │
│  │  0                          │    │ ← Start
│  │  0 + 3·1 = 3               │    │ ← Term 1
│  │  3 + (−2)·0 = 3            │    │ ← Term 2
│  │  3 + 1·4 = 7               │    │ ← Term 3
│  │  ──────────────────         │    │
│  │  Result: 7                  │    │ ← Final
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
```

### HTML Structure

```html
<div id="accumulator" class="accumulator">
  <div class="acc-header">Accumulator</div>
  <div class="acc-terms">
    <div class="acc-term initial">0</div>
    <!-- New terms will be added here -->
  </div>
  <div class="acc-divider"></div>
  <div class="acc-result">
    <span class="acc-label">Result:</span>
    <span class="acc-value" id="acc-total">0</span>
  </div>
</div>
```

### CSS

```css
.accumulator {
  background: #1a1a2e;
  border: 2px solid #16213e;
  border-radius: 12px;
  padding: 16px;
  min-width: 280px;
  font-family: 'JetBrains Mono', monospace;
}

.acc-header {
  font-size: 0.85rem;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 12px;
}

.acc-terms {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.acc-term {
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 1rem;
  color: #e0e0e0;
  opacity: 0;
  transform: translateX(-20px);
  transition: all 350ms ease-out;
}

.acc-term.visible {
  opacity: 1;
  transform: translateX(0);
}

.acc-term.initial {
  color: #888;
  opacity: 1;
  transform: none;
}

.acc-term.latest {
  background: rgba(255, 165, 0, 0.15);
  color: #ffa500;
  font-weight: bold;
}

.acc-divider {
  height: 1px;
  background: #333;
  margin: 8px 0;
}

.acc-result {
  display: flex;
  justify-content: space-between;
  font-size: 1.1rem;
  font-weight: bold;
  color: #4ecdc4;
}
```

### JavaScript

```javascript
class Accumulator {
  constructor(elementId) {
    this.el = document.getElementById(elementId);
    this.termsEl = this.el.querySelector('.acc-terms');
    this.totalEl = this.el.querySelector('.acc-value');
    this.terms = [];
    this.total = 0;
  }

  addTerm(label, value, arithmetic) {
    const termEl = document.createElement('div');
    termEl.className = 'acc-term';
    termEl.textContent = arithmetic; // e.g.: "3 + (−2)·0 = 3"

    // Remove "latest" from previous term
    const prevLatest = this.termsEl.querySelector('.latest');
    if (prevLatest) prevLatest.classList.remove('latest');

    this.termsEl.appendChild(termEl);
    this.terms.push({ label, value });
    this.total += value;

    // Animate in
    requestAnimationFrame(() => {
      termEl.classList.add('visible', 'latest');
    });

    // Update total with animation
    this.animateTotal(this.total);

    return termEl;
  }

  animateTotal(newTotal) {
    const current = parseFloat(this.totalEl.textContent) || 0;
    const duration = 300;
    const startTime = performance.now();

    const step = (time) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const display = current + (newTotal - current) * eased;
      this.totalEl.textContent = Number.isInteger(newTotal)
        ? Math.round(display)
        : display.toFixed(2);

      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }

  reset() {
    this.termsEl.innerHTML = '<div class="acc-term initial">0</div>';
    this.totalEl.textContent = '0';
    this.terms = [];
    this.total = 0;
  }
}
```

## 3. Decision Moment — Candidate Comparison and Winner Selection

### Visual Flow
```
┌──────────────────────────────────────────────┐
│  DECISION: K=3 nearest neighbor selection    │
│                                              │
│  Candidate Distances:                        │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐         │
│  │ P₁ │ │ P₂ │ │ P₃ │ │ P₄ │ │ P₅ │         │
│  │5.0 │ │1.4 │ │2.2 │ │3.2 │ │7.1 │         │
│  │ A  │ │ B  │ │ B  │ │ A  │ │ B  │         │
│  └────┘ └────┘ └────┘ └────┘ └────┘         │
│     ↓       ↓       ↓                        │
│  ┌────┐ ┌────┐ ┌────┐                        │
│  │ P₂ │ │ P₃ │ │ P₄ │  ← Selected 3         │
│  │1.4 │ │2.2 │ │3.2 │                        │
│  │ B  │ │ B  │ │ A  │                        │
│  └────┘ └────┘ └────┘                        │
│                                              │
│  Vote: B=2, A=1                              │
│  Winner: B (majority)                        │
└──────────────────────────────────────────────┘
```

### HTML Structure

```html
<div id="decision-scene" class="decision-scene">
  <div class="decision-title">⚖️ DECISION: K=3 nearest neighbor selection</div>

  <div class="candidates" id="candidates">
    <div class="candidate" data-index="0" data-value="5.0" data-class="A">
      <div class="candidate-name">P₁</div>
      <div class="candidate-value">5.0</div>
      <div class="candidate-class class-A">A</div>
    </div>
    <div class="candidate" data-index="1" data-value="1.4" data-class="B">
      <div class="candidate-name">P₂</div>
      <div class="candidate-value">1.4</div>
      <div class="candidate-class class-B">B</div>
    </div>
    <!-- ... other candidates ... -->
  </div>

  <div class="decision-rule" id="decision-rule" style="display:none">
    Rule: Select the smallest K=3 distances
  </div>

  <div class="selected-group" id="selected-group" style="display:none">
    <!-- Selected candidates will be moved here -->
  </div>

  <div class="vote-count" id="vote-count" style="display:none">
    <!-- Vote count will be shown here -->
  </div>

  <div class="decision-result" id="decision-result" style="display:none">
    <!-- Final decision here -->
  </div>
</div>
```

### CSS

```css
.decision-scene {
  padding: 20px;
  background: #0f0f1a;
  border-radius: 16px;
  border: 1px solid #2a2a4a;
}

.decision-title {
  font-size: 1.1rem;
  font-weight: bold;
  color: #ffd700;
  margin-bottom: 16px;
  text-align: center;
}

.candidates {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.candidate {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 16px;
  border-radius: 12px;
  border: 2px solid #333;
  background: #1a1a2e;
  transition: all 400ms ease;
  min-width: 70px;
}

.candidate.winner {
  border-color: #4ecdc4;
  box-shadow: 0 0 20px rgba(78, 205, 196, 0.4);
  transform: scale(1.1);
}

.candidate.loser {
  opacity: 0.3;
  transform: scale(0.9);
  filter: grayscale(0.8);
}

.candidate-name {
  font-size: 0.85rem;
  color: #888;
  margin-bottom: 4px;
}

.candidate-value {
  font-size: 1.2rem;
  font-weight: bold;
  color: #e0e0e0;
  margin-bottom: 4px;
  font-family: 'JetBrains Mono', monospace;
}

.candidate-class {
  font-size: 0.8rem;
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: bold;
}

.class-A { background: #ff6b6b33; color: #ff6b6b; }
.class-B { background: #4ecdc433; color: #4ecdc4; }

.decision-rule {
  text-align: center;
  color: #aaa;
  font-style: italic;
  margin: 12px 0;
  padding: 8px;
  background: #1a1a2e;
  border-radius: 8px;
}

.decision-result {
  text-align: center;
  padding: 16px;
  background: linear-gradient(135deg, #4ecdc422, #4ecdc411);
  border: 2px solid #4ecdc4;
  border-radius: 12px;
  margin-top: 16px;
}

.decision-result .result-value {
  font-size: 2rem;
  font-weight: bold;
  color: #4ecdc4;
}

.decision-result .result-reason {
  font-size: 0.9rem;
  color: #aaa;
  margin-top: 4px;
}
```

### JavaScript (with GSAP)

```javascript
async function animateDecision(traceStep) {
  const { candidates, rule, comparison, winner, losers, decisionResult } = traceStep.decision;
  const candidateEls = document.querySelectorAll('.candidate');

  // Phase 1: Show all candidates (already visible)
  await sleep(300);

  // Phase 2: Show the rule
  const ruleEl = document.getElementById('decision-rule');
  ruleEl.textContent = `Rule: ${rule}`;
  ruleEl.style.display = 'block';
  gsap.fromTo(ruleEl, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.3 });
  await sleep(500);

  // Phase 3: Mark winners and losers
  const tl = gsap.timeline();

  // Winners: glow and scale up
  winner.indices.forEach(idx => {
    const el = candidateEls[idx];
    tl.to(el, {
      borderColor: '#4ecdc4',
      boxShadow: '0 0 20px rgba(78, 205, 196, 0.4)',
      scale: 1.1,
      duration: 0.3
    }, 0); // all at the same time
  });

  // Losers: fade and shrink
  losers.indices.forEach(idx => {
    const el = candidateEls[idx];
    tl.to(el, {
      opacity: 0.3,
      scale: 0.9,
      filter: 'grayscale(0.8)',
      duration: 0.3
    }, 0);
  });

  await tl;
  await sleep(500);

  // Phase 4: Show vote count (if applicable)
  if (decisionResult) {
    const resultEl = document.getElementById('decision-result');
    resultEl.innerHTML = `
      <div class="result-value">${decisionResult.value}</div>
      <div class="result-reason">${decisionResult.reason}</div>
    `;
    resultEl.style.display = 'block';
    gsap.fromTo(resultEl,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)" }
    );
  }
}
```

## 4. Cell Filling — Matrix Multiplication Example

### Visual Flow
```
Matrix A          Matrix B          Matrix C (Result)
┌─────────┐       ┌─────────┐       ┌─────────┐
│ 3  2  1 │       │ 1  0  2 │       │ ?  ?  ? │
│ 0  1  4 │       │ 4  3  1 │       │ ?  ?  ? │
│ 2  0  3 │       │ 2  1  0 │       │ ?  ?  ? │
└─────────┘       └─────────┘       └─────────┘

Computing C[1,1]:
A[1,1]→3  ×  B[1,1]→1  =  3     (accumulator: 3)
A[1,2]→2  ×  B[2,1]→4  =  8     (accumulator: 3+8=11)
A[1,3]→1  ×  B[3,1]→2  =  2     (accumulator: 11+2=13)
                                    C[1,1] = 13
```

### JavaScript — Cell Computation Animation

```javascript
async function computeCell(row, col, matrixA, matrixB, resultMatrix) {
  const cellId = `C-${row}-${col}`;
  const cellEl = document.getElementById(cellId);
  const accumulator = new Accumulator('accumulator');
  accumulator.reset();

  const n = matrixA[0].length; // inner dimension
  let sum = 0;

  for (let k = 0; k < n; k++) {
    const aVal = matrixA[row][k];
    const bVal = matrixB[k][col];
    const product = aVal * bVal;
    sum += product;

    // Highlight source cells
    highlightCell(`A-${row}-${k}`, '#ff8c00');
    highlightCell(`B-${k}-${col}`, '#ff8c00');

    // Move operands to working area
    await moveOperand(
      document.getElementById(`A-${row}-${k}`),
      document.getElementById('wa-operand-1'),
      350
    );
    await moveOperand(
      document.getElementById(`B-${k}-${col}`),
      document.getElementById('wa-operand-2'),
      350
    );

    // Show multiplication in working area
    showFormula(`${aVal} × ${bVal} = ${product}`);
    await sleep(300);

    // Add to accumulator
    accumulator.addTerm(
      `A[${row+1},${k+1}]·B[${k+1},${col+1}]`,
      product,
      `${sum - product} + ${product} = ${sum}`
    );
    await sleep(300);

    // Remove highlights
    unhighlightCell(`A-${row}-${k}`);
    unhighlightCell(`B-${k}-${col}`);
  }

  // Place result in target cell
  cellEl.textContent = sum;
  cellEl.classList.add('computed');
  gsap.fromTo(cellEl,
    { backgroundColor: '#4ecdc433' },
    { backgroundColor: 'transparent', duration: 0.5 }
  );
}
```

## 5. Synchronized Narration Panel

### HTML Structure

```html
<div id="narration-panel" class="narration-panel">
  <div class="narration-header">
    <span class="narration-step" id="narration-step">Step 1 / 47</span>
    <span class="narration-stage" id="narration-stage">Distance Calculation</span>
  </div>
  <div class="narration-content" id="narration-content">
    <!-- Step content will appear here -->
  </div>
  <div class="narration-log" id="narration-log">
    <!-- Previous steps listed here (scrollable) -->
  </div>
</div>
```

### CSS

```css
.narration-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #111;
  border-radius: 12px;
  border: 1px solid #222;
  overflow: hidden;
}

.narration-header {
  display: flex;
  justify-content: space-between;
  padding: 10px 16px;
  background: #1a1a2e;
  border-bottom: 1px solid #222;
  font-size: 0.85rem;
}

.narration-step {
  color: #4ecdc4;
  font-weight: bold;
  font-family: 'JetBrains Mono', monospace;
}

.narration-stage {
  color: #888;
}

.narration-content {
  padding: 16px;
  flex-shrink: 0;
}

.narration-content .title {
  font-size: 1.1rem;
  font-weight: bold;
  color: #e0e0e0;
  margin-bottom: 8px;
}

.narration-content .detail {
  font-size: 0.95rem;
  color: #aaa;
  line-height: 1.5;
  margin-bottom: 8px;
}

.narration-content .source {
  font-size: 0.85rem;
  color: #666;
  font-style: italic;
}

.narration-content .next-ref {
  font-size: 0.85rem;
  color: #ffa500;
  margin-top: 4px;
}

.narration-content .decision-badge {
  display: inline-block;
  background: #ffd70022;
  color: #ffd700;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
  margin-top: 8px;
}

.narration-log {
  flex: 1;
  overflow-y: auto;
  padding: 8px 16px;
  border-top: 1px solid #222;
}

.narration-log .log-entry {
  padding: 4px 0;
  font-size: 0.8rem;
  color: #555;
  border-bottom: 1px solid #1a1a1a;
}

.narration-log .log-entry.current {
  color: #4ecdc4;
  font-weight: bold;
}
```

### JavaScript — Panel Update

```javascript
function updateNarration(traceStep, stepIndex, totalSteps) {
  const stepEl = document.getElementById('narration-step');
  const stageEl = document.getElementById('narration-stage');
  const contentEl = document.getElementById('narration-content');
  const logEl = document.getElementById('narration-log');

  // Update header
  stepEl.textContent = `Step ${stepIndex + 1} / ${totalSteps}`;
  stageEl.textContent = traceStep.stage || '—';

  // Build content
  const { short, detail, inputSource, nextReference } = traceStep.explanation;
  let html = `
    <div class="title">${short}</div>
    <div class="detail">${detail}</div>
    <div class="source">📥 Source: ${inputSource}</div>
    <div class="next-ref">➡️ ${nextReference}</div>
  `;

  // Add decision badge if applicable
  if (traceStep.type === 'decision') {
    html += `<div class="decision-badge">⚖️ DECISION STEP</div>`;
  }

  contentEl.innerHTML = html;

  // Add to log
  const logEntry = document.createElement('div');
  logEntry.className = 'log-entry';
  logEntry.textContent = `${stepIndex + 1}. ${short} → ${traceStep.result?.label || traceStep.operation?.arithmetic || ''}`;

  // Remove "current" from previous
  const prevCurrent = logEl.querySelector('.current');
  if (prevCurrent) prevCurrent.classList.remove('current');

  logEl.appendChild(logEntry);
  logEntry.classList.add('current');
  logEntry.scrollIntoView({ behavior: 'smooth', block: 'end' });
}
```

## 6. Trace Player — Step-by-Step Player

```javascript
class TracePlayer {
  constructor(trace, scene) {
    this.trace = trace;
    this.scene = scene;
    this.currentStep = -1;
    this.isPlaying = false;
    this.speed = 1.0; // 0.5 = slow, 1.0 = normal, 2.0 = fast
    this.granularity = 'atomic'; // 'atomic' or 'stage'
    this.playInterval = null;
  }

  get baseDelay() {
    return 700 / this.speed;
  }

  async stepForward() {
    if (this.currentStep >= this.trace.length - 1) return false;

    this.currentStep++;
    const step = this.trace[this.currentStep];

    // In stage mode, skip all steps belonging to the same stage
    if (this.granularity === 'stage' && step.stage) {
      const currentStage = step.stage;
      while (
        this.currentStep < this.trace.length - 1 &&
        this.trace[this.currentStep + 1].stage === currentStage
      ) {
        this.currentStep++;
      }
    }

    await this.executeStep(this.trace[this.currentStep]);
    return true;
  }

  stepBackward() {
    if (this.currentStep < 0) return;
    this.currentStep--;
    this.scene.resetToStep(this.currentStep);
  }

  async play() {
    this.isPlaying = true;
    while (this.isPlaying && this.currentStep < this.trace.length - 1) {
      await this.stepForward();
      await sleep(this.baseDelay);
    }
    this.isPlaying = false;
  }

  pause() {
    this.isPlaying = false;
  }

  reset() {
    this.pause();
    this.currentStep = -1;
    this.scene.resetAll();
  }

  setSpeed(speed) {
    this.speed = speed;
  }

  setGranularity(mode) {
    this.granularity = mode;
  }

  async executeStep(step) {
    // Update narration
    updateNarration(step, this.currentStep, this.trace.length);

    // Execute based on type
    switch (step.type) {
      case 'read':
      case 'move':
        await this.scene.animateMove(step);
        break;
      case 'multiply':
      case 'add':
      case 'subtract':
      case 'square':
      case 'sqrt':
        await this.scene.animateCompute(step);
        break;
      case 'compare':
        await this.scene.animateCompare(step);
        break;
      case 'decision':
        await this.scene.animateDecision(step);
        break;
      case 'assign':
        await this.scene.animateAssign(step);
        break;
      case 'concept-step':
        await this.scene.animateConcept(step);
        break;
      case 'loop-return':
        this.scene.animateLoopReturn(step);
        break;
    }
  }
}

// Utility
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
```

## 7. Control Buttons

```html
<div class="controls" id="controls">
  <button id="btn-prev" title="Previous step">◄ Previous</button>
  <button id="btn-next" title="Next step">Next ►</button>
  <button id="btn-play" title="Play/Pause">▶ Play</button>
  <select id="speed-select" title="Speed setting">
    <option value="0.5">🐢 Slow</option>
    <option value="1.0" selected>⚡ Normal</option>
    <option value="2.0">🚀 Fast</option>
  </select>
  <select id="granularity-select" title="Granularity">
    <option value="atomic" selected>🔬 Atomic Step</option>
    <option value="stage">📦 Stage</option>
  </select>
  <button id="btn-reset" title="Reset">↺ Reset</button>
</div>
```

```javascript
function setupControls(player) {
  document.getElementById('btn-prev').addEventListener('click', () => player.stepBackward());
  document.getElementById('btn-next').addEventListener('click', () => player.stepForward());

  const playBtn = document.getElementById('btn-play');
  playBtn.addEventListener('click', () => {
    if (player.isPlaying) {
      player.pause();
      playBtn.textContent = '▶ Play';
    } else {
      player.play();
      playBtn.textContent = '⏸ Pause';
    }
  });

  document.getElementById('speed-select').addEventListener('change', (e) => {
    player.setSpeed(parseFloat(e.target.value));
  });

  document.getElementById('granularity-select').addEventListener('change', (e) => {
    player.setGranularity(e.target.value);
  });

  document.getElementById('btn-reset').addEventListener('click', () => {
    player.reset();
    playBtn.textContent = '▶ Play';
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') player.stepForward();
    if (e.key === 'ArrowLeft') player.stepBackward();
    if (e.key === ' ') { e.preventDefault(); playBtn.click(); }
    if (e.key === 'r' || e.key === 'R') player.reset();
  });
}
```
