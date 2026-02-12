#!/usr/bin/env bash

set -euo pipefail

APP_NAME=$(source ./scripts/common/appName.sh)

export MODE="development"
export ENVIRONMENT="development"
export ENV_FILE=".env"
export COMPOSE_FILE="docker-compose.${ENVIRONMENT}.yml"
export IMAGE_NAME="docker-username/${APP_NAME}-${ENVIRONMENT}:latest"

source ./scripts/common/docker/entrypoint.sh
