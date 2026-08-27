# Owned vs Shared Decision Guide

## Quick Decision Matrix

| Scenario | Default Choice | When to Flip |
|----------|---------------|--------------|
| Per-user state | Owned | Need cross-contract access |
| Global config | Shared | Only one user ever touches it |
| NFT with fixed metadata | Immutable | Metadata may update |
| Asset pool | Shared | Pool per user only |

## Owned Objects

**Definition**: One address holds the Object. Only that address (or those it authorizes) can mutate.

**Best for**:
- User profiles, settings, preferences
- Inventory, wallet balances
- Items that should not be accessible by others

**Example - User Profile**:
```move
public struct Profile has key, store {
    id: UID,
    display_name: string::String,
    created_at: u64,
}
// Created by user, owned by user, only user mutates
```

**When to use shared instead**: When another contract needs to read/write this data.

## Shared Objects

**Definition**: No single owner. Anyone can call mutating functions (sequenced by consensus).

**Best for**:
- Global registries (token, domain, ID)
- Marketplace listings
- Liquidity pools, staking vaults
- Auction state

**Example - Marketplace Listing**:
```move
public struct Listing has key, store {
    id: UID,
    seller: address,
    price: u64,
    item_id: ID,
    active: bool,
}
// Created by seller, shared so anyone can buy
```

**When to use owned instead**: When mutations should be exclusive to one party.

## Immutable Objects

**Definition**: Frozen at creation. No mutating functions exist.

**Best for**:
- NFT metadata (fixed)
- Configuration constants
- Canonical references (registry entries you want to persist)

**Example - Canonical Rule**:
```move
public struct Rule has key {
    id: UID,
    content: vector<u8>, // immutable hash
}
// Created once, never changed, anyone can read
```

## Capability-Gated Shared

For shared objects that still need admin control:

```move
public struct Config has key {
    id: UID,
    admin: address,
    version: u64,
}

// Only admin can mutate
public entry fun update(_: &AdminCap, config: &mut Config, new_data: vector<u8>) {
    config.version = config.version + 1;
}
```

## Decision Rules Checklist

1. **How many parties need write access?**
   - One → Owned
   - Many → Shared

2. **Should others be able to reference this?**
   - Yes → Shared or Immutable
   - No → Owned

3. **Is this a user resource or a system resource?**
   - User resource → Owned
   - System resource → Shared

4. **Can mutations happen concurrently?**
   - No contention expected → Owned
   - Contention possible → Shared

## Common Mistakes

| Mistake | Problem | Fix |
|---------|---------|-----|
| Making user assets shared | Anyone could modify | Make owned |
| Making global registry owned | Only one person can use it | Make shared |
| Forgetting to share | Other contracts can't access | Design upfront |
| Sharing too much | No access control | Add capability gate |