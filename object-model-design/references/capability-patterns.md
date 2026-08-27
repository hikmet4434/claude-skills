# Capability Patterns Guide

## Core Pattern: AdminCap

Simple admin control for a single authority.

```move
public struct AdminCap has key, store {
    id: UID,
}

// Create in init
fun init(ctx: &mut TxContext) {
    let admin = AdminCap { id: object::new(ctx) };
    transfer::transfer(admin, tx_context::sender(ctx));
}

// Gate function
public entry fun admin_action(_: &AdminCap, config: &mut Config) {
    // admin-only logic
}
```

**When to use**: Single admin, no multi-sig needed.

**Holder strategy**: Transfer to multisig for production.

## Pattern: TreasuryCap

For fungible token minting/burning.

```move
public struct MY_TOKEN has drop, store {}

public struct TreasuryCap has key, store {
    id: UID,
    total_supply: u64,
}

// Created via coin module
fun init(ctx: &mut TxContext) {
    let (cap, metadata) = coin::create_currency(
       Witness {},
        9, // decimals
        b"MTK",
        b"MY_TOKEN",
        b"My Token",
        option::none(),
        ctx
    );
    transfer::public_freeze_object(metadata);
    transfer::transfer(cap, tx_context::sender(ctx));
}
```

**Holder strategy**: Treasury multisig for mint authority.

## Pattern: Witness Pattern

For generic, type-gated creation.

```move
public struct WITNESS has drop {}

public fun create<T: drop>(_: &T, ctx: &mut TxContext): Object {
    Object { id: object::new(ctx), created: true }
}
```

**When to use**: When you want any type that implements `drop` to be able to call.

## Pattern: Multi-Capability

When multiple roles exist.

```move
public struct AdminCap has key, store { id: UID }
public struct MinterCap has key, store { id: UID }
public struct PauserCap has key, store { id: UID }

public struct Roles has key {
    id: UID,
    admin: bool,
    minter: bool,
    pauser: bool,
}

// Check via roles object
public fun mint(_: &MinterCap, roles: &Roles) {
    assert!(roles.minter, 0);
    // mint logic
}
```

## Pattern: Capability with Version

For upgradeable capabilities.

```move
public struct AdminCap has key, store {
    id: UID,
    version: u64,
}

const CURRENT_VERSION: u64 = 1;

public fun migrate(cap: &mut AdminCap) {
    if (cap.version < CURRENT_VERSION) {
        // migration logic
        cap.version = CURRENT_VERSION;
    }
}
```

## Capability Leakage Anti-Patterns

### BAD: Exposing capability via getter
```move
// DON'T DO THIS
public fun get_admin(caps: &Capabilities): &AdminCap {
    &caps.admin // Leaks admin capability reference!
}
```

### GOOD: Require capability at each function
```move
public fun update_config(_: &AdminCap, config: &mut Config, data: vector<u8>) {
    // Admin must be passed in - no leakage
}
```

## Holder Strategy Table

| Capability | Holder | Transfer Method |
|------------|--------|-----------------|
| AdminCap | Multisig | `transfer::transfer` to multisig address |
| TreasuryCap | Treasury multisig | Same |
| MinterCap | Minting bot | By-reference, not by-value |
| Role-based | Varies | Design per role |

## Capability Flow Best Practices

1. **Create in init** - Don't expose public creation
2. **Transfer immediately** - To intended holder
3. **Pass by reference** - Never consume unless intentional
4. **No getter functions** - Capability stays internal
5. **Document holder strategy** - In build-context.md