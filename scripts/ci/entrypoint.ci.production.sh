#!/usr/bin/env bash

set -euo pipefail

MODE="ci_production"
COMPOSE_FILE="docker-compose.ci.production.yml"

source ./scripts/common/docker/createImageName.sh
source ./scripts/common/docker/entrypoint.sh
