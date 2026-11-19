#!/bin/bash
# GitHub Download Skill - Main Entry Point
# Downloads files, repositories, or releases from GitHub

set -e

VERSION="1.0.0"
DOWNLOAD_DIR="${DOWNLOAD_DIR:-/workspace/downloads}"

usage() {
    cat <<EOF
GitHub Download Skill v${VERSION}

Usage: github-download <command> [options]

Commands:
    clone              Clone a repository
    file               Download a single file
    release            Download release asset
    archive            Download as ZIP/TAR archive
    raw                Get raw file content

Options:
    -h, --help         Show this help message
    -v, --version      Show version

Examples:
    github-download clone https://github.com/owner/repo
    github-download file https://github.com/owner/repo --path README.md
    github-download release https://github.com/owner/repo --tag v1.0.0 --asset release.tar.gz
    github-download archive https://github.com/owner/repo --format zip
    github-download raw https://github.com/owner/repo --path package.json
EOF
}

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

error() {
    echo "[ERROR] $1" >&2
    exit 1
}

is_safe_repo_component() {
    local part=$1
    [[ -n "$part" ]] || return 1
    [[ "$part" != "." && "$part" != ".." ]] || return 1
    [[ "$part" != *..* ]] || return 1
    [[ "$part" != -* ]] || return 1
    [[ "$part" =~ ^[A-Za-z0-9._-]+$ ]] || return 1
    return 0
}

