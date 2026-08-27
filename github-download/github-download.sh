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

parse_git_url() {
    local url=$1
    local owner repo

    # Handle git@ URLs
    if [[ "$url" == git@* ]]; then
        url=$(echo "$url" | sed 's/:/\//g' | sed 's/.*git@//')
    fi

    # Extract owner/repo from URLs like https://github.com/owner/repo
    if [[ "$url" =~ github\.com/([^/]+)/([^/]+) ]]; then
        owner="${BASH_REMATCH[1]}"
        repo="${BASH_REMATCH[2]}"
        # Remove .git suffix if present
        repo="${repo%.git}"
    else
        return 1
    fi

    echo "$owner $repo"
}

cmd_clone() {
    local repo_url=$1
    local target_dir=$2
    local branch=${3:-}

    if [[ -z "$repo_url" ]]; then
        echo "Usage: github-download clone <repo_url> [target_dir] [branch]"
        exit 1
    fi

    log "Cloning repository: $repo_url"

    local clone_cmd="git clone"
    [[ -n "$branch" ]] && clone_cmd="$clone_cmd --branch $branch"

    if [[ -z "$target_dir" ]]; then
        clone_cmd="$clone_cmd $repo_url"
    else
        clone_cmd="$clone_cmd $repo_url $target_dir"
    fi

    mkdir -p "$DOWNLOAD_DIR"
    cd "$DOWNLOAD_DIR"

    eval "$clone_cmd"

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

    log "Downloading file: $file_path from $repo_url"

    local parsed
    parsed=$(parse_git_url "$repo_url") || error "Invalid repository URL"
    read -r owner repo <<< "$parsed"

    local raw_url="https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${file_path}"

    mkdir -p "$(dirname "$target_path")"
    curl -sL "$raw_url" -o "$target_path"

    if [[ $? -eq 0 ]]; then
        log "File downloaded successfully to: $target_path"
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

    log "Downloading release asset: $asset_name"

    local parsed
    parsed=$(parse_git_url "$repo_url") || error "Invalid repository URL"
    read -r owner repo <<< "$parsed"

    # Get download URL from GitHub API
    local api_url="https://api.github.com/repos/${owner}/${repo}/releases/tags/${tag}"
    local download_url
    download_url=$(curl -sL "$api_url" | grep -o "\"browser_download_url\": *\"[^\"]*\"" | grep "$asset_name" | sed 's/.*"browser_download_url": "//;s/"//')

    if [[ -z "$download_url" ]]; then
        error "Release asset not found: $asset_name"
    fi

    [[ -z "$target_path" ]] && target_path="${DOWNLOAD_DIR}/${asset_name}"

    mkdir -p "$(dirname "$target_path")"
    curl -sL "$download_url" -o "$target_path"

    if [[ $? -eq 0 ]]; then
        log "Release asset downloaded successfully to: $target_path"
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

    log "Downloading archive from: $repo_url"

    local parsed
    parsed=$(parse_git_url "$repo_url") || error "Invalid repository URL"
    read -r owner repo <<< "$parsed"

    # Determine file extension
    local ext="$format"
    [[ "$format" == "tar.gz" ]] && ext="tar.gz"

    [[ -z "$target_path" ]] && target_path="${DOWNLOAD_DIR}/${repo}.${ext}"

    local archive_url="https://github.com/${owner}/${repo}/archive/refs/heads/${branch}.${ext}"

    mkdir -p "$(dirname "$target_path")"
    curl -sL "$archive_url" -o "$target_path"

    if [[ $? -eq 0 ]]; then
        log "Archive downloaded successfully to: $target_path"
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

    log "Fetching raw content: $file_path"

    local parsed
    parsed=$(parse_git_url "$repo_url") || error "Invalid repository URL"
    read -r owner repo <<< "$parsed"

    local raw_url="https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${file_path}"

    curl -sL "$raw_url"
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
                    --path) path_arg="$2"; shift 2 ;;
                    --target) target_arg="$2"; shift 2 ;;
                    --branch) branch_arg="$2"; shift 2 ;;
                    *) url_arg="$1"; shift ;;
                esac
            done
            cmd_file "${url_arg:-}" "${path_arg:-}" "${target_arg:-}" "${branch_arg:-}"
            ;;
        release)
            while [[ $# -gt 0 ]]; do
                case "$1" in
                    --tag) tag_arg="$2"; shift 2 ;;
                    --asset) asset_arg="$2"; shift 2 ;;
                    --target) target_arg="$2"; shift 2 ;;
                    *) url_arg="$1"; shift ;;
                esac
            done
            cmd_release "${url_arg:-}" "${tag_arg:-}" "${asset_arg:-}" "${target_arg:-}"
            ;;
        archive)
            while [[ $# -gt 0 ]]; do
                case "$1" in
                    --format) format_arg="$2"; shift 2 ;;
                    --target) target_arg="$2"; shift 2 ;;
                    --branch) branch_arg="$2"; shift 2 ;;
                    *) url_arg="$1"; shift ;;
                esac
            done
            cmd_archive "${url_arg:-}" "${format_arg:-zip}" "${target_arg:-}" "${branch_arg:-}"
            ;;
        raw)
            while [[ $# -gt 0 ]]; do
                case "$1" in
                    --path) path_arg="$2"; shift 2 ;;
                    --branch) branch_arg="$2"; shift 2 ;;
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
