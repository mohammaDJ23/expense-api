#!/usr/bin/env bash

set -euo pipefail

MODE="production"
ENVIRONMENT="production"
COMPOSE_FILE="docker-compose.${ENVIRONMENT}.yml"

source ./scripts/common/docker/createImageName.sh
source ./scripts/common/docker/entrypoint.sh
