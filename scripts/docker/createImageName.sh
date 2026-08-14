#!/usr/bin/env bash

set -euo pipefail

source ./scripts/logs.sh

create_image_name() {
    local APP_NAME=$(source ./scripts/appName.sh)

    log_info "Create the image name..." >&2

    local ENVIRONMENT="${ENVIRONMENT:?ERROR ENVIRONMENT is required as env}"
    local DOCKER_USERNAME="${DOCKER_USERNAME:?ERROR DOCKER_USERNAME is required as env}"
    local TAG="${TAG:-latest}"
    
    local IMAGE_NAME="${DOCKER_USERNAME}/${APP_NAME}-${ENVIRONMENT}:${TAG}"

    log_success "The image name create: ${IMAGE_NAME}" >&2

    echo "${IMAGE_NAME}"
}

IMAGE_NAME=$(create_image_name)

export IMAGE_NAME
