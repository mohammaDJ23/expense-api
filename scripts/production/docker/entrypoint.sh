#!/usr/bin/env bash

set -euo pipefail

PIPELINE="production"
ENVIRONMENT="production"
COMPOSE_FILE="docker-compose.production.yml"

source ./scripts/common/docker/createImageName.sh
source ./scripts/common/docker/entrypoint.sh
