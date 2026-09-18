#!/usr/bin/env bash

set -euo pipefail

build_docker_image() {
    local -r image="${IMAGE:?ERROR IMAGE must be provided as the first arg}"

    echo "Building image: ${image}"

    docker build "$@"

    echo "Built: ${image}"
}
