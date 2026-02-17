#!/usr/bin/env bash

set -euo pipefail

APP_NAME=$(source ./scripts/common/appName.sh)

MODE="${MODE:-ci_production}"
DOCKER_USERNAME="${DOCKER_USERNAME:?ERROR DOCKER_USERNAME is required as an env}"
TAG="${TAG:-latest}"
COMPOSE_FILE="docker-compose.ci.production.yml"
export IMAGE_NAME="${DOCKER_USERNAME}/${APP_NAME}-${MODE}:${TAG}"

source ./scripts/common/docker/entrypoint.sh
