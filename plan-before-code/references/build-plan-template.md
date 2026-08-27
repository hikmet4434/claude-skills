# Build Plan Template

## Annotated Template for `.suiperpower/build-plan.md`

This is the canonical structure for a Sui build plan. Each section is mandatory for non-trivial builds.

---

## Header Section

```markdown
# Build plan, <YYYY-MM-DD>
## Linked intent
.suiperpower/intent.md, summary: <one sentence from intent>
```

**Why**: Links the "what" to the "how" for later verification.

---

## Package Layout

```markdown
## Package layout
- Package name: <name>
- Single package or multi-package: <choice with rationale>
- Move.toml dependencies:
  - Sui: { git = "...", rev = "<pin>" }
  - OZ Sui: { git = "...", rev = "<pin>" }
```

**Critical**: All deps must be pinned. No floating versions.

---

## Object Model

```markdown
## Object model
### <ObjectName>
- Ownership: owned | shared | immutable
- Abilities: key [+ store + copy + drop] with per-ability rationale
- Purpose: <one sentence>
- Created by: <function name or "init">
- Mutated by: <list of functions>
- Destroyed by: <function or "never">
```

**Example**:
```markdown
### EscrowVault
- Ownership: shared
- Abilities: key (required for object), store (nested in receipts)
- Purpose: Holds escrowed SUI until conditions met
- Created by: create_vault
- Mutated by: deposit, release, refund, dispute
- Destroyed by: never (persists forever)
```

---

## Capabilities

```markdown
## Capabilities
### <CapName>
- Holder at init: <address or "to be determined">
- Holder in production: <multisig address or "burned">
- Gates: <list of functions>
- Transferability: yes | no | burned after init
```

**Key decision**: Name the holder now, not later.

---

## Modules

```markdown
## Modules
### <module_name>
- Purpose: <one sentence>
- Public entry functions:
  - `create_<thing>(args) -> <Object>`
  - `update_<thing>(cap, args) -> <effect>`
- Friend modules: <list or "none">
- Stdlib dependencies: <list>
```

---

## Public Entry Points

```markdown
## Public entry points
- `escrow::create_vault(ctx)` -> (ID, &mut Vault) - creator, low gas, abort 0
- `escrow::deposit(vault, amount, ctx)` -> effect - any caller, gas ~10k
- `escrow::release(vault, cap, ctx)` -> SUI transfer - sender must hold SellerCap
```

Format per entry: `module::function(args) -> effect` with caller type, gas estimate, abort codes.

---

## PTB Shape

```markdown
## PTB shape
- Composability: single-call | multi-step
- Sequence (if multi-step):
  1. `escrow::create_vault()` + capture vault ID
  2. `sui::transfer::public_transfer()` vault to shared
  3. `escrow::deposit()` multiple times
- Gas envelope expected: ~<number>k gas units total
- Expensive step: <step that needs attention>
```

---

## Tests

```markdown
## Tests
- test_create_vault: covers create_vault, success, ties to intent criterion #1
- test_deposit_fails_without_auth: expected failure for unauthorized deposit
- test_release_only_by_seller: covers release, ties to intent criterion #2
- test_double_release_prevented: edge case, intent criterion #3

⚠️ Risk flagged: criterion #4 (automatic dispute resolution) has no test path yet
```

Each intent criterion must map to a test name.

---

## Sponsor Integrations

```markdown
## Sponsor integrations
### Walrus (for blob storage)
- Surface: BlobId passed to initialize()
- Load-bearing test: "Devnet tx <hash> writes blob, on-chain call reads it back, UI renders"
- Reference: https://docs.walrus.ai/integration
- Verification: Will verify with <testnet tx hash> on <date>

### XOracle (for price feeds)
- Surface: PriceFeed<USDT> consumed by update_pricing()
- Load-bearing test: "Testnet tx reads price, escrow calculates spread correctly"
- Reference: https://xoracle.xyz/docs
- Verification: Blocked - no testnet oracle yet, deferring integration
```

---

## Upgrade Authority

```markdown
## Upgrade authority
- Strategy: multisig | solo | burn
- Multisig addresses: [<addr1>, <addr2>, <addr3>] with <threshold> of <n> signers
- Where upgrade cap lives: <address after publish>
- Package id capture: Write to .suiperpower/package-ids.md on successful publish

### Consequence of each choice:
- **solo**: Fast, single point of failure
- **multisig**: Slow, resilient, requires coordination
- **burn**: Immutable after publish, cannot fix bugs
```

---

## Build Order

```markdown
## Order of build
1. <Highest risk unknown first>
2. <Core Object + capabilities>
3. <Entry functions w/ tests>
4. <Sponsor integrations>
5. <PTB composition>
6. <Integration tests>
```

**Rule**: First step proves the riskiest unknown, not the easiest feature.

---

## What "Done" Looks Like

```markdown
## What "done" looks like for this plan
- [ ] Object model complete (all Objects named, owned/shared decision made)
- [ ] All capabilities have named holders
- [ ] All intent success criteria have test coverage
- [ ] Sponsor integrations have load-bearing test commitments
- [ ] Upgrade authority strategy chosen and documented
- [ ] User has explicitly approved this plan
```