#!/usr/bin/env bash

set -eu

init_vars() {
    readonly MODE="${INPUT_MODE:-${MODE:-}}"
    readonly ENVIRONMENT="${INPUT_ENVIRONMENT:-${ENVIRONMENT:-}}"
    readonly COMPOSE_FILE="${INPUT_COMPOSE_FILE:-${COMPOSE_FILE:-}}"
    readonly STACK_NAME="${INPUT_STACK_NAME:-${STACK_NAME:-}}"
    readonly SERVICE_NAME="${INPUT_SERVICE_NAME:-${SERVICE_NAME:-}}"
    readonly IMAGE_NAME="${INPUT_IMAGE_NAME:-${IMAGE_NAME:-}}"
    readonly SECRETS="${INPUT_SECRETS:-${SECRETS:-}}"

    export IMAGE_NAME
    export ENVIRONMENT

    return 0
}
