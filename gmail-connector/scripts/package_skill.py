#!/usr/bin/env python3
"""
Package skill for distribution.
Creates a .skill archive with proper structure.
"""

import os
import sys
import json
import shutil
from pathlib import Path
from datetime import datetime


def get_valid_files(skill_path: str) -> list[Path]:
    """Get all valid files to include in package."""
    skill_dir = Path(skill_path)
    files = []

    for item in skill_dir.rglob("*"):
        if item.is_file():
            rel_path = item.relative_to(skill_dir)

            # Skip common build/generated directories
            skip_patterns = [
                '__pycache__',
                '.git',
                'node_modules',
                '.venv',
                'venv',
            ]

            if any(pattern in str(rel_path).split(os.sep) for pattern in skip_patterns):
                continue

            # Skip files that might contain secrets
            skip_files = [
                '.env',
                'credentials.json',
                'token.json',
                '*.key',
                '*.pem',
            ]

            if any(item.match(pattern) for pattern in skip_files):
                continue

            files.append(item)

    return files


def package_skill(skill_path: str, output_dir: str = ".") -> tuple[bool, str]:
    """Package skill into .skill archive."""
    skill_dir = Path(skill_path)

    if not (skill_dir / "SKILL.md").exists():
        return False, "SKILL.md not found"
    if not (skill_dir / "_meta.json").exists():
        return False, "_meta.json not found"

    # Read meta for version info
    try:
        meta = json.loads((skill_dir / "_meta.json").read_text(encoding="utf-8"))
        skill_name = meta.get("id", skill_dir.name)
        version = meta.get("version", "1.0.0")
    except Exception as e:
        return False, f"Failed to read _meta.json: {e}"

    # Create output filename
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    output_file = Path(output_dir) / f"{skill_dir.name}_{version}_{timestamp}.skill"

    # Create archive
    try:
        shutil.make_archive(
            str(output_file.with_suffix("")),
            format="zip",
            root_dir=skill_dir.parent,
            base_dir=skill_dir.name
        )
        return True, str(output_file.with_suffix(".zip"))
    except Exception as e:
        return False, f"Failed to create archive: {e}"


def main():
    if len(sys.argv) < 2:
        print("Usage: python package_skill.py <skill_path> [output_dir]")
        sys.exit(1)

    skill_path = sys.argv[1]
    output_dir = sys.argv[2] if len(sys.argv) > 2 else "."

    print(f"Packaging skill: {skill_path}")
    print("-" * 50)

    # List files
    files = get_valid_files(skill_path)
    print(f"Files to package ({len(files)}):")
    for f in files:
        print(f"  + {f.relative_to(Path(skill_path))}")

    print("-" * 50)

    # Package
    success, result = package_skill(skill_path, output_dir)

    if success:
        print(f"✓ Package created: {result}")
        print("\nArchive contents validated:")
        print("  - SKILL.md (required)")
        print("  - _meta.json (required)")
        print("  - No secrets or build artifacts")
    else:
        print(f"✗ Packaging failed: {result}")
        sys.exit(1)


if __name__ == "__main__":
    main()