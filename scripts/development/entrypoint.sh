#!/usr/bin/env bash

set -euo pipefail

APP_NAME=$(source ./scripts/common/appName.sh)

export MODE="development"
export COMPOSE_FILE="docker-compose.${MODE}.yml"
export IMAGE_NAME="docker-username/${APP_NAME}-${MODE}:latest"

source ./scripts/common/docker/entrypoint.sh
