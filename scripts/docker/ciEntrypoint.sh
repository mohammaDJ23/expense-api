#!/usr/bin/env bash

set -euo pipefail

PIPELINE="ci"
ENVIRONMENT="production"
COMPOSE_FILE="docker-compose.ci.yml"

source ./scripts/docker/createImageName.sh
source ./scripts/docker/setImageNameOutput.sh
source ./scripts/docker/entrypoint.sh
