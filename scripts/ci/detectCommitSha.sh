#!/usr/bin/env bash

set -euo pipefail

source ./scripts/common/logs.sh

detect_commit_sh() {
    log_info "Getting commit_sha..." >&2

    if ! git rev-parse --git-dir >/dev/null 2>&1; then
        log_error "❌ ERROR: Not in a git repository!"
        log_error "   Current directory: $(pwd)"
        return 1
    fi

    local commit_sha=$(git rev-parse HEAD || echo "")

    if [ -z "${commit_sha}" ]; then
        log_error "❌ ERROR: Could not get commit SHA!"
        return 1
    fi

    log_success "✅ The commit_sha is ${commit_sha}." >&2

    echo "${commit_sha}"
}

main() {
    local commit_sha=$(detect_commit_sh)

    if [ -z "${commit_sha}" ]; then
        return 1
    fi

    echo "The commit sha: ${commit_sha}"

    if [ -n "${GITHUB_OUTPUT:-}" ]; then
        echo "commit_sha=${commit_sha}" >> "$GITHUB_OUTPUT"
    else
        log_warning "⚠️ GITHUB_OUTPUT is not defined"
    fi

    return 0
}

main

exit $?
