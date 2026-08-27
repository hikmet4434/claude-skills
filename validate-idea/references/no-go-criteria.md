# No-Go Criteria

## Hard Rejection Patterns

These patterns should trigger a `no-go` regardless of enthusiasm, market size, or team capability. Exceptions require explicit override with documented reasoning.

### Category-Level Rejections

1. **Repeat DeFi**: Forking existing DeFi protocols without meaningful Sui-native differentiation
   - Exception: If there's a specific Sui primitive that enables a 10x improvement

2. **Low-fee narrative only**: Ideas that rely primarily on "Sui has lower fees"
   - Why: Not a moat, any L1 can reduce fees
   - Exception: Specific use case where fees are the primary bottleneck

3. **Pure infrastructure without ecosystem need**: Building tools for which no one has asked
   - Exception: Deep technical innovation with clear adoption path

4. **Regulatory minefields without legal counsel**: Ideas in heavily regulated spaces without compliance roadmap
   - Examples: Privacy coins, unregistered securities patterns

### Technical Rejections

1. **Research-grade dependencies with hard deadlines**
   - If the idea requires novel cryptography, custom consensus, or untested L1 work AND there's a hard external deadline (Overflow, grant milestone), flag as `no-go`
   - Exception: User explicitly accepts timeline risk

2. **Oracle dependency with no working solution**
   - If the idea requires real-world data and no oracle infrastructure exists on Sui, flag as hard feasibility risk
   - Exception: User willing to build oracle themselves

3. **Cross-chain bridge complexity**
   - Bridges are notoriously difficult and many fail
   - Exception: Existing battle-tested bridge infrastructure exists

### Market Rejections

1. **Zero Sui-native fit**: Ideas that could run equally well on EVM or Solana with no advantage on Sui
   - Why: Build where you have moat
   - Exception: Strong community or sponsor support

2. **Saturated market with no differentiation**
   - If 5+ similar projects exist on Sui and the candidate has no specific differentiation
   - Exception: Strong team + capital to outcompete

3. **Commodity DeFi with no USP**
   - AMMs, lending, yield farms without specific Sui advantages

### Timing Rejections

1. **Early-mover in dead category**
   - Building a category no one has heard of with no education budget
   - Exception: Strong content/education engine

## Soft Rejection Patterns (Go with Pivot)

These patterns suggest a pivot rather than rejection:

1. **Real demand, wrong product**: Underlying market is healthy but the proposed solution misses the mark
2. **Technical feasibility yes, Sui-native fit weak**: Could work on any chain, needs Sui-specific angle
3. **Strong competition, differentiation unclear**: Market exists but candidate can't articulate unique advantage

## Override Process

To override a no-go:
1. Document the specific rejection criterion
2. Provide evidence why the exception applies
3. Get explicit user acknowledgment that they're proceeding against advice
4. Log the override in `.suiperpower/idea-context.md`

## Decision Flow

```
Start: Evaluate idea
  |
  v
Is it on hard rejection list?
  |
  +-- Yes --> No-Go (document reason)
  |
  No
  |
  v
Any research-grade dependencies with hard deadline?
  |
  +-- Yes --> No-Go (feasibility blocked)
  |
  No
  |
  v
Count weak dimensions:
  |
  +-- 0-1 weak --> Go
  |
  +-- 1 weak, category healthy --> Go-with-Pivot
  |
  +-- 2+ weak --> No-Go
```