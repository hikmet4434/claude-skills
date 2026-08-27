# Abort Tracing Guide

## Reading Abort Codes

When a transaction aborts, you get an `abort_code`:

```
┌─────────────────┐
│  MoveAbort       │
│  location: ...   │
│  abort_code: 42  │
│  type: ...       │
└─────────────────┘
```

The `abort_code` is an integer. To find the source:

### Step 1: Find Named Constants

```bash
# Search for error constants in your code
grep -n "const\|E_" sources/*.move
```

Look for patterns like:
```move
const E_NOT_AUTHORIZED: u64 = 1;
const E_ALREADY_INITIALIZED: u64 = 2;
const E_INVALID_AMOUNT: u64 = 42;
```

### Step 2: Find Assert Statements

```bash
# Search for assert! with this code
grep -n "abort 42\|assert!.*42" sources/*.move
```

```move
// Direct abort
if (!authorized) {
    abort 42
}

// Assert with code
assert!(amount > 0, 42);
```

---

## Tracing Testnet Aborts

### Step 1: Get Transaction Digest

From the error or user report, get the transaction digest.

### Step 2: Query the Transaction

```bash
sui client tx-block <digest>
```

This shows:
- Which function was called
- The module and package
- Input arguments
- The abort location and code

### Step 3: Map to Source Code

```bash
# Get package source (if available)
sui client object <package-id>

# Check Move.toml for source path
```

### Step 4: Add Debug Logging

```move
// Temporarily add logging
use sui::tx_context;

public entry fun my_function(arg: u64, ctx: &mut TxContext) {
    sui::debug::print(&ctx.sender());
    sui::debug::print(&arg);
    // ... rest of logic
}
```

---

## Common Abort Codes

### Authorization Aborts

| Code | Meaning | Fix |
|------|---------|-----|
| 0 | Generic failure | Check assert condition |
| 1 | Not authorized | Add or pass correct capability |
| 2 | Not owner | Object owned by different address |
| 3 | Wrong sender | Check `tx_context::sender(ctx)` |

### State Abort Codes

| Code | Meaning | Fix |
|------|---------|-----|
| 10 | Already initialized | Check if init was called |
| 11 | Not initialized | Call init first |
| 12 | Invalid state transition | Fix state machine logic |
| 20 | Already exists | Don't create duplicate |
| 21 | Does not exist | Create or use correct ID |

### Value Abort Codes

| Code | Meaning | Fix |
|------|---------|-----|
| 100 | Amount too small | Check minimum amounts |
| 101 | Amount too large | Check maximums / balance |
| 102 | Insufficient balance | Add funds or reduce amount |
| 103 | Arithmetic overflow | Use checked math |

---

## Test Scenario Tracing

### With `test_scenario`

```move
#[test]
fun test_abort_scenario() {
    let sender = @0x1;
    let mut scenario = test_scenario::begin(sender);

    // Setup
    scenario.next_tx(sender);
    // ... create objects

    // Trigger abort
    scenario.next_tx(sender);
    // ... call function that should abort

    // Verify abort
    scenario.end();
}
```

### Check Abort Code

```move
#[test]
fun test_specific_abort() {
    let sender = @0x1;
    let mut scenario = test_scenario::begin(sender);

    scenario.next_tx(sender);
    let err = scenario.execute(|| {
        my_function(0) // Should abort with code 100
    });

    assert!(err == 100, 0);
}
```

---

## Debugging Checklist

- [ ] Run `sui move build` - does it compile?
- [ ] Run `sui move test` - does test abort with same code?
- [ ] Is the abort code defined in your module?
- [ ] Is the condition triggering the abort expected?
- [ ] Are arguments passed correctly?
- [ ] Is capability passed (by reference vs by value)?

---

## Safe vs Unsafe Patterns

### Unsafe: Swallowing Abort

```move
// BAD: Silences the abort
public fun maybe_process(obj: &mut MyObject, ctx: &mut TxContext) {
    let _ = try_process(obj, ctx); // Ignores result
}
```

### Safe: Handle Explicitly

```move
// GOOD: Explicitly handles abort
public entry fun safe_process(obj: &mut MyObject, ctx: &mut TxContext) {
    if (!can_process(obj)) {
        abort 1
    };
    process(obj, ctx);
}
```