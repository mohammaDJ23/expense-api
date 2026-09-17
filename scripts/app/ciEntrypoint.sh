#!/usr/bin/env bash

set -euo pipefail

source ./scripts/dockerComposeCommand.sh

docker_compose \
    -f docker-compose.production.yml \ 
    -f docker-compose.ci.yml \
    up \
    --build \
    -d \
    --wait \
    --wait-timeout 240
