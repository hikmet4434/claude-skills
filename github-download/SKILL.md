---
name: github-download
description: Download files, repositories, or releases from GitHub. Use when users ask to download GitHub repos, specific files, releases, or archives.
---

# GitHub Download Skill

## Overview

This skill enables downloading content from GitHub, including:
- Entire repositories (cloning)
- Specific files from repositories
- Release archives (ZIP/TAR.GZ)
- Assets from releases
- Raw file content

## Capabilities

### 1. Clone Repository
Clone an entire GitHub repository to the local filesystem.

**Input Parameters:**
- `repo_url`: Full GitHub repository URL (e.g., `https://github.com/owner/repo`)
- `target_dir`: Local directory to clone into (optional, defaults to repo name)
- `branch`: Specific branch to clone (optional)

**Output:**
- Repository contents downloaded to target directory
- Success/failure status with file count

### 2. Download Single File
Download a specific file from a GitHub repository.

**Input Parameters:**
- `repo_url`: GitHub repository URL
- `file_path`: Path to the file within the repository
- `target_path`: Local destination path
- `branch`: Branch to download from (optional, defaults to `main`)

**Output:**
- File saved to local destination
- Success/failure status

### 3. Download Release Assets
Download assets from GitHub releases.

**Input Parameters:**
- `repo_url`: GitHub repository URL
- `tag`: Release tag (e.g., `v1.0.0`)
- `asset_name`: Name of the asset to download
- `target_path`: Local destination path

**Output:**
- Asset downloaded to local path
- Success/failure status

### 4. Download as Archive
Download repository as ZIP or TAR.GZ archive.

**Input Parameters:**
- `repo_url`: GitHub repository URL
- `format`: Archive format (`zip` or `tar.gz`)
- `target_path`: Local destination path
- `branch`: Branch to archive (optional, defaults to `main`)

**Output:**
- Archive file saved to local path
- Success/failure status

### 5. Get Raw File Content
Fetch raw content of a file without downloading.

**Input Parameters:**
- `repo_url`: GitHub repository URL
- `file_path`: Path to the file
- `branch`: Branch name (optional)

**Output:**
- Raw file content as text field in response

## Usage Examples

### Example 1: Clone Repository
```
Action: Clone a repository from GitHub
repo_url: https://github.com/facebook/react
target_dir: /workspace/react-project
```

### Example 2: Download Single File
```
Action: Download a file from GitHub
repo_url: https://github.com/torvalds/linux
file_path: README
target_path: /workspace/linux-readme.md
```

### Example 3: Download Release Asset
```
Action: Download release asset
repo_url: https://github.com/nodesource/distributions
tag: v20.0.0
asset_name: node.tar.gz
target_path: /workspace/node.tar.gz
```

### Example 4: Download as Archive
```
Action: Download repo as archive
repo_url: https://github.com/python/cpython
format: zip
target_path: /workspace/cpython.zip
```

### Example 5: Get Raw File Content
```
Action: Get raw file content
repo_url: https://github.com/facebook/react
file_path: packages/react/package.json
```

## Error Handling

The skill handles the following error scenarios:
- Invalid repository URL format
- File or repo not found (404)
- Access denied (private repo, rate limiting)
- Network connectivity issues
- Invalid branch or tag
- Insufficient disk space

## Requirements

- Git installed (for cloning operations)
- curl or wget (for single file downloads)
- Network connectivity to github.com

## Limitations

- Cannot download from private repositories without proper authentication
- Rate limiting may occur with excessive requests
- Very large repositories may take significant time to clone
- Archive downloads are limited to single branch/tag

## Technical Implementation

### Clone Repository
Uses `git clone` command with optional branch specification.

### Download Single File
Uses GitHub's raw content API: `https://raw.githubusercontent.com/{owner}/{repo}/{branch}/{path}`

### Download Release
Uses GitHub's release assets API: `https://api.github.com/repos/{owner}/{repo}/releases/tags/{tag}`

### Archive Download
Uses GitHub's archive links: `https://github.com/{owner}/{repo}/archive/{ref}.{format}`
