#!/usr/bin/env bash

set -euo pipefail

validate_docker_image_tag() {
    local tag="$1"

    if [[ ! "${tag}" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
        echo "ERROR: TAG must follow the format X.Y.Z (e.g. 2.234.242)"
        exit 1
    fi
}