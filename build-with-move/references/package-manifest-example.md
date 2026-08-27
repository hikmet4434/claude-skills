# Move.toml Package Manifest Example

```toml
[package]
name = "my_sui_project"
version = "0.0.1"
edition = "2024.w"  # Move 2024 edition

[dependencies]
# Sui Framework - pinned to specific version
Sui = { git = "https://github.com/MystenLabs/sui.git", subdir = "crates/sui-framework/packages/sui-framework", rev = "0.32.0" }

# MoveStdlib (optional, for utility functions)
MoveStdlib = { git = "https://github.com/MystenLabs/sui.git", subdir = "crates/sui-framework/packages/move-stdlib", rev = "0.32.0" }

# OpenZeppelin Contracts for Sui (if needed)
# OZContracts = { git = "https://github.com/OpenZeppelin/openzeppelin-contracts.git", subdir = "packages/sui", rev = "v1.2.0" }

[addresses]
# Project addresses
my_project = "0x0"  # Development address (0x0 for local)

# Framework addresses (required for Sui)
sui = "0x2"
std = "0x1"

[dev-dependencies]
# Testing utilities
SuiTestUtils = { git = "https://github.com/MystenLabs/sui.git", subdir = "crates/sui-framework/packages/sui-test-utils", rev = "0.32.0" }
```

## Key Points

1. **Always pin dependencies** - Never use `branch = "main"` or `branch = "devnet"`
2. **Use exact revisions** - `rev = "0.32.0"` or a specific git commit hash
3. **Specify subdir** - Sui framework packages are in subdirectories
4. **Set edition** - Use `2024.w` for Move 2024 features

## Finding Current Sui Version

```bash
sui --version
```

Then look up the corresponding commit in:
https://github.com/MystenLabs/sui/tags