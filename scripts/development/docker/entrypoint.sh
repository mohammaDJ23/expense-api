#!/usr/bin/env bash

set -euo pipefail

MODE="development"
DOCKER_USERNAME="${DOCKER_USERNAME:-docker-username}"
COMPOSE_FILE="docker-compose.${MODE}.yml"

source ./scripts/common/docker/createImageName.sh
source ./scripts/common/docker/entrypoint.sh
