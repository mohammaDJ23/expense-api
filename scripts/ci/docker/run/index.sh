#!/bin/bash

set -euo pipefail

export COMPOSE_FILE="${COMPOSE_FILE:-docker-compose.swarm.ci.yml}"
export STACK_NAME="${STACK_NAME:-expense-api-ci}"
export IMAGE_NAME="${IMAGE_NAME:-expense-api-ci:latest}"
export SECRETS_DIR="${SECRETS_DIR:-./.ci.secrets}"
export ENVIRONMENT="${ENVIRONMENT:-production}"

source /usr/local/bin/start.sh
