#!/usr/bin/env bash

set -euo pipefail

source ./scripts/docker/docker-image-build.sh

build_docker_image --tag "${IMAGE}" --target db-migration .
