#!/bin/bash

set -euxo pipefail

IMAGE_NAME="${IMAGE_NAME:-${1:-}}"

if [ -z "$IMAGE_NAME" ]; then
  echo "❌ ERROR: IMAGE_NAME is not set"
  echo "   Usage: $0 <image-name>"
  echo "   Or set IMAGE_NAME environment variable"
  exit 1
fi

echo "📦 Checking image: $IMAGE_NAME"

if ! docker image inspect "$IMAGE_NAME" &>/dev/null; then
  echo "❌ ERROR: Image '$IMAGE_NAME' not found"
  echo "   Available images:"
  docker images | head -10
  exit 1
fi

echo "✅ Found image: $IMAGE_NAME"

echo "📤 Pushing to DockerHub..."
echo "Image: $IMAGE_NAME"

if docker push "$IMAGE_NAME"; then
  echo "✅ Successfully pushed: $IMAGE_NAME"
  echo "🎉 The image published!"
else
  echo "❌ Failed to push image"
  exit 1
fi
