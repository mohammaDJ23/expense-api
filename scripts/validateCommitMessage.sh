#!/usr/bin/env bash

set -euo pipefail

source ./scripts/logs.sh

COMMIT_MSG_FILE="${1:-}"
CONFIG_FILE="${CONFIG_FILE:-commitlint.config.js}"

check_args() {
    if [ -z "${COMMIT_MSG_FILE}" ]; then
        log_error "❌ Error: No commit message file provided"
        log_error "   Usage: $0 <commit-msg-file>"
        return 1
    fi

    if [ ! -f "${CONFIG_FILE}" ]; then
        log_error "❌ Error: Commitlint config file not found: ${CONFIG_FILE}"
        log_error "   Please create: ${CONFIG_FILE}"
        return 1
    fi

    if [ ! -f "${COMMIT_MSG_FILE}" ]; then
        log_error "❌ Error: Commit message file not found: ${COMMIT_MSG_FILE}"
        return 1
    fi

    return 0
}

validate_commit() {
    log_info "📄 Validating: ${COMMIT_MSG_FILE}"
    log_info "⚙️  Using config: ${CONFIG_FILE}"

    if ! pnpm exec commitlint --edit "${COMMIT_MSG_FILE}" 2>&1; then
        log_error "Failed to validate the commit message"
        return 1
    fi

    log_success "✅ Commit message validation passed!"

    return 0
}

main() {
    log_info "🚀 Starting commit message validation..."

    if ! check_args; then
        return $?
    fi

    validate_commit

    return $?
}

main

exit $?
