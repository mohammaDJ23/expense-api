#!/usr/bin/env bash

set -euo pipefail

source ./scripts/common/logs.sh

output_version() {
    local version="$1"
    local released="$2"

    if [ -n "${GITHUB_OUTPUT:-}" ]; then
        echo "version=${version}" >> "$GITHUB_OUTPUT"
        echo "released=${released}" >> "$GITHUB_OUTPUT"
    else
        echo "version=${version}"
        echo "released=${released}"
    fi
}

configure_git() {
    GIT_EMAIL="${GIT_EMAIL:-release-bot@users.noreply.github.com}"
    GIT_NAME="${GIT_NAME:-Automated Release Bot}"
    
    log_info "⚙️ Configuring git user as: ${GIT_NAME} <${GIT_EMAIL}>"

    git config --global user.email "${GIT_EMAIL}" &&
    git config --global user.name "${GIT_NAME}"

    return $?
}

check_package_json() {
    if [[ ! -f "package.json" ]]; then
        log_error "❌ ERROR: package.json not found in current directory!"
        log_error "   Current directory: $(pwd)"
        log_error "   Contents:"
        ls -la . || true
        return 1
    fi

    return 0
}

get_previous_version() {
    PREVIOUS_VERSION=$(jq -r '.version' package.json)
    
    local exit_code=$?
    if [ "${exit_code}" -ne 0 ]; then
        return $exit_code
    fi

    log_info "Previous version: ${PREVIOUS_VERSION}"

    return 0
}

run_semantic_dry_run() {
    log_info "🧪 Running semantic-release dry run..."
    
    SEMANTIC_OUTPUT=$(pnpm exec semantic-release --dry-run --ci 2>&1)

    local exit_code=$?
    if [ "${exit_code}" -ne 0 ]; then
        return $exit_code
    fi
    
    log_info "📋 Semantic-release dry run output:"
    log_info "${SEMANTIC_OUTPUT}"

    return 0
}

extract_version() {
    local phrases=(
        "The next release version is"
        "next release version is"
        "would release version"
        "Published release"
        "Cutting release"
        "Creating tag"
    )
    
    NEXT_VERSION=""
    
    for phrase in "${phrases[@]}"; do
        if echo "${SEMANTIC_OUTPUT}" | grep -q "${phrase}"; then
            local line=$(echo "${SEMANTIC_OUTPUT}" | grep "${phrase}" | head -n 1)
            
            if [[ $line =~ ([0-9]+\.[0-9]+\.[0-9]+) ]]; then
                NEXT_VERSION="${BASH_REMATCH[1]}"
                log_success "📝 Found version using phrase: '${phrase}'"
                return 0
            fi
        fi
    done
    
    log_error "❌ Could not determine next version from semantic-release output"

    return 1
}

check_version_change() {
    if [[ "${NEXT_VERSION}" == "${PREVIOUS_VERSION}" ]]; then
        log_info "Version unchanged (${PREVIOUS_VERSION}). No release needed."
        output_version "${PREVIOUS_VERSION}" false
        return 1
    fi
    
    log_success "✅ New version detected: ${PREVIOUS_VERSION} → ${NEXT_VERSION}"

    return 0
}

run_actual_release() {
    log_info "🚀 Starting actual Semantic Release process..."

    pnpm exec semantic-release --ci 2>&1
    
    local exit_code=$?
    if [ "${exit_code}" -ne 0 ]; then
        return $exit_code
    fi

    log_success "✅ Semantic Release successful!"

    return 0
}

main() {
    configure_git &&
    check_package_json &&
    get_previous_version &&
    run_semantic_dry_run &&
    extract_version &&
    check_version_change &&
    run_actual_release &&
    output_version "${NEXT_VERSION}" true

    return $?
}

main

exit $?
