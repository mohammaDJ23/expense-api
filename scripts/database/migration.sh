#!/usr/bin/env bash

set -euo pipefail

source ./scripts/logs.sh

main() {
    local APP_NAME
    APP_NAME=$(source ./scripts/appName.sh)

    local ENVIRONMENT="${ENVIRONMENT:?ERROR ENVIRONMENT is required as env}"
    local DOCKER_USERNAME="${DOCKER_USERNAME:?ERROR DOCKER_USERNAME is required as env}"

    local TAG="${TAG:?ERROR TAG is required as env}"
    if [[ ! "${TAG}" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
        log_error "ERROR TAG must follow the format X.Y.Z (e.g. 2.234.242)"
        return 1
    fi

    local IMAGE_REPOSITORY="${DOCKER_USERNAME}/${APP_NAME}-${ENVIRONMENT}-db-migration"
    local VERSIONED_IMAGE="${IMAGE_REPOSITORY}:${TAG}"
    local LATEST_IMAGE="${IMAGE_REPOSITORY}:latest"

    log_info "Building image: ${VERSIONED_IMAGE}"
    docker build \
        --target db-migration \
        --tag "${VERSIONED_IMAGE}" \
        .
    log_success "Built: ${VERSIONED_IMAGE}"

    log_info "Pushing image: ${VERSIONED_IMAGE}"
    docker push "${VERSIONED_IMAGE}"
    log_success "Pushed: ${VERSIONED_IMAGE}"

    docker tag "${VERSIONED_IMAGE}" "${LATEST_IMAGE}"

    log_info "Pushing image: ${LATEST_IMAGE}"
    docker push "${LATEST_IMAGE}"
    log_success "Pushed: ${LATEST_IMAGE}"

    if [[ -n "${GITHUB_OUTPUT:-}" ]]; then
        echo "image_name=${VERSIONED_IMAGE}" >> "$GITHUB_OUTPUT"
        log_success "✓ GitHub output set: image-name=${VERSIONED_IMAGE}"
    else
        log_warning "⚠ Missing GITHUB_OUTPUT, skipping output"
    fi
}

main "$@"
