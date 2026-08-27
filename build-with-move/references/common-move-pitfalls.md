# Common Move Pitfalls on Sui

## 1. Ability Mismatches

**Wrong:**
```move
public struct MyStruct { value: u64 } // Missing abilities
```

**Correct:**
```move
public struct MyStruct has key, store { value: u64 } // Add required abilities
```

## 2. Capability Leakage

Never return or expose capabilities that should be guarded:

**Wrong:**
```move
public fun get_cap(cap: &AdminCap): &AdminCap { cap }
```

**Correct:**
- Remove the function entirely
- Or make it private/internal

## 3. Off-by-One in Version Increments

```move
// Wrong: Skipping versions
if (version == 0) { config.version = 2; }

// Correct: Incremental
if (version == 0) { config.version = 1; }
else if (version == 1) { config.version = 2; }
```

## 4. Missing `has key` for Objects

Objects stored on-chain must have `key`:

```move
// Wrong - cannot be stored as object
public struct Data { value: u64 }

// Correct
public struct Data has key, store { id: UID, value: u64 }
```

## 5. Forgetting `store` for Transferable Types

```move
// Wrong - cannot be transferred
public struct Ticket has key { id: UID }

// Correct - can be transferred
public struct Ticket has key, store { id: UID }
```

## 6. Shadowing Built-in Types

```move
// Wrong
fun process(ctx: TxContext) { } // Shadows sui::tx_context::TxContext

// Correct - use full path or rename import
fun process(ctx: &mut TxContext) { }
```

## 7. Mutable Reference Mismatch

```move
// Wrong - trying to mutate immutable ref
public fun bad_update(obj: &MyObject, val: u64) {
    obj.value = val; // Error!
}

// Correct
public fun good_update(obj: &mut MyObject, val: u64) {
    obj.value = val;
}
```

## 8. Missing `entry` for PTB Entry Points

```move
// Wrong - callable from Move, not PTB
public fun init_pool(ctx: &mut TxContext) { }

// Correct - callable from PTB
public entry fun init_pool(ctx: &mut TxContext) { }
```

## 9. Floating Dependencies in Move.toml

**Wrong:**
```toml
sui = { git = "...", branch = "main" }
```

**Correct:**
```toml
sui = { git = "...", rev = "0.32.0" }
```

## 10. Unsafe `assert!` for Authorization

```move
// Wrong - can be bypassed
assert!(ctx.sender() == admin, 0);

// Correct - use typed capability
fun admin_action(_: &AdminCap) { }
```

## 11. Double Free / Use After Delete

```move
// Wrong
let obj = MyObject { ... };
transfer::transfer(obj, sender);
let _ = obj; // Error - already transferred!

// Correct - consume the value properly or restructure
```

## 12. Missing Test Scenarios

Every public entry point needs tests:
- Happy path test
- Authorization failure test (for capability-gated functions)

```move
#[test]
fun test_create() {
    let sender = @0x1;
    let mut scenario = test_scenario::begin(sender);
    // test logic
    scenario.end();
}
```