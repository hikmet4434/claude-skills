# Move Syntax Cheatsheet for Sui

## Objects (Key Types)

```move
// === Creating Objects ===
public struct MyObject has key, store {
    id: UID,
    value: u64,
}

// Entry point - creates and transfers
public entry fun create(ctx: &mut TxContext) {
    let obj = MyObject { id: object::new(ctx), value: 42 };
    transfer::transfer(obj, tx_context::sender(ctx));
}

// === Shared Objects ===
public entry fun share(obj: MyObject, ctx: &mut TxContext) {
    transfer::public_share_object(obj);
}

// === Immutable Objects ===
public entry fun freeze(obj: MyObject) {
    transfer::public_freeze_object(obj);
}
```

## Abilities

| Ability | Meaning |
|---------|---------|
| `key` | Can be stored as a Move resource (required for objects) |
| `store` | Can be transferred between addresses |
| `drop` | Can be dropped/destroyed |
| `copy` | Can be copied |

```move
// Custom struct with abilities
public struct Coin has store, key {
    id: UID,
    value: u64,
}
```

## Capabilities Pattern

```move
// === AdminCap - restricts functions to admin ===
public struct AdminCap has key, store { id: UID }

// Only callable with AdminCap
public fun admin_only(_: &AdminCap, obj: &mut MyObject) {
    // admin logic
}

// === TreasuryCap - for fungible tokens ===
public struct FUNGIBLE_TOKEN has key, store {
    id: UID,
    total_supply: u64,
}

// === Witness Pattern ===
public struct WITNESS {}

public fun mint<T: drop>(_: &T, ctx: &mut TxContext) {
    // witness proof pattern
}
```

## Init Function

```move
fun init(ctx: &mut TxContext) {
    let admin = AdminCap { id: object::new(ctx) };
    transfer::transfer(admin, tx_context::sender(ctx));
}
```

## Entry Points

```move
// Simple entry
public entry fun set_value(obj: &mut MyObject, value: u64) {
    obj.value = value;
}

// Entry with return value (ignored)
// public entry fun process(obj: MyObject): u64 { obj.value }
```

## Common Imports

```move
use sui::object::{Self, UID};
use sui::transfer;
use sui::tx_context::{Self, TxContext};
use sui::balance::{Self, Balance};
use sui::coin::{Self, Coin};
use sui::sui::SUI;
```

## Key Sui Addresses

| Address | Purpose |
|---------|---------|
| `0x2` | Sui framework address |
| `0x3` | Sui System address |
| `@0x0` | Initial transaction sender |

## Transfer Functions

```move
// To sender
transfer::transfer(obj, tx_context::sender(ctx));

// Public transfers
transfer::public_transfer(obj, recipient);
transfer::public_share_object(obj);
transfer::public_freeze_object(obj);
```

## Version Bump Pattern

```move
public struct Config has key {
    id: UID,
    version: u64,
    data: vector<u8>,
}

const VERSION: u64 = 1;

public fun migrate(config: &mut Config) {
    let version = config.version;
    if (version == 0) {
        // migration logic
        config.version = VERSION;
    };
}
```