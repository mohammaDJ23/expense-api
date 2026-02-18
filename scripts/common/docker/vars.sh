#!/usr/bin/env bash

set -euo pipefail

init_vars() {
    readonly PIPELINE="${INPUT_PIPELINE:-${PIPELINE:-}}"
    readonly COMPOSE_FILE="${INPUT_COMPOSE_FILE:-${COMPOSE_FILE:-}}"
    readonly IMAGE_NAME="${INPUT_IMAGE_NAME:-${IMAGE_NAME:-}}"

    export IMAGE_NAME

    return 0
}
