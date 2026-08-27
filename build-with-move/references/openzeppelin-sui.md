# OpenZeppelin Sui Library Reference

## When to Use OZ Sui

Use OpenZeppelin's Sui libraries instead of hand-rolling when:
- You need standard ERC20/ERC721-like tokens
- You need access control patterns (roles, permissions)
- You need pausable/ownable contracts
- You need token vesting functionality

## Core Modules

### Token (ERC20-style)

```move
// Use OZ's token module
use openzeppelin_token::token::Token;

// Create a new token type
struct MY_TOKEN has drop {}

// Initialize with TreasuryCap
public fun create_token(ctx: &mut TxContext): (TreasuryCap<MY_TOKEN>, Token<MY_TOKEN>) {
    let (cap, token) = token::create<MY_TOKEN>(ctx);
    (cap, token)
}
```

### Access Control

```move
use openzeppelin_access::ownable::Ownable;

// Check ownership
public fun admin_only(ownable: &Ownable) {
    ownable.assert_owner(ctx);
}
```

### Roles

```move
use openzeppelin_access::roles::Roles;

// Check role
public fun role_restricted(roles: &Roles) {
    roles.has_role(admin_role(), ctx.sender());
}
```

### Pausable

```move
use openzeppelin_utils::pausable::{Pausable, Paused, Unpaused};

// Pause/unpause functionality
public fun pause(pausable: &mut Pausable, cap: &AdminCap) {
    pausable.pause();
}
```

## When NOT to Use OZ

- Simple custom logic with unique requirements
- When OZ adds too much overhead for simple use cases
- When you need fine-grained control that OZ doesn't expose

## OZ Module Structure

```
openzeppelin_token/
├── token/           # ERC20-like token
├── soulbound_token/ # Soulbound (non-transferable) tokens
└── utils/

openzeppelin_access/
├── ownable/        # Ownable pattern
├── roles/          # Role-based access control
└── pausable/       # Pause/unpause functionality

openzeppelin_utils/
├── pausable/       # Pausable utility
└── multisig/       # Multisig utilities
```

## Installation via Move.toml

```toml
OZContracts = { git = "https://github.com/OpenZeppelin/openzeppelin-contracts.git", subdir = "packages/sui", rev = "v1.2.0" }
```

Check https://github.com/OpenZeppelin/openzeppelin-contracts for latest version and documentation.