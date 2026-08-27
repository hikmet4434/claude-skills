# Topic Examples — Full Topic Examples

This file contains full output examples for different topic types. Each example follows the
8-section template from SKILL.md.

---

## Example 1: KNN Classification (Numeric + Decision)

### User Request
"How does KNN classification work? Show with the following data:
Training data: P₁=(1,2)→A, P₂=(3,5)→B, P₃=(5,1)→A, P₄=(6,4)→B, P₅=(2,6)→A
New point: (4,3), K=3"

### Section 0: Summary
KNN (K-Nearest Neighbors) finds the K nearest neighbors to classify a new point
and determines the class by majority vote. Process: calculate distances → sort → select K nearest →
vote → determine class.

### Section 1: What We Have

| Symbol / Name | What It Is | Role | Source |
|---|---|---|---|
| P₁ = (1, 2) | Training point 1 | Class: A | given |
| P₂ = (3, 5) | Training point 2 | Class: B | given |
| P₃ = (5, 1) | Training point 3 | Class: A | given |
| P₄ = (6, 4) | Training point 4 | Class: B | given |
| P₅ = (2, 6) | Training point 5 | Class: A | given |
| P_new = (4, 3) | New point | To be classified | given |
| K = 3 | Number of neighbors | How many neighbors to use | given |
| d(p,q) = √((px-qx)² + (py-qy)²) | Euclidean distance | Proximity measurement | formula |

### Section 2: Goal
Determine the class (A or B) of the new point P_new = (4, 3). The operation is complete when
the majority vote of K=3 neighbors is taken.

### Section 3: Starting Point
The training data table and new point coordinates are shown on stage. First step: calculate
the Euclidean distance between P₁ and P_new.

### Section 4: Operation Flow

**Step 1 — Reading P₁**
- Input: P₁ = (1, 2), given table Row 1
- Operation: Data reading, no formula
- Output: P₁ coordinates loaded into workspace
- ➡️ Next reference: x difference will be calculated in Step 3

**Step 2 — Reading P_new**
- Input: P_new = (4, 3), given table Last row
- Operation: Data reading
- Output: P_new coordinates loaded into workspace
- ➡️ Next reference: difference with P₁ will be taken in Step 3

**Step 3 — Calculating x difference**
- Input: x_new = 4 (Step 2), x₁ = 1 (Step 1)
- Operation: x_new - x₁ = 4 - 1 = 3
- Output: Δx = 3
- ➡️ Next reference: square will be taken in Step 4

**Step 4 — Square of x difference**
- Input: Δx = 3 (Step 3)
- Operation: (Δx)² = 3² = 9
- Output: (Δx)² = 9
- ➡️ Next reference: will be added to y square in Step 7

**Step 5 — Calculating y difference**
- Input: y_new = 3 (Step 2), y₁ = 2 (Step 1)
- Operation: y_new - y₁ = 3 - 2 = 1
- Output: Δy = 1
- ➡️ Next reference: square will be taken in Step 6

**Step 6 — Square of y difference**
- Input: Δy = 1 (Step 5)
- Operation: (Δy)² = 1² = 1
- Output: (Δy)² = 1
- ➡️ Next reference: will be added to x square in Step 7

**Step 7 — Sum of squares**
- Input: (Δx)² = 9 (Step 4), (Δy)² = 1 (Step 6)
- Operation: (Δx)² + (Δy)² = 9 + 1 = 10
- Output: Sum = 10
- ➡️ Next reference: square root will be taken in Step 8

**Step 8 — P₁ distance**
- Input: Sum = 10 (Step 7)
- Operation: √10 ≈ 3.16
- Output: d₁ = 3.16
- ➡️ Next reference: will be used in sorting stage (Step 39)

*(Steps 9-38: Same process repeated for P₂, P₃, P₄, P₅)*

**Step 39 — Sorting distances**
- Input: d₁=3.16, d₂=2.24, d₃=2.24, d₄=2.24, d₅=3.61 (Steps 8,16,24,32,38)
- Operation: Sort ascending
- Output: [2.24, 2.24, 2.24, 3.16, 3.61]
- ➡️ Next reference: first K=3 will be selected in Step 40

**Step 40 — K=3 nearest neighbor selection**
- Input: Sorted distances (Step 39), K=3
- Operation: Select first 3 elements
- Output: P₂(2.24), P₃(2.24), P₄(2.24)
- ➡️ Next reference: classes will be read in Step 41
- **Decision:** Smallest 3 distances selected from 5 candidates

**Step 41 — Reading neighbor classes**
- Input: P₂, P₃, P₄ (Step 40)
- Operation: Read class labels from training data
- Output: P₂→B, P₃→A, P₄→B
- ➡️ Next reference: votes will be counted in Step 42

