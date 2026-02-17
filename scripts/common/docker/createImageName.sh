#!/usr/bin/env bash

set -euo pipefail

source ./scripts/common/logs.sh

create_image_name() {
    local APP_NAME=$(source ./scripts/common/appName.sh)

    local ENVIRONMENT="${ENVIRONMENT:?ERROR ENVIRONMENT is required as env}"
    local DOCKER_USERNAME="${DOCKER_USERNAME:?ERROR DOCKER_USERNAME is required as env}"
    local TAG="${TAG:-latest}"
    
    echo "${DOCKER_USERNAME}/${APP_NAME}-${ENVIRONMENT}:${TAG}"
}

IMAGE_NAME=$(create_image_name)

export IMAGE_NAME
