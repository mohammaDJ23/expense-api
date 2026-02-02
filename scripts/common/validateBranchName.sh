#!/usr/bin/env bash

set -euo pipefail

source ./scripts/common/logs.sh

BRANCH="${BRANCH:-}"
CONFIG_FILE="${CONFIG_FILE:-.branch.namerc.json}"

check_args() {
    if [ -z "${BRANCH}" ]; then
        log_error "❌ Error: BRANCH environment variable is not set"
        return 1
    fi

    if [ ! -f "${CONFIG_FILE}" ]; then
        log_error "❌ Error: Config file '${CONFIG_FILE}' not found"
        log_error "   Current directory: $(pwd)"
        log_error "   Available files:"
        ls -la . || true
        log_error ""
        log_error "   Either create it or set CONFIG_FILE environment variable"
        return 1
    fi

    if [ "${BRANCH}" = "HEAD" ]; then
        log_warning "Detached HEAD detected (likely tag build)"
        log_warning "   Skipping branch validation"
    fi

    return 0
}

validate_branch() {
    log_info "🔍 Validating branch: ${BRANCH}"

    if ! pnpm exec branch-name-lint "${CONFIG_FILE}" --branch="${BRANCH}" 2>/dev/null; then
        log_error "❌ Branch validation failed!"
        return 1
    fi

    log_success "✅ Branch validation passed!"

    return 0
}

main() {
    log_info "🚀 Starting branch validation..."

    if ! check_args; then
        return $?
    fi

    validate_branch

    return $?
}

main

exit $?
