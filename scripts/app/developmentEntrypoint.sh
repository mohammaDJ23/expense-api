#!/usr/bin/env bash

set -euo pipefail

source ./scripts/dockerComposeCommand.sh

docker_compose \
    -f docker-compose.development.yml \
    up \
    --build \
    -d \
    --wait \
    --wait-timeout 240
