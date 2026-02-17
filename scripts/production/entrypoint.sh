#!/usr/bin/env bash

set -euo pipefail

MODE="production"
COMPOSE_FILE="docker-compose.${MODE}.yml"

source ./scripts/common/docker/createImageName.sh
source ./scripts/common/docker/entrypoint.sh