parse_git_url() {
    local url=$1
    local owner repo

    # Reject newlines/whitespace or control characters
    [[ -n "$url" && "$url" != *[[:space:]]* ]] || return 1

    if [[ "$url" =~ ^https://github\.com/([A-Za-z0-9._-]+)/([A-Za-z0-9._-]+)/?$ ]]; then
        owner="${BASH_REMATCH[1]}"
        repo="${BASH_REMATCH[2]}"
    elif [[ "$url" =~ ^git@github\.com:([A-Za-z0-9._-]+)/([A-Za-z0-9._-]+)$ ]]; then
        owner="${BASH_REMATCH[1]}"
        repo="${BASH_REMATCH[2]}"
    else
        return 1
    fi

    repo="${repo%.git}"
    is_safe_repo_component "$owner" || return 1
    is_safe_repo_component "$repo" || return 1

    echo "$owner $repo"
}

validate_repo_url() {
    local url=$1
    parse_git_url "$url" >/dev/null
}

validate_git_ref() {
    local ref=$1
    local allow_plus=${2:-0}

    [[ -n "$ref" ]] || return 1
    [[ "$ref" != -* && "$ref" != .* && "$ref" != /* ]] || return 1
    [[ "$ref" != */ && "$ref" != *. && "$ref" != *.lock ]] || return 1
    [[ "$ref" != *..* && "$ref" != *//* ]] || return 1

    if [[ "$allow_plus" == "1" ]]; then
        [[ "$ref" =~ ^[A-Za-z0-9._/+-]+$ ]] || return 1
    else
        [[ "$ref" =~ ^[A-Za-z0-9._/-]+$ ]] || return 1
    fi
    return 0
}

validate_repo_file_path() {
    local file_path=$1
    [[ -n "$file_path" ]] || return 1
    [[ "$file_path" != /* && "$file_path" != -* && "$file_path" != */ ]] || return 1
    [[ "$file_path" != *//* && "$file_path" != *[[:space:]]* ]] || return 1
    [[ ! "$file_path" =~ (^|/)\.\.(/|$) ]] || return 1
    [[ "$file_path" =~ ^[A-Za-z0-9._/@+-]+$ ]] || return 1
    return 0
}

validate_asset_name() {
    local asset_name=$1
    [[ -n "$asset_name" ]] || return 1
    [[ "$asset_name" != "." && "$asset_name" != ".." && "$asset_name" != -* ]] || return 1
    [[ "$asset_name" != */* && "$asset_name" != *..* ]] || return 1
    [[ "$asset_name" =~ ^[A-Za-z0-9._+-]+$ ]] || return 1
    return 0
}

validate_format() {
    local format=$1
    [[ "$format" == "zip" || "$format" == "tar.gz" ]]
}

canonicalize_path() {
    local input_path=$1
    local base_path=${2:-$PWD}

    [[ -n "$input_path" && "$input_path" != *$'\n'* ]] || return 1
    if [[ "$input_path" != /* ]]; then
        input_path="${base_path}/${input_path}"
    fi

    local -a parts=()
    IFS='/' read -r -a parts <<< "$input_path"

    local resolved=""
    local seg step
    if [[ ${#parts[@]} -gt 0 ]]; then
        for seg in "${parts[@]}"; do
            if [[ -z "$seg" || "$seg" == "." ]]; then
                continue
            fi
            if [[ "$seg" == ".." ]]; then
                if [[ -n "$resolved" ]]; then
                    resolved="${resolved%/*}"
                fi
                continue
            fi
            if [[ "$resolved" == "/" || -z "$resolved" ]]; then
                step="/${seg}"
            else
                step="${resolved}/${seg}"
            fi
            if [[ -d "$step" ]]; then
                resolved=$(cd -P "$step" 2>/dev/null && pwd) || return 1
            elif [[ -L "$step" ]]; then
                # Reject symlinks to files or dangling symlinks
                return 1
            else
                resolved="$step"
            fi
        done
    fi

    [[ -z "$resolved" ]] && resolved="/"
    printf '%s\n' "$resolved"
}

resolve_safe_target() {
    local raw_target=$1
    local resolved_base resolved_target

    resolved_base=$(canonicalize_path "$DOWNLOAD_DIR" "$PWD") || error "Invalid DOWNLOAD_DIR: $DOWNLOAD_DIR"
    [[ "$resolved_base" != "/" ]] || error "DOWNLOAD_DIR cannot be '/'"

    resolved_target=$(canonicalize_path "$raw_target" "$resolved_base") || error "Invalid target path: $raw_target"

    if [[ "$resolved_target" != "${resolved_base}/"* ]]; then
        error "Target path escapes DOWNLOAD_DIR (${DOWNLOAD_DIR}): $raw_target"
    fi

    printf '%s\n' "$resolved_target"
}

cmd_clone() {
    local repo_url=$1
    local target_dir=${2:-}
    local branch=${3:-}

    if [[ -z "$repo_url" ]]; then
        echo "Usage: github-download clone <repo_url> [target_dir] [branch]"
        exit 1
    fi

    validate_repo_url "$repo_url" || error "Invalid repository URL: $repo_url"

    local -a clone_args=(git clone)
    if [[ -n "$branch" ]]; then
        validate_git_ref "$branch" 0 || error "Invalid branch name: $branch"
        clone_args+=(--branch "$branch")
    fi

    clone_args+=(-- "$repo_url")

    local safe_target_dir=""
    if [[ -n "$target_dir" ]]; then
        safe_target_dir=$(resolve_safe_target "$target_dir") || exit 1
        clone_args+=("$safe_target_dir")
    fi

    log "Cloning repository: $repo_url"

    mkdir -p "$DOWNLOAD_DIR"
    cd "$DOWNLOAD_DIR"

    "${clone_args[@]}"

    log "Repository cloned successfully!"
}

cmd_file() {
    local repo_url=$1
    local file_path=$2
    local target_path=$3
    local branch=${4:-main}

    if [[ -z "$repo_url" || -z "$file_path" || -z "$target_path" ]]; then
        echo "Usage: github-download file <repo_url> --path <file_path> [--target <target_path>] [--branch <branch>]"
        exit 1
    fi

    local parsed
    parsed=$(parse_git_url "$repo_url") || error "Invalid repository URL"
    read -r owner repo <<< "$parsed"

    validate_repo_file_path "$file_path" || error "Invalid file path: $file_path"
    validate_git_ref "$branch" 0 || error "Invalid branch name: $branch"

    local safe_target_path
    safe_target_path=$(resolve_safe_target "$target_path") || exit 1

    log "Downloading file: $file_path from $repo_url"

    local raw_url="https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${file_path}"

    mkdir -p "$(dirname "$safe_target_path")"
    if curl -fsSL -- "$raw_url" -o "$safe_target_path"; then
        log "File downloaded successfully to: $safe_target_path"
    else
        error "Failed to download file"
    fi
}

cmd_release() {
    local repo_url=$1
    local tag=$2
    local asset_name=$3
    local target_path=$4

    if [[ -z "$repo_url" || -z "$tag" || -z "$asset_name" ]]; then
        echo "Usage: github-download release <repo_url> --tag <tag> --asset <asset_name> [--target <target_path>]"
        exit 1
    fi

    local parsed
    parsed=$(parse_git_url "$repo_url") || error "Invalid repository URL"
    read -r owner repo <<< "$parsed"

    validate_git_ref "$tag" 1 || error "Invalid release tag: $tag"
    validate_asset_name "$asset_name" || error "Invalid asset name: $asset_name"

    [[ -z "$target_path" ]] && target_path="${DOWNLOAD_DIR}/${asset_name}"
    local safe_target_path
    safe_target_path=$(resolve_safe_target "$target_path") || exit 1

    log "Downloading release asset: $asset_name"

    # Get download URL from GitHub API
    local api_url="https://api.github.com/repos/${owner}/${repo}/releases/tags/${tag}"
    local download_url
    download_url=$(curl -fsSL -- "$api_url" | grep -o '"browser_download_url": *"[^"]*"' | grep -F -- "/${asset_name}\"" | head -n 1 | sed 's/.*"browser_download_url": *"//;s/"$//')

    if [[ -z "$download_url" || ! "$download_url" =~ ^https:// ]]; then
        error "Release asset not found: $asset_name"
    fi

    mkdir -p "$(dirname "$safe_target_path")"
    if curl -fsSL -- "$download_url" -o "$safe_target_path"; then
        log "Release asset downloaded successfully to: $safe_target_path"
    else
        error "Failed to download release asset"
    fi
}

cmd_archive() {
    local repo_url=$1
    local format=${2:-zip}
    local target_path=$3
    local branch=${4:-main}

    if [[ -z "$repo_url" ]]; then
        echo "Usage: github-download archive <repo_url> [--format zip|tar.gz] [--target <target_path>] [--branch <branch>]"
        exit 1
    fi

    local parsed
    parsed=$(parse_git_url "$repo_url") || error "Invalid repository URL"
    read -r owner repo <<< "$parsed"

    validate_format "$format" || error "Invalid archive format: $format (expected zip or tar.gz)"
    validate_git_ref "$branch" 0 || error "Invalid branch name: $branch"

    local ext="$format"
    [[ -z "$target_path" ]] && target_path="${DOWNLOAD_DIR}/${repo}.${ext}"
    local safe_target_path
    safe_target_path=$(resolve_safe_target "$target_path") || exit 1

    log "Downloading archive from: $repo_url"

    local archive_url="https://github.com/${owner}/${repo}/archive/refs/heads/${branch}.${ext}"

    mkdir -p "$(dirname "$safe_target_path")"
    if curl -fsSL -- "$archive_url" -o "$safe_target_path"; then
        log "Archive downloaded successfully to: $safe_target_path"
    else
        error "Failed to download archive"
    fi
}

cmd_raw() {
    local repo_url=$1
    local file_path=$2
    local branch=${3:-main}

    if [[ -z "$repo_url" || -z "$file_path" ]]; then
        echo "Usage: github-download raw <repo_url> --path <file_path> [--branch <branch>]"
        exit 1
    fi

    local parsed
    parsed=$(parse_git_url "$repo_url") || error "Invalid repository URL"
    read -r owner repo <<< "$parsed"

    validate_repo_file_path "$file_path" || error "Invalid file path: $file_path"
    validate_git_ref "$branch" 0 || error "Invalid branch name: $branch"

    log "Fetching raw content: $file_path"

    local raw_url="https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${file_path}"

    curl -fsSL -- "$raw_url"
}

parse_args() {
    local command=$1
    shift

    case "$command" in
        clone)
            cmd_clone "$@"
            ;;
        file)
            while [[ $# -gt 0 ]]; do
                case "$1" in
                    --path) [[ $# -ge 2 ]] || error "Missing value for --path"; path_arg="$2"; shift 2 ;;
                    --target) [[ $# -ge 2 ]] || error "Missing value for --target"; target_arg="$2"; shift 2 ;;
                    --branch) [[ $# -ge 2 ]] || error "Missing value for --branch"; branch_arg="$2"; shift 2 ;;
                    *) url_arg="$1"; shift ;;
                esac
            done
            cmd_file "${url_arg:-}" "${path_arg:-}" "${target_arg:-}" "${branch_arg:-}"
            ;;
        release)
            while [[ $# -gt 0 ]]; do
                case "$1" in
                    --tag) [[ $# -ge 2 ]] || error "Missing value for --tag"; tag_arg="$2"; shift 2 ;;
                    --asset) [[ $# -ge 2 ]] || error "Missing value for --asset"; asset_arg="$2"; shift 2 ;;
                    --target) [[ $# -ge 2 ]] || error "Missing value for --target"; target_arg="$2"; shift 2 ;;
                    *) url_arg="$1"; shift ;;
                esac
            done
            cmd_release "${url_arg:-}" "${tag_arg:-}" "${asset_arg:-}" "${target_arg:-}"
            ;;
        archive)
            while [[ $# -gt 0 ]]; do
                case "$1" in
                    --format) [[ $# -ge 2 ]] || error "Missing value for --format"; format_arg="$2"; shift 2 ;;
                    --target) [[ $# -ge 2 ]] || error "Missing value for --target"; target_arg="$2"; shift 2 ;;
                    --branch) [[ $# -ge 2 ]] || error "Missing value for --branch"; branch_arg="$2"; shift 2 ;;
                    *) url_arg="$1"; shift ;;
                esac
            done
            cmd_archive "${url_arg:-}" "${format_arg:-zip}" "${target_arg:-}" "${branch_arg:-}"
            ;;
        raw)
            while [[ $# -gt 0 ]]; do
                case "$1" in
                    --path) [[ $# -ge 2 ]] || error "Missing value for --path"; path_arg="$2"; shift 2 ;;
                    --branch) [[ $# -ge 2 ]] || error "Missing value for --branch"; branch_arg="$2"; shift 2 ;;
                    *) url_arg="$1"; shift ;;
                esac
            done
            cmd_raw "${url_arg:-}" "${path_arg:-}" "${branch_arg:-}"
            ;;
        -h|--help)
            usage
            exit 0
            ;;
        -v|--version)
            echo "GitHub Download Skill v${VERSION}"
            exit 0
            ;;
        *)
            echo "Unknown command: $command"
            usage
            exit 1
            ;;
    esac
}

main() {
    if [[ $# -eq 0 ]]; then
        usage
        exit 1
    fi

    local command=$1
    parse_args "$@"
}

main "$@"
