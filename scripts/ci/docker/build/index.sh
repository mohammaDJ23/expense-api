#!/usr/bin/env bash

set -euo pipefail

readonly IMAGE_NAME="${IMAGE_NAME:?ERROR IMAGE_NAME is required}"
readonly TAG="${TAG:?ERROR TAG is required}"
readonly ENVIRONMENT="${ENVIRONMENT:-production}"
readonly DOCKERFILE="${DOCKERFILE:-Dockerfile}"
readonly BUILD_CONTEXT="${BUILD_CONTEXT:-.}"

IMAGE_TAG="${IMAGE_NAME}:${TAG}"
IMAGE_LATEST="${IMAGE_NAME}:latest"

if [[ ! -f "${DOCKERFILE}" ]] && [[ "${DOCKERFILE}" == "Dockerfile" ]]; then
  echo "❌ ERROR: Dockerfile not found at ${DOCKERFILE}"
  exit 1
fi

if [[ ! -d "${BUILD_CONTEXT}" ]] && [[ ! -f "${BUILD_CONTEXT}" ]]; then
  echo "❌ ERROR: Build context '${BUILD_CONTEXT}' not found"
  exit 1
fi

echo ""
echo "ℹ️ Building the image..."
echo "    ${IMAGE_TAG}"
echo "    ${IMAGE_LATEST}"
echo ""

if ! docker build \
  --target "${ENVIRONMENT}" \
  --file "${DOCKERFILE}" \
  --tag "${IMAGE_TAG}" \
  --tag "${IMAGE_LATEST}" \
  "$BUILD_CONTEXT"; then

  echo ""
  echo "❌ Failed to build the image:"
  echo "    ${IMAGE_TAG}"
  echo "    ${IMAGE_LATEST}"
  echo ""

  exit 1
fi

echo ""
echo "✅ Build was successfull:"
echo "    ${IMAGE_TAG}"
echo "    ${IMAGE_LATEST}"
echo ""

echo "📦 Image details:"
docker images "${IMAGE_NAME}" | tail -n +2 | while read -r line; do
  echo "    ${line}"
done

if [ -n "${GITHUB_OUTPUT:-}" ]; then
  echo "IMAGE_TAG=$IMAGE_TAG" >> $GITHUB_OUTPUT
  echo "IMAGE_LATEST=$IMAGE_LATEST" >> $GITHUB_OUTPUT
else
  echo "WARNING: GITHUB_OUTPUT not set. Step outputs won't be available."
fi

exit 0