**Step 42 — Vote counting**
- Input: B, A, B (Step 41)
- Operation: Count class frequencies
- Output: B=2, A=1
- ➡️ Next reference: majority will be determined in Step 43

**Step 43 — Majority decision**
- Input: B=2, A=1 (Step 42)
- Operation: argmax(B:2, A:1)
- Output: **Class = B**
- **Decision:** B (2 votes) > A (1 vote), winner = B
- ➡️ Next reference: Final result

### Section 5: Transformation Map

| Stage | Input (+source) | Operation | Output | Next reference |
|---|---|---|---|---|
| Data reading | P₁...P₅, P_new (given) | — | Coordinates | Distance calculation |
| Distance calculation | Pᵢ, P_new (data reading) | Euclidean formula | d₁...d₅ | Sorting |
| Sorting | d₁...d₅ (distance calculation) | Ascending sort | Sorted list | K selection |
| K selection | Sorted list, K=3 | First K elements | P₂,P₃,P₄ | Vote counting |
| Vote counting | P₂→B, P₃→A, P₄→B | Frequency | B=2, A=1 | Majority |
| Majority | B=2, A=1 | argmax | **B** | Final result |

### Section 6: Simulation
HTML file is generated. On stage:
- Left: Training points table + new point
- Center: Workspace (difference, square, sum, square root)
- Right: Distance list + narration panel
- Bottom: Control buttons

Each "Next" click advances one atomic operation.

### Section 7: Mental Algorithm
1. Read data (training points + new point + K)
2. Calculate distance for each training point (Euclidean)
3. Sort distances ascending
4. Select first K
5. Get class labels of these K neighbors
6. Determine class by majority vote

**Common mistakes:**
- Forgetting to take square root in distance formula
- Misapplying K value (K=3 but selecting 5 neighbors)
- Not specifying tie-break rule for equal distances

### Section 8: Validation
- [x] All variables introduced in Section 1
- [x] Every output has a next reference
- [x] Arithmetic done with real numbers
- [x] Decision steps shown with candidates
- [x] HTML single file, atomic steps

---

## Example 2: Matrix Multiplication (Numeric, Iterative)

### User Request
"Show 3×3 matrix multiplication step by step:
A = [[3,2,1],[0,1,4],[2,0,3]], B = [[1,0,2],[4,3,1],[2,1,0]]"

### Section 0: Summary
Matrix multiplication computes each cell of the result matrix as the dot product of a row from A
and a column from B. For a 3×3 matrix: 9 cells, each cell requires 3 multiplications + 2
additions = 5 atomic operations → total 45 atomic steps.

### Section 4: Operation Flow (detailed for C[1,1])

**Step 1 — Initializing C[1,1]**
- Input: C matrix, cell (1,1)
- Operation: Accumulator = 0
- Output: Accumulator initialized
- ➡️ Next reference: first term will be added in Step 2

**Step 2 — Reading A[1,1]**
- Input: A matrix, Row 1, Column 1
- Operation: A[1,1] = 3
- Output: Operand 1 = 3
- ➡️ Next reference: will be multiplied by B[1,1] in Step 4

**Step 3 — Reading B[1,1]**
- Input: B matrix, Row 1, Column 1
- Operation: B[1,1] = 1
- Output: Operand 2 = 1
- ➡️ Next reference: will be multiplied by A[1,1] in Step 4

**Step 4 — First multiplication**
- Input: A[1,1]=3 (Step 2), B[1,1]=1 (Step 3)
- Operation: 3 × 1 = 3
- Output: Term 1 = 3
- ➡️ Next reference: will be added to accumulator in Step 5

**Step 5 — First addition to accumulator**
- Input: Accumulator=0 (Step 1), Term=3 (Step 4)
- Operation: 0 + 3 = 3
- Output: Accumulator = 3
- ➡️ Next reference: second term will be added in Step 8

**Step 6 — Reading A[1,2]**
- Input: A matrix, Row 1, Column 2
- Operation: A[1,2] = 2
- Output: Operand 1 = 2
- ➡️ Next reference: will be multiplied by B[2,1] in Step 8

**Step 7 — Reading B[2,1]**
- Input: B matrix, Row 2, Column 1
- Operation: B[2,1] = 4
- Output: Operand 2 = 4
- ➡️ Next reference: will be multiplied by A[1,2] in Step 8

**Step 8 — Second multiplication**
- Input: A[1,2]=2 (Step 6), B[2,1]=4 (Step 7)
- Operation: 2 × 4 = 8
- Output: Term 2 = 8
- ➡️ Next reference: will be added to accumulator in Step 9

**Step 9 — Second addition to accumulator**
- Input: Accumulator=3 (Step 5), Term=8 (Step 8)
- Operation: 3 + 8 = 11
- Output: Accumulator = 11
- ➡️ Next reference: third term will be added in Step 12

