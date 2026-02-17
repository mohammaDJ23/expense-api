#!/usr/bin/env bash

set -euo pipefail

APP_NAME=$(source ./scripts/common/appName.sh)

MODE="${MODE:-ci}"
DOCKER_USERNAME="${DOCKER_USERNAME:-docker-username}"
TAG="${TAG:-latest}"
COMPOSE_FILE="docker-compose.${MODE}.yml"
export IMAGE_NAME="${DOCKER_USERNAME}/${APP_NAME}-${MODE}:${TAG}"

source ./scripts/common/docker/entrypoint.sh
