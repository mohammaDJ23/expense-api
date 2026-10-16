#!/usr/bin/env bash

set -euo pipefail

source ./scripts/docker/dockerComposeCommand.sh

docker_compose -f docker-compose.postgresql.restore.yml up -d