**Step 10 — Reading A[1,3]**
- Input: A matrix, Row 1, Column 3
- Operation: A[1,3] = 1
- Output: Operand 1 = 1
- ➡️ Next reference: will be multiplied by B[3,1] in Step 12

**Step 11 — Reading B[3,1]**
- Input: B matrix, Row 3, Column 1
- Operation: B[3,1] = 2
- Output: Operand 2 = 2
- ➡️ Next reference: will be multiplied by A[1,3] in Step 12

**Step 12 — Third multiplication**
- Input: A[1,3]=1 (Step 10), B[3,1]=2 (Step 11)
- Operation: 1 × 2 = 2
- Output: Term 3 = 2
- ➡️ Next reference: will be added to accumulator in Step 13

**Step 13 — Third addition to accumulator**
- Input: Accumulator=11 (Step 9), Term=2 (Step 12)
- Operation: 11 + 2 = 13
- Output: Accumulator = 13
- ➡️ Next reference: will be assigned to C[1,1] in Step 14

**Step 14 — C[1,1] assignment**
- Input: Accumulator = 13 (Step 13)
- Operation: C[1,1] = 13
- Output: **C[1,1] = 13**
- ➡️ Next reference: Cell (1,1) of the final result matrix

*(Steps 15-45: Same pattern for C[1,2], C[1,3], C[2,1], ..., C[3,3])*

---

## Example 3: DNS Resolution (Conceptual / Protocol)

### User Request
"Show the DNS resolution process step by step: finding the IP address of example.com"

### Section 0: Summary
DNS (Domain Name System) translates human-readable domain names (example.com) into
machine-readable IP addresses (93.184.216.34). Process: cache check → root server → TLD server
→ authoritative server → IP address.

### Section 1: What We Have

| Symbol / Name | What It Is | Role | Source |
|---|---|---|---|
| example.com | Target domain name | Query to resolve | given |
| Local DNS Cache | Local cache | Check if previously resolved | system |
| Root Server (.) | Root DNS server | TLD referral | infrastructure |
| .com TLD Server | TLD server | Authoritative server referral | infrastructure |
| example.com NS | Authoritative name server | Server holding the IP address | infrastructure |
| A Record | Address record | Domain → IP mapping | formula/rule |

### Section 4: Operation Flow

**Step 1 — Initializing query**
- Input: "example.com" (user request)
- Operation: DNS query packet created (QTYPE=A, QNAME=example.com)
- Output: DNS query packet ready
- ➡️ Next reference: will be searched in cache in Step 2

**Step 2 — Cache check**
- Input: DNS query (Step 1), Local DNS Cache
- Operation: Search for "example.com" in cache → Not found (cache miss)
- Output: Cache miss — query will continue
- ➡️ Next reference: will go to root server in Step 3
- **Decision:** Not in cache → proceed to root server

**Step 3 — Query to root server**
- Input: DNS query (Step 1)
- Operation: Query sent to root server (198.41.0.4)
- Output: Waiting for root server response
- ➡️ Next reference: response will be received in Step 4

**Step 4 — Root server response**
- Input: Root server response
- Operation: Root server returns addresses of ".com" TLD servers
  (192.5.6.30, 192.26.9.34, ...)
- Output: TLD server list received
- ➡️ Next reference: query will be sent to TLD server in Step 5
- **Decision:** Root server does not give IP directly, refers to TLD

**Step 5 — Query to TLD server**
- Input: DNS query + TLD server address (192.5.6.30)
- Operation: "example.com" query sent to .com TLD server
- Output: Waiting for TLD response
- ➡️ Next reference: response will be received in Step 6

**Step 6 — TLD server response**
- Input: TLD server response
- Operation: TLD server returns authoritative NS records for example.com
  (ns1.example.com, ns2.example.com)
- Output: Authoritative NS list received
- ➡️ Next reference: query will be sent to authoritative server in Step 7
- **Decision:** TLD server does not give IP directly, refers to authoritative NS

**Step 7 — Query to authoritative server**
- Input: DNS query + NS address (ns1.example.com → 93.184.216.1)
- Operation: A record query sent to authoritative server
- Output: Waiting for authoritative server response
- ➡️ Next reference: response will be received in Step 8

**Step 8 — Authoritative server response (FINAL)**
- Input: Authoritative server response
- Operation: Returns A record → example.com = 93.184.216.34, TTL=3600
- Output: **IP = 93.184.216.34**
- ➡️ Next reference: will be saved to cache in Step 9

**Step 9 — Saving to cache**
- Input: IP=93.184.216.34, TTL=3600 (Step 8)
- Operation: "example.com → 93.184.216.34" saved to Local DNS Cache
- Output: Cache updated, subsequent queries will get cache hit at Step 2
- ➡️ Next reference: Subsequent DNS queries (performance optimization)

