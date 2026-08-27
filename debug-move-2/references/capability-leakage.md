# Capability Leakage Patterns

## What is Capability Leakage?

A capability leak occurs when a capability that should gate access is exposed through:
1. Public getter functions
2. Return values from functions
3. Ability to extract from public structs
4. Incorrect ability assignments

## Anti-Patterns

### 1. Public Capability Getter

**BAD**:
```move
public struct Config has key, store {
    id: UID,
    admin: AdminCap,
}

// This is a leak!
public fun get_admin(config: &Config): &AdminCap {
    &config.admin  // Leaks admin capability!
}
```

**GOOD**:
```move
public struct Config has key {
    id: UID,
    admin_only: address,  // Just store the admin address, not the cap
}

// Check authorization inline
public entry fun admin_action(config: &mut Config, _cap: &AdminCap, new_value: u64) {
    // Admin cap is required by function signature, not extracted
    config.value = new_value;
}
```

---

### 2. Returning Capability

**BAD**:
```move
public fun create_and_return(cap: TreasuryCap, ctx: &mut TxContext): TreasuryCap {
    // ... some logic ...
    cap  // Returns the cap - could be called anywhere
}
```

**GOOD**:
```move
public entry fun create_and_hold(ctx: &mut TxContext) {
    let cap = TreasuryCap { id: object::new(ctx) };
    transfer::transfer(cap, tx_context::sender(ctx)); // Immediately to holder
}
```

---

### 3. Nested Capability with Store

**BAD**:
```move
public struct Wrapper has key, store {
    id: UID,
    cap: AdminCap,  // Nested capability!
}

// Anyone who receives Wrapper can extract AdminCap
public fun extract(w: Wrapper): AdminCap {
    w.cap  // Leak!
}
```

**GOOD**:
```move
// Either don't use store on wrapper
public struct Wrapper has key {
    id: UID,
    cap_id: ID,  // Store ID instead
}

// Or make capability non-extractable
public struct SecureWrapper has key {
    id: UID,
    cap: AdminCap,  // No store ability
}
```

---

### 4. Capability in Vector/Map with Public Access

**BAD**:
```move
public struct Registry has key {
    id: UID,
    caps: vector<AdminCap>,  // Vector of caps!
}

public fun get_cap(registry: &Registry, idx: u64): &AdminCap {
    vector::borrow(&registry.caps, idx)  // Leak!
}
```

**GOOD**:
```move
public struct Registry has key {
    id: UID,
    authorized: vector<address>,  // Store addresses, not caps
}

public fun is_authorized(registry: &Registry, addr: address): bool {
    vector::contains(&registry.authorized, &addr)
}
```

---

## Capability Patterns - Secure

### Pattern 1: By-Reference Gating

```move
public entry fun admin_only(_cap: &AdminCap, obj: &mut MyObject, new_value: u64) {
    obj.value = new_value;
}

// Caller must have AdminCap
```

### Pattern 2: Capability as Witness

```move
public struct WITNESS has drop {}

// Generic function that only types implementing drop can call
public fun witness_action<T: drop>(_: &T, obj: &mut MyObject) {
    // ...
}
```

### Pattern 3: Capability ID Pattern

```move
public struct SecureData has key {
    id: UID,
    admin_id: ID,  // ID of AdminCap, not the cap itself
}

public entry fun admin_update(_: &AdminCap, data: &mut SecureData, ctx: &mut TxContext) {
    // Verify cap ID matches stored admin
    assert!(object::borrow_id(_) == data.admin_id, 1);
    // ...
}
```

---

## Diagnosis Checklist

Run through these when debugging capability issues:

- [ ] Does any public function return a capability type?
- [ ] Does any struct with `store` contain a capability field?
- [ ] Is there a getter function for capability fields?
- [ ] Can capabilities be extracted from public structs?
- [ ] Are vector/map access functions public for capability collections?

---

## Testing for Leakage

### Test: Capability Cannot Be Extracted

```move
#[test]
fun test_admin_not_extractable() {
    let sender = @0x1;
    let mut scenario = test_scenario::begin(sender);

    scenario.next_tx(sender);
    // Create secure data
    let data = SecureData { id: object::new(ctx), admin_id: id };

    // Try to get admin cap - should not compile or be accessible
    // If it compiles, the leak exists
}
```

### Test: Unauthorized Call Fails

```move
#[test]
#[expected_failure(abort_code = 1)]  // Expect authorization failure
fun test_unauthorized_call() {
    let alice = @0x1;
    let bob = @0x2;
    let mut scenario = test_scenario::begin(alice);

    scenario.next_tx(alice);
    // Alice creates object with AdminCap

    scenario.next_tx(bob);
    // Bob tries to call admin function - should fail with code 1
    admin_only_function(object_ref, ctx);
}
```

---

## Common Fix Patterns

| Problem | Fix |
|---------|-----|
| Public cap getter | Remove getter, gate function instead |
| Cap returned from function | Transfer immediately, don't return |
| Cap with store in struct | Remove `store`, use ID pattern |
| Vector of caps | Store addresses instead |
| Cap extracted from wrapper | Redesign wrapper to not expose cap |