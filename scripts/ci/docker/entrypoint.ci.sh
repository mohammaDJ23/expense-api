#!/usr/bin/env bash

set -euo pipefail

MODE="ci"
COMPOSE_FILE="docker-compose.${MODE}.yml"

source ./scripts/common/docker/createImageName.sh
source ./scrits/common/docker/setImageNameOutput.sh
source ./scripts/common/docker/entrypoint.sh
