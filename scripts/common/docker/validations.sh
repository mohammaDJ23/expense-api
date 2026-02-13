#!/usr/bin/env bash

set -euo pipefail

check_args() {
    local environment_pattern='^(development|production)$'
    if [[ ! "${ENVIRONMENT}" =~ $environment_pattern ]]; then
        log_error "Invalid ENVIRONMENT value: '${ENVIRONMENT}'"
        log_error "Valid values: development or production"
        return 1
    fi
    
    local mode_pattern='^(development|ci|ci_production|production)$'
    if [[ ! "${MODE}" =~ $mode_pattern ]]; then
        log_error "Invalid MODE value: '${MODE}'"
        log_error "Valid values: development, ci, ci_production or production"
        return 1
    fi

    if  [[ ! -f "${COMPOSE_FILE}" ]]; then
        log_error "No docker compose file found"
        log_error "     ${COMPOSE_FILE}"
        return 1
    fi

    local image_name_pattern='^[a-z0-9_-]+/[a-z0-9-]+(:[a-zA-Z0-9._-]+)?$'
    if [[ ! "${IMAGE_NAME}" =~ $image_name_pattern ]]; then
        log_error "Invalid Docker image name: ${IMAGE_NAME}"
        return 1
    fi
  
  return 0
}
