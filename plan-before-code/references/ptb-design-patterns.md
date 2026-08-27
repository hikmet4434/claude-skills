# PTB (Programmable Transaction Block) Design Patterns

## What is a PTB?

A Programmable Transaction Block is a sequence of Move calls that execute atomically in a single transaction. Users or frontends compose PTBs to interact with Sui contracts.

## Single-Call vs Multi-Step

### Single-Call (Simplest)

Use when: One action is sufficient
```move
// One call does everything
public entry fun stake(amount: u64, ctx: &mut TxContext) {
    let coin = coin::from_balance(balance::create(amount), ctx);
    staking_pool::stake(coin, ctx);
}
```

### Multi-Step (Composable)

Use when: Multiple contracts must be updated atomically
```move
// Step 1: Create vault
let vault = vault::create(ctx);
// Step 2: Share it
transfer::public_share_object(vault);
// Step 3: Fund it
sui::coin::transfer(vault_fund, tx_context::sender(ctx));
```

## Common PTB Patterns

### Pattern 1: Create + Share

```move
// Move code
public fun create_and_share(ctx: &mut TxContext): Vault {
    let vault = Vault { id: object::new(ctx), ... };
    transfer::public_share_object(vault);
    vault
}
```

Frontend compose:
```typescript
// PTB
const tx = new Transaction();
tx.moveCall({
  target: `${packageId}::vault::create_and_share`,
});
tx.transferObjects([tx.object(vault_id)], tx.pure(sender));
```

### Pattern 2: Chain of Updates

```move
// Multiple steps that must all succeed
public fun rebalance(pool: &mut Pool, config: &Config) {
    let price = config.get_price();
    pool.adjust_positions(price);
    pool.update_tvl();
}
```

### Pattern 3: Conditional Actions

```move
public fun claim_with_fallback(
    rewards: &mut Rewards,
    fallback: &mut FallbackVault,
    ctx: &mut TxContext
) {
    let amount = rewards.claim(ctx);
    if (amount > 0) {
        // Direct claim
    } else {
        // Fallback to other vault
        fallback.transfer_to(rewards.holder(), ctx);
    }
}
```

## Gas Estimation

| Call Type | Gas Units (rough) |
|-----------|------------------|
| Simple transfer | ~5,000 |
| Shared object read | ~10,000 |
| Shared object write | ~25,000 |
| Cross-module call | ~15,000 |
| Complex math in Move | ~50,000+ |

### Estimating Total PTB Gas

```typescript
// Rough formula
const totalGas = calls.reduce((sum, call) => {
  if (call.shared_write) return sum + 25000;
  if (call.shared_read) return sum + 10000;
  return sum + 5000;
}, 0);
```

## Design Guidelines

1. **Keep entry points PTB-friendly**
   - Avoid storing Complex structs by value in function args
   - Prefer IDs and references where possible

2. **One logical action per entry point**
   - Don't cram multiple operations into one function
   - PTB is the composition layer, not Move

3. **Atomic where needed, composable where possible**
   - Use shared objects for multi-party atomic updates
   - Use owned objects for single-user sequences

4. **Design for batching**
   - If users often do X then Y, consider a combined entry point
   - Or design so X+Y works as a PTB

## Common Mistakes to Avoid

| Mistake | Problem | Fix |
|---------|---------|-----|
| Too many shared writes | High gas, contention | Batch or redesign |
| Large struct by value in args | PTB size limit | Pass IDs, fetch by ID |
| Inconsistent abort codes | Hard to debug | Document aborts in plan |
| Mixing ownership types | Unsafe | Design upfront |

## Documentation Format for Build Plan

```markdown
## PTB shape
- Composability: single-call | multi-step
- Sequence (if multi-step):
  1. `<module>::<fn1>()` - purpose
  2. `<transfer or other>` - purpose
  3. `<module>::<fn2>(args)` - purpose
- Gas envelope: ~<N>k total
- Bottleneck: <step that costs most gas>
```