#!/usr/bin/env bash

set -euo pipefail

source ./scripts/logs.sh

detect_branch() {
    local detected_branch=""
    
    if [ -n "${BRANCH:-}" ]; then
        detected_branch="${BRANCH}"
        log_success "✅ Using provided BRANCH env var: ${detected_branch}" >&2

    elif [ -n "${GITHUB_HEAD_REF:-}" ]; then
        detected_branch="${GITHUB_HEAD_REF}"
        log_success "✅ Using GitHub PR branch: ${detected_branch}" >&2
    
    elif [ -n "${GITHUB_REF_NAME:-}" ]; then
        detected_branch="${GITHUB_REF_NAME}"
        log_success "✅ Using GitHub push branch: ${detected_branch}" >&2
    
    else
        if ! git rev-parse --git-dir > /dev/null 2>&1; then
            log_error "⚠️ Not in a git repository" >&2
            return 1
        fi
        
        detected_branch=$(git symbolic-ref -q HEAD 2>/dev/null || git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "")
        
        if [ -n "${detected_branch}" ] && [ "${detected_branch}" != "HEAD" ]; then
            log_success "✅ Using git branch: '${detected_branch}'" >&2
        
        elif [ "${detected_branch}" = "HEAD" ]; then
            log_error "⚠️ Git is in detached HEAD state" >&2
            return 1
        
        else
            log_error "🔍 No branch detected" >&2
            return 1
        fi
    fi
    
    detected_branch="${detected_branch#refs/heads/}"

    echo "${detected_branch}"
}

main() {
    local detected_branch=$(detect_branch)

    if [ -z "${detected_branch}" ]; then
        log_error "❌ Error: Could not detect branch name"
        log_error "   Current directory: $(pwd)"
        log_error "   Is git repo: $(git rev-parse --git-dir 2>/dev/null && echo "yes" || echo "no")"
        return 1
    fi

    echo "The branch name: ${detected_branch}"

    if [ -n "${GITHUB_OUTPUT:-}" ]; then
        echo "branch=${detected_branch}" >> "$GITHUB_OUTPUT"
    else
        log_warning "⚠️ GITHUB_OUTPUT is not defined"
    fi

    return 0
}

main

exit $?
