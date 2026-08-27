#!/usr/bin/env python3
"""
Quick validation script for Gmail Connector skill.
Validates structure, frontmatter, and naming conventions.
"""

import os
import sys
import re
import json
from pathlib import Path


def validate_frontmatter(skill_path: str) -> tuple[bool, list[str]]:
    """Validate SKILL.md frontmatter format."""
    errors = []
    skill_md = Path(skill_path) / "SKILL.md"

    if not skill_md.exists():
        return False, ["SKILL.md not found"]

    content = skill_md.read_text(encoding="utf-8")

    # Check frontmatter starts at beginning
    if not content.startswith("---"):
        errors.append("SKILL.md must start with YAML frontmatter (---)")
        return False, errors

    # Extract frontmatter
    frontmatter_match = re.match(r'^---\n(.*?)\n---', content, re.DOTALL)
    if not frontmatter_match:
        errors.append("Invalid YAML frontmatter format")
        return False, errors

    frontmatter = frontmatter_match.group(1)

    # Check required fields
    if not re.search(r'^name:', frontmatter, re.MULTILINE):
        errors.append("Frontmatter missing 'name' field")

    if not re.search(r'^description:', frontmatter, re.MULTILINE):
        errors.append("Frontmatter missing 'description' field")

    # Validate name format (hyphen-case, max 64 chars)
    name_match = re.search(r'^name:\s*(.+)', frontmatter, re.MULTILINE)
    if name_match:
        name = name_match.group(1).strip()
        if not re.match(r'^[a-z0-9][a-z0-9-]*$', name):
            errors.append(f"Invalid name format '{name}': use hyphen-case (lowercase with hyphens)")
        if len(name) > 64:
            errors.append(f"Name exceeds 64 characters: {len(name)}")

    return len(errors) == 0, errors


def validate_meta_json(skill_path: str) -> tuple[bool, list[str]]:
    """Validate _meta.json structure."""
    errors = []
    meta_path = Path(skill_path) / "_meta.json"

    if not meta_path.exists():
        return False, ["_meta.json not found"]

    try:
        meta = json.loads(meta_path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as e:
        return False, [f"Invalid JSON in _meta.json: {e}"]

    if "id" not in meta:
        errors.append("_meta.json missing 'id' field")
    if "version" not in meta:
        errors.append("_meta.json missing 'version' field")
    else:
        # Validate semver format
        version = meta["version"]
        if not re.match(r'^\d+\.\d+\.\d+$', version):
            errors.append(f"Invalid version format '{version}': use semver (e.g., 1.0.0)")

    return len(errors) == 0, errors


def validate_directory_structure(skill_path: str) -> tuple[bool, list[str]]:
    """Validate directory structure and file paths."""
    errors = []
    skill_dir = Path(skill_path)

    # Check for script files
    scripts_dir = skill_dir / "scripts"
    if scripts_dir.exists():
        for script in scripts_dir.glob("*.py"):
            if not os.access(script, os.X_OK):
                errors.append(f"Script {script.name} should be executable")

    # Check for reference files (non-ASCII paths)
    for file_path in skill_dir.rglob("*"):
        if file_path.is_file():
            path_str = str(file_path.relative_to(skill_dir))
            if not all(ord(c) < 128 or c in '-_/.' for c in path_str):
                errors.append(f"Non-ASCII path detected: {path_str}")

    return len(errors) == 0, errors


def main():
    if len(sys.argv) < 2:
        print("Usage: python quick_validate.py <skill_path>")
        sys.exit(1)

    skill_path = sys.argv[1]
    all_passed = True

    print(f"Validating skill at: {skill_path}")
    print("-" * 50)

    # Run validations
    checks = [
        ("Frontmatter", validate_frontmatter),
        ("Meta JSON", validate_meta_json),
        ("Directory Structure", validate_directory_structure),
    ]

    for name, validator in checks:
        passed, errors = validator(skill_path)
        status = "✓ PASS" if passed else "✗ FAIL"
        print(f"{status}: {name}")
        if not passed:
            all_passed = False
            for error in errors:
                print(f"  - {error}")

    print("-" * 50)
    print("Result: " + ("ALL CHECKS PASSED" if all_passed else "SOME CHECKS FAILED"))
    sys.exit(0 if all_passed else 1)


if __name__ == "__main__":
    main()