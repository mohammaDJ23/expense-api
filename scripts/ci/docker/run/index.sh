#!/bin/bash

set -euo pipefail

export COMPOSE_FILE="${COMPOSE_FILE}"
export STACK_NAME="${STACK_NAME}"
export IMAGE_NAME="${IMAGE_NAME}"
export SECRETS_DIR="${SECRETS_DIR}"
export ENVIRONMENT="${ENVIRONMENT}"

source /usr/local/bin/start.sh
