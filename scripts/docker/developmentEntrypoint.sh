#!/usr/bin/env bash

set -euo pipefail

PIPELINE="development"
ENVIRONMENT="development"
DOCKER_USERNAME="${DOCKER_USERNAME:-docker-username}"
COMPOSE_FILE="docker-compose.development.yml"

source ./scripts/docker/createImageName.sh
source ./scripts/docker/entrypoint.sh
