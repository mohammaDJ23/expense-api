#!/usr/bin/env bash

set -euo pipefail

PIPELINE="ci"
ENVIRONMENT="production"
COMPOSE_FILE="docker-compose.ci.yml"

source ./scripts/common/docker/createImageName.sh
source ./scripts/common/docker/setImageNameOutput.sh
source ./scripts/common/docker/entrypoint.sh
