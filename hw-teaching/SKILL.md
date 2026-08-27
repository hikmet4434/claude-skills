---
name: hw-teaching
description: >
  A formal academic teaching style for homework, coursework, and exam prep. Use this skill
  whenever the user asks to explain, teach, cover, or study any academic topic — especially
  for university-level subjects like DBMS, OS, algorithms, physics, math, or engineering
  subjects. Trigger this skill for phrases like "teach me", "explain in detail", "cover the
  syllabus", "study notes", "exam prep", "what is X (in academic context)", or when the user
  shares a syllabus, chapter list, or list of subtopics and asks Claude to teach them. Also
  trigger when the user says things like "go through unit X" or "cover all subtopics".
  This skill produces zero-analogy, definition-first, formally structured, example-heavy
  explanations with solved questions — exactly as requested in HW/study prompts.
---

# HW Teaching Skill

## Purpose

Produce detailed, formally structured academic teaching material based on a syllabus or topic
list. Output is suitable for exam preparation, coursework notes, or deep self-study.

---

## Core Teaching Principles

### 1. Zero Analogies
Never use informal analogies (e.g., "think of a database like a filing cabinet"). All
explanations are built on **definitions, formal properties, and mathematical/structural
descriptions only**. If something must be illustrated, use a concrete technical example
— not a real-world metaphor.

### 2. Definition-First Structure
Every concept begins with a bolded formal **Definition** block. Only then proceed to
sub-properties, types, constraints, or theorems.

```
### Topic Name
**Definition:** [Precise, technical definition]

[Properties / Types / Mathematical formulation]

#### Solved Example: [Title]
**Question:** ...
**Solution:** ...
```

### 3. Maximum Depth — Teach in Detail
- Cover **every subtopic** in the given syllabus unit by unit.
- Do not summarize or compress — expand fully.
- No bullet-only explanations for conceptual content; use structured prose backed by
  mathematical notation where applicable (LaTeX inline `$...$` or block `$$...$$`).

### 4. Solved Examples Required
Every significant concept or sub-section **must** include at least one solved question.
Format:

```
**Q[N]: [Question text]**
**Solution:** [Step-by-step solution with justification]
```

For multi-step solutions (proofs, normalization, query optimization, algorithms), number
each step explicitly.

### 5. No Filler, No Praise, No Repetition
- Do not include opening pleasantries, motivational lines, or "great question!" phrasing.
- Do not re-summarize what was just explained.
- Do not say "In conclusion..." or "As we learned above...".
- Go directly into the content.

---

## Structure Template (per unit or topic block)

```
# Unit N: [Unit Title]

## N.M [Subtopic Title]

**Definition:** ...

[Formal explanation — types, properties, formulas, constraints]

#### Solved Example N.M
**Q1: ...**
*   **Solution:** ...

**Q2: ...**
*   **Solution:** ...

---
```

Repeat for each subtopic in order. Use horizontal rules (`---`) to separate major subsections.

---

## Handling a Syllabus Input

When the user provides a full syllabus (e.g., "Unit 1: 1.1 Data Abstraction, 1.2 DDL/DML,
..."):

1. Parse each unit and subtopic in order.
2. Teach **every listed subtopic** — do not skip or consolidate without explicit user permission.
3. After completing all explicitly listed subtopics, perform a self-audit:
   - Check which closely related standard sub-concepts (e.g., Codd's Rules, Canonical Cover,
     Thomas Write Rule) are implied by the syllabus but not listed.
   - If any are found, teach them in a labelled **Supplemental** section at the end of the
     relevant unit.

Self-audit prompt (internal):
> "Have I covered every subtopic in the syllabus? Are there standard sub-concepts that a
> university exam would require that I have not yet covered?"

---

## Mathematical Notation

Use standard notation consistently:
- Functional dependencies: $X \rightarrow Y$
- Closures: $X^+$
- Relational operators: $\sigma$ (select), $\pi$ (project), $\bowtie$ (join), $\times$ (Cartesian)
- Timestamps: $TS(T_i)$, $R\text{-}timestamp(X)$, $W\text{-}timestamp(X)$
- Normal forms: 1NF, 2NF, 3NF, BCNF, 4NF
- Transaction notation: $T_i$, commit, rollback, serializable schedule

---

## Practical / Lab Questions

If the user provides a list of practicals (SQL exercises, PL/SQL, stored procedures, cursors):
- Provide the **complete SQL/PL/SQL code** for each practical.
- Annotate each code block with inline comments explaining each clause.
- Do not truncate or stub code — write the full working implementation.

---

## Response Length Policy

- There is **no length limit**. Do not truncate responses to stay brief.
- If a unit is long, teach the entire unit fully before stopping.
- If the response must be split (token limits), end clearly with:
  `[Continuing in next response — Unit N, Section N.M]`
  and resume precisely from that point when the user asks to continue.

---

## Example Teaching Block (Reference)

```markdown
## 2.1 Functional Dependencies and Armstrong's Axioms

**Definition:** A Functional Dependency (FD) $X \rightarrow Y$ holds on relation $R$ if, for
all pairs of tuples $t_1, t_2$ in $R$, whenever $t_1[X] = t_2[X]$, it follows that
$t_1[Y] = t_2[Y]$.

**Armstrong's Axioms (Soundness and Completeness Guaranteed):**

1. **Reflexivity:** If $Y \subseteq X$, then $X \rightarrow Y$.
2. **Augmentation:** If $X \rightarrow Y$, then $XZ \rightarrow YZ$ for any attribute set $Z$.
3. **Transitivity:** If $X \rightarrow Y$ and $Y \rightarrow Z$, then $X \rightarrow Z$.

**Derived Rules:**
- **Union:** If $X \rightarrow Y$ and $X \rightarrow Z$, then $X \rightarrow YZ$.
- **Decomposition:** If $X \rightarrow YZ$, then $X \rightarrow Y$ and $X \rightarrow Z$.

#### Solved Example 2.1

**Q1: Given $F = \{A \rightarrow B, B \rightarrow C\}$, prove $A \rightarrow C$ using Armstrong's Axioms.**

**Solution:**
1. $A \rightarrow B$ (Given)
2. $B \rightarrow C$ (Given)
3. $A \rightarrow C$ (By Transitivity on steps 1 and 2) ∎
```

---

## When NOT to Apply This Style

- Casual conversational questions not related to academic study.
- Code debugging or engineering implementation tasks (use standard technical response style).
- Questions that are answered in 1–2 sentences by definition.

Use this style only when the user is studying, preparing for exams, or explicitly requesting
detailed teaching of academic/technical subject matter.
