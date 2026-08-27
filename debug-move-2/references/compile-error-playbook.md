# Compile Error Playbook

## Error Code Reference

### E1001: Type Mismatch

**Error**: `error[E1001]: ... type mismatch ...`

**Common causes**:
- Passing wrong type to function parameter
- Mixing `&mut` and `&` references
- Struct field accessed with wrong type

**Diagnosis**:
```bash
# Run to see full context
sui move build 2>&1 | grep -A5 "E1001"
```

**Example fix**:
```move
// WRONG: passing owned to mutable reference
public entry fun bad(obj: MyObject, ctx: &mut TxContext) {
    mutate(&mut obj); // Error: obj is owned, not mutable reference
}

// CORRECT: use reference or consume
public entry fun good(obj: &mut MyObject, ctx: &mut TxContext) {
    mutate(obj); // OK: passing mutable reference
}
```

---

### E2001: Ability Mismatch

**Error**: `error[E2001]: ... does not have the ability ...`

**Common causes**:
- Struct missing `key` for object storage
- Struct missing `store` for transfer
- Missing `drop` when struct is dropped

**Diagnosis**:
```move
// Check struct definition
public struct MyData { value: u64 } // Missing abilities

// Compare with usage
public entry fun store_it(data: MyData, ctx: &mut TxContext) {
    let obj = Object { id: object::new(ctx), data };
    // Error: MyData doesn't have key or store
}
```

**Fix patterns**:

| Missing | Solution |
|---------|----------|
| `key` | Add `key` for top-level objects |
| `store` | Add `store` if object can be transferred/nested |
| `drop` | Add `drop` if struct should be dropped, or handle explicitly |
| `copy` | Add `copy` if duplication is intentional, or pass by reference |

```move
// Fixed
public struct MyData has store { value: u64 }
```

---

### E3001: Visibility Error

**Error**: `error[E3001]: ... is a private function ...`

**Common causes**:
- Calling a `fun` (private) from outside the module
- Forgetting `public` or `public entry`

**Fix**:
```move
// Private function - only callable within module
fun internal_helper(arg: u64): u64 { arg * 2 }

// Public entry point - callable from outside
public entry fun public_function(arg: u64) {
    let _ = internal_helper(arg); // OK: within module
}
```

---

### E4001: Missing Function

**Error**: `error[E4001]: ... cannot be called ...`

**Common causes**:
- Function name typo
- Wrong module
- Import not added

**Check**:
```bash
# List available functions in module
grep "public" sources/my_module.move
```

---

### E5001: Resource Not in Scope

**Error**: `error[E5001]: ... not in scope ...`

**Common causes**:
- Object already consumed or transferred
- Double-use of resource

**Example**:
```move
public entry fun transfer_and_use(obj: MyObject, recipient: address, ctx: &mut TxContext) {
    transfer::transfer(obj, recipient);
    use_object(&obj); // Error: obj already transferred
}
```

**Fix**: Reorder operations or clone if needed (but consider design).

---

### E6001: Arithmetic Error

**Error**: `... arithmetic overflow ...` or `error[E6001]`

**Fix**:
```move
use sui::math;

// Use checked arithmetic
let sum = math::add(a, b)?;     // Returns Option
let diff = math::sub(a, b)?;    // Returns Option
let prod = math::mul(a, b)?;    // Returns Option
```

---

### E7001: Generic Constraint Not Satisfied

**Error**: `error[E7001]: ... does not satisfy the required ability constraints`

**Common causes**:
- Type parameter needs specific ability but doesn't have it

**Fix**:
```move
// WRONG
public fun process<T>(value: T): T { value }

// CORRECT: constrain the type
public fun process<T: drop + copy>(value: T): T { value }
```

---

## Quick Diagnostic Commands

```bash
# Full build output
sui move build 2>&1 | tee build.log

# Filter errors only
sui move build 2>&1 | grep "^error"

# Specific error code
sui move build 2>&1 | grep "E2001"

# Build with verbose
sui move build --verbose 2
```

---

## Common Root Causes

1. **Stale build artifacts**: `sui move clean && sui move build`
2. **Missing imports**: Check all `use` statements
3. **Wrong Sui framework version**: Verify `Move.toml` rev
4. **Ability drift after refactor**: Re-check struct abilities after changes