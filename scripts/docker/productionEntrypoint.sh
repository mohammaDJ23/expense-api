#!/usr/bin/env bash

set -euo pipefail

PIPELINE="production"
ENVIRONMENT="production"
COMPOSE_FILE="docker-compose.production.yml"

source ./scripts/docker/createImageName.sh
source ./scripts/docker/entrypoint.sh
