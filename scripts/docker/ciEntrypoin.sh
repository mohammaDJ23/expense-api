#!/usr/bin/env bash

set -euo pipefail

PIPELINE="ci"
ENVIRONMENT="production"
COMPOSE_FILE="docker-compose.ci.yml"

source ./script/docker/createImageName.sh
source ./script/docker/setImageNameOutput.sh
source ./script/docker/entrypoint.sh
