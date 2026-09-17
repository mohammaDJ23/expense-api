#!/usr/bin/env bash

set -euo pipefail

source ./scripts/docker/buildDockerImage.sh

build_docker_image "${IMAGE}" --target db-migration .
