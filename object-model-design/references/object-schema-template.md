# Object Schema Template - Complete Example

## Project: Simple Escrow Service

**Intent**: Hold assets in escrow between buyer and seller until conditions are met.

---

## Entity Inventory

| Entity | Creates | Reads | Mutates | Destroys |
|--------|---------|-------|--------|----------|
| Escrow | Buyer | Buyer, Seller, Arbiter | Buyer (cancel), Seller (release), Arbiter (resolve) | After completion |
| Treasury | System | Admin | Admin (withdraw fees) | Never |

---

## Object Map

| Object | Abilities | Ownership | Mutation Gate | Rationale |
|--------|-----------|-----------|---------------|-----------|
| Escrow | key, store | Shared | BuyerCap (cancel), SellerCap (release), ArbiterCap (resolve) | Multiple parties interact; needs global access |
| EscrowRole | key, store | Owned | Self | Each party holds their own role |

---

## Object Definitions

```move
// Escrow - shared object for escrow state
public struct Escrow has key, store {
    id: UID,
    buyer: address,
    seller: address,
    arbiter: address,
    amount: u64,
    status: u8, // 0=pending, 1=released, 2=disputed, 3=cancelled
    created_at: u64,
    version: u64,
}

// Role capabilities - owned by respective parties
public struct BuyerCap has key, store {
    id: UID,
    escrow_id: ID,
}

public struct SellerCap has key, store {
    id: UID,
    escrow_id: ID,
}

public struct ArbiterCap has key, store {
    id: UID,
    escrow_id: ID,
}

// Treasury - shared admin-controlled treasury
public struct Treasury has key {
    id: UID,
    admin: address,
    balance: Balance<SUI>,
    fee_basis_points: u64,
}

public struct TreasuryAdminCap has key, store {
    id: UID,
}
```

---

## Capability Flow

```
init()
    |
    +-- create TreasuryAdminCap --> transfer to deployer
    |
    +-- create Treasury --> transfer::public_share_object

create_escrow()
    |
    +-- create Escrow --> transfer::public_share_object
    +-- create BuyerCap --> transfer to buyer
    +-- create SellerCap --> transfer to seller
    (optional) create ArbiterCap --> transfer to arbiter

release_escrow()
    |
    +-- requires SellerCap reference
    +-- transfers amount to buyer
    +-- marks status = released

cancel_escrow()
    |
    +-- requires BuyerCap reference
    +-- returns funds to buyer
    +-- marks status = cancelled

resolve_dispute()
    |
    +-- requires ArbiterCap reference
    +-- distributes funds as determined
    +-- marks status = resolved
```

---

## API Surface

| Entry Function | Objects Touched | Capability Required | Returns |
|---------------|-----------------|-------------------|---------|
| create_escrow | Escrow, BuyerCap, SellerCap | none | (BuyerCap, SellerCap) |
| release_escrow | Escrow | SellerCap | SUI |
| cancel_escrow | Escrow | BuyerCap | SUI |
| dispute_escrow | Escrow | BuyerCap | - |
| resolve_dispute | Escrow | ArbiterCap | SUI |
| deposit_treasury | Treasury | TreasuryAdminCap | - |
| withdraw_treasury | Treasury | TreasuryAdminCap | SUI |

---

## Stress Test Results

| Test | Passed | Notes |
|------|--------|-------|
| Concurrency: two buyers race | Yes | Status check prevents double-release |
| Reinitialization: create twice | Yes | Each escrow is unique, no collision |
| Capability leakage | Yes | No public getters for capabilities |
| Versioning | Yes | Version field on Escrow for future upgrades |

---

## Open Issues

- [ ] Need dispute resolution UI
- [ ] Should fees be taken at creation or release?
- [ ] Consider adding a time-lock for arbiter

---

## Notes for build-with-move

Implementation should:
1. Use `transfer::public_share_object` for Escrow and Treasury
2. Transfer role caps to respective parties immediately
3. Check status before any state-changing operation
4. Bump version on each state transition