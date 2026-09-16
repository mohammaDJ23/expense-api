#!/usr/bin/env bash

set -euo pipefail

source ./scripts/validateDockerImageTag.sh

TAG="${TAG:?ERROR TAG is required as env}"

validate_docker_image_tag "${TAG}"

IMAGE="mohammadnowresideh1997/expense-api-production"

VERSIONED_IMAGE="${IMAGE}:${TAG}"
LATEST_IMAGE="${IMAGE}:latest"

if [[ -n "${GITHUB_OUTPUT:-}" ]]; then
    echo "image=${IMAGE}" >> "$GITHUB_OUTPUT"
    echo "versioned_image=${VERSIONED_IMAGE}" >> "$GITHUB_OUTPUT"
    echo "latest_image=${LATEST_IMAGE}" >> "$GITHUB_OUTPUT"

    echo "✓ GitHub output set: image=${IMAGE}"
    echo "✓ GitHub output set: versioned_image=${VERSIONED_IMAGE}"
    echo "✓ GitHub output set: latest_image=${LATEST_IMAGE}"
fi