---

## Example 4: Simple Linear Regression (Numeric, Formula-Heavy)

### User Request
"Perform simple linear regression with 5 data points:
(1,2), (2,4), (3,5), (4,4), (5,5). Find the equation y = mx + b."

### Section 4: Operation Flow (summary, first 15 steps)

**Step 1 — Calculating Σx**
- Input: x values = 1, 2, 3, 4, 5
- Operation: 1 + 2 + 3 + 4 + 5 = 15
- Output: Σx = 15
- ➡️ Will be used in x̄ calculation (Step 6)

**Step 2 — Calculating Σy**
- Input: y values = 2, 4, 5, 4, 5
- Operation: 2 + 4 + 5 + 4 + 5 = 20
- Output: Σy = 20
- ➡️ Will be used in ȳ calculation (Step 7)

**Step 3 — Calculating Σxy (term 1)**
- Input: x₁=1, y₁=2
- Operation: 1 × 2 = 2, accumulator = 2
- Output: Term 1 = 2
- ➡️ Term 2 will be added in Step 4

*(... terms 2-5 ...)*

**Step 7 — Σxy complete**
- Input: All terms
- Operation: 2 + 8 + 15 + 16 + 25 = 66
- Output: Σxy = 66
- ➡️ Will be used in m calculation (Step 10)

**Step 8 — Calculating Σx²**
- Input: x values = 1, 2, 3, 4, 5
- Operation: 1² + 2² + 3² + 4² + 5² = 1 + 4 + 9 + 16 + 25 = 55
- Output: Σx² = 55
- ➡️ Will be used in m calculation (Step 10)

**Step 9 — n (number of data points)**
- Input: Data points
- Operation: n = 5
- Output: n = 5
- ➡️ Will be used in m and b formulas

**Step 10 — Slope (m) calculation**
- Input: n=5, Σxy=66, Σx=15, Σy=20, Σx²=55
- Operation: m = (n·Σxy - Σx·Σy) / (n·Σx² - (Σx)²) = (5·66 - 15·20) / (5·55 - 15²) = (330 - 300) / (275 - 225) = 30/50 = 0.6
- Output: **m = 0.6**
- ➡️ Will be used in b calculation (Step 12)

---

## Example 5: QuickSort (Algorithm)

### User Request
"Show the QuickSort algorithm step by step on the array [5, 3, 8, 1, 9, 2]"

### Section 4: Operation Flow (summary)

**Step 1 — Pivot selection**
- Input: Array = [5, 3, 8, 1, 9, 2]
- Operation: Last element selected as pivot → pivot = 2
- Output: pivot = 2
- ➡️ Will be used in partition operation (Steps 2-7)
- **Decision:** Pivot selection strategy: last element

**Step 2 — Partition: 5 vs pivot**
- Input: array[0] = 5, pivot = 2
- Operation: 5 > 2 → greater than pivot, will go to right
- Output: i = -1 (no smaller element found yet)
- ➡️ Next element will be checked in Step 3

**Step 3 — Partition: 3 vs pivot**
- Input: array[1] = 3, pivot = 2
- Operation: 3 > 2 → greater than pivot, will go to right
- Output: i = -1
- ➡️ Next element will be checked in Step 4

**Step 4 — Partition: 8 vs pivot**
- Input: array[2] = 8, pivot = 2
- Operation: 8 > 2 → greater than pivot
- Output: i = -1
- ➡️ Next element in Step 5

**Step 5 — Partition: 1 vs pivot**
- Input: array[3] = 1, pivot = 2
- Operation: 1 ≤ 2 → less than/equal to pivot, increment i and swap
- Output: i = 0, swap(array[0], array[3]) → [1, 3, 8, 5, 9, 2]
- ➡️ Next element in Step 6
- **Decision:** 1 ≤ 2, so placed on left

*(... continued ...)*

---

## Topic Type → Atomic Step Mapping

| Topic Type | What Is an Atomic Step? | Example |
|-----------|---------------------|-------|
| Arithmetic | Single operation (+, -, ×, ÷, ², √) | 3 × 4 = 12 |
| Matrix | Single multiplication + accumulator addition | A[1,2]·B[2,1] = 8, acc += 8 |
| Sorting | Single comparison or swap | 5 > 3, swap |
| Search | Single element check | array[3] == target? |
| Classification | Single distance calculation or vote | d₃ = 2.24, class = B |
| Protocol | Single packet/signal exchange | SYN packet sent |
| Conceptual | Single inference/transformation | "TCP reliable" → "ordered delivery" |
| Statistics | Single formula term calculation | Σxᵢ = 15 |
| Optimization | Single candidate evaluation | f(x₁) = 3.2, f(x₂) = 2.8 |
