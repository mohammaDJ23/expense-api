#!/bin/bash

set -euo pipefail

export COMPOSE_FILE="${COMPOSE_FILE:-docker-compose.swarm.development.yml}"
export STACK_NAME="${STACK_NAME:-expense-api-development}"
export SERVICE_NAME="${SERVICE_NAME:-expense-api-development_expense-api}"
export IMAGE_NAME="${IMAGE_NAME:-expense-api-development:latest}"
export SECRETS_DIR="${SECRETS_DIR:-./secrets}"
export WATCH_MODE="${WATCH_MODE:-true}"
export ENVIRONMENT="${ENVIRONMENT:-development}"

source ./scripts/common/startDockerSwarm.sh
