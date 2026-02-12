#!/usr/bin/env bash

set -euo pipefail

init_vars() {
    readonly MODE="${INPUT_MODE:-${MODE:-}}"
    readonly ENVIRONMENT="${INPUT_ENVIRONMENT:-${ENVIRONMENT:-}}"
    readonly COMPOSE_FILE="${INPUT_COMPOSE_FILE:-${COMPOSE_FILE:-}}"
    readonly IMAGE_NAME="${INPUT_IMAGE_NAME:-${IMAGE_NAME:-}}"

    export IMAGE_NAME
    export ENVIRONMENT

    return 0
}
