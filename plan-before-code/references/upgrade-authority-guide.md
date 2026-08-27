# Upgrade Authority Decision Guide

## The Three Options

| Strategy | Upgrade Cap Holder | Pros | Cons |
|----------|-------------------|------|------|
| **Solo** | Single EOA or hot wallet | Fast iteration | Single point of failure |
| **Multisig** | M-of-N multisig wallet | Resilient, community trust | Slower, coordination needed |
| **Burn** | Sent to address 0x0 | Immutable, maximum trust | No bug fixes possible |

---

## Solo Authority

**When to use**:
- Early development / prototyping
- Private projects where single operator is acceptable
- When you need to iterate fast and accept the risk

**Setup**:
```bash
sui client publish --skip-fetch-latest-git-deps --gas-budget 100000000 \
  --upgrade-capability <your-address>
```

**Security considerations**:
- The private key must be kept secure
- Consider a dedicated CI/CD key, not personal wallet
- Consider timelock: publish with solo, then transfer to multisig before mainnet

---

## Multisig Authority

**When to use**:
- Production contracts
- Protocols holding user funds
- Any project requiring community trust

**Setup**:
```bash
# Create multisig
sui client multi-sig-address --threshold 2 \
  --addresses <addr1>,<addr2>,<addr3>

# Publish with multisig as upgrade authority
sui client publish --skip-fetch-latest-git-deps --gas-budget 100000000 \
  --upgrade-capability <multisig-address>
```

**Multisig configurations**:
| Type | Example | Use Case |
|------|---------|----------|
| 1-of-2 | Alice OR Bob | Small team, either can upgrade |
| 2-of-3 | Any 2 of (Alice, Bob, Charlie) | Larger team, redundancy |
| 3-of-5 | Any 3 of 5 committee members | DAOs, foundations |

---

## Burn Authority

**When to use**:
- Truly immutable protocols (no upgrades planned)
- Bridge contracts where immutability = trust
- Governance tokens with fixed supply

**Setup**:
```bash
# After publish, transfer to 0x0 (burn)
sui client object <upgrade-cap-id> transfer \
  --to 0x0 --gas-budget 10000000
```

**Warning**: After burning, you cannot:
- Fix critical bugs
- Add features
- Patch security vulnerabilities
- Recover from mistakes

---

## Decision Checklist

Ask yourself:

1. **Does this contract hold user funds?**
   - Yes → Multisig minimum, burning is reckless
   - No → Any option viable

2. **Is the protocol early-stage and evolving?**
   - Yes → Solo initially, plan to migrate to multisig
   - No → Burn or multisig

3. **Is immutability a feature for trust?**
   - Yes → Burn makes sense for that module
   - No → Keep upgrade capability

4. **What's the community expectation?**
   - DAOs → Multisig or governance
   - Protocols → Often multisig
   - Utilities → Solo or burn acceptable

---

## Migration Paths

### Solo → Multisig (Recommended for Production)

```move
// After initial solo publish:
// 1. Generate multisig address
// 2. Transfer upgrade cap
public entry fun migrate_to_multisig(
    cap: UpgradeCap,
    new_authority: address,
    ctx: &mut TxContext
) {
    // Transfer logic via Sui framework
    // Verify new_authority is a valid multisig
}
```

### Solo → Burn (One-way Trip)

```bash
# Only do this if you're certain!
# Requires explicit user confirmation
sui client object <upgrade-cap-id> transfer \
  --to 0x0000000000000000000000000000000000000000000000000000000000000000
```

---

## Package ID Capture

For downstream tools, write package IDs to a standard location:

```bash
# After successful publish
echo "devnet: <package-id>" >> .suiperpower/package-ids.md
echo "testnet: <package-id>" >> .suiperpower/package-ids.md
echo "mainnet: <package-id>" >> .suiperpower/package-ids.md
```

All downstream skills (deploy-to-testnet, submit-to-sui-overflow) should read from one place.