#!/usr/bin/env bash

set -euo pipefail

MODE="ci_production"
COMPOSE_FILE="docker-compose.ci.yml"

source ./scripts/common/docker/createImageName.sh
source ./scrits/common/docker/setImageNameOutput.sh
source ./scripts/common/docker/entrypoint.sh
