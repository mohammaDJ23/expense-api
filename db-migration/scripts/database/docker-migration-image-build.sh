#!/usr/bin/env bash

set -euo pipefail

source ./scripts/root-path-resolver.sh
source "$PROJECT_ROOT/scripts/docker/docker-image-build.sh"

build_docker_image --tag "${IMAGE}" --target production .
