#!/usr/bin/env bash

set -euo pipefail

TAG="${TAG:?ERROR TAG is required as env}"

if [[ ! "${TAG}" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    echo "ERROR TAG must follow the format X.Y.Z (e.g. 2.234.242)"
    exit 1
fi

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
    echo "image_name=${VERSIONED_IMAGE}" >> "$GITHUB_OUTPUT"
    echo "✓ GitHub output set: image_name=${VERSIONED_IMAGE}"
else
    echo "⚠ Missing GITHUB_OUTPUT, skipping output"
fi
