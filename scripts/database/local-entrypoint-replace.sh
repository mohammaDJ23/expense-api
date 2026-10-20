#!/usr/bin/env bash

set -euo pipefail

source ./scripts/docker/docker-compose-command.sh

docker_compose -f docker-compose.postgresql.replace.yml up -d
