#!/usr/bin/env bash

set -euo pipefail

init_vars() {
    readonly MODE="${INPUT_MODE:-${MODE:-}}"
    readonly COMPOSE_FILE="${INPUT_COMPOSE_FILE:-${COMPOSE_FILE:-}}"
    readonly IMAGE_NAME="${INPUT_IMAGE_NAME:-${IMAGE_NAME:-}}"
    LATEST_IMAGE=""

    export IMAGE_NAME

    return 0
}
