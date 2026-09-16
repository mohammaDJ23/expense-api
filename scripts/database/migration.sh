#!/usr/bin/env bash

set -euo pipefail

source ./scripts/validateDockerImageTag.sh

TAG="${TAG:?ERROR TAG is required as env}"

validate_docker_image_tag "${TAG}"

IMAGE="mohammadnowresideh1997/expense-api-production-db-migration"

VERSIONED_IMAGE="${IMAGE}:${TAG}"
LATEST_IMAGE="${IMAGE}:latest"

echo "Building image: ${VERSIONED_IMAGE}"
docker build \
    --target db-migration \
    --tag "${VERSIONED_IMAGE}" \
    .
echo "Built: ${VERSIONED_IMAGE}"

echo "Pushing image: ${VERSIONED_IMAGE}"
docker push "${VERSIONED_IMAGE}"
echo "Pushed: ${VERSIONED_IMAGE}"

docker tag "${VERSIONED_IMAGE}" "${LATEST_IMAGE}"

echo "Pushing image: ${LATEST_IMAGE}"
docker push "${LATEST_IMAGE}"
echo "Pushed: ${LATEST_IMAGE}"

if [[ -n "${GITHUB_OUTPUT:-}" ]]; then
    echo "image=${IMAGE}" >> "$GITHUB_OUTPUT"
    echo "versioned_image=${VERSIONED_IMAGE}" >> "$GITHUB_OUTPUT"
    echo "latest_image=${LATEST_IMAGE}" >> "$GITHUB_OUTPUT"

    echo "✓ GitHub output set: image=${IMAGE}"
    echo "✓ GitHub output set: versioned_image=${VERSIONED_IMAGE}"
    echo "✓ GitHub output set: latest_image=${LATEST_IMAGE}"
fi
