#!/bin/bash

set -euxo pipefail

echo "🐳 Docker info:"
docker version || true
echo ""

IMAGE_NAME="${IMAGE_NAME:?ERROR: IMAGE_NAME is required}"

echo "📦 Checking image: $IMAGE_NAME"

if ! docker image inspect "$IMAGE_NAME" &>/dev/null; then
  echo "❌ ERROR: Image '$IMAGE_NAME' not found"
  echo "   Available images:"
  docker images --format "table {{.Repository}}\t{{.Tag}}\t{{.ID}}\t{{.CreatedAt}}" | head -20
  exit 1
fi

echo "✅ Found image: $IMAGE_NAME"

echo "🔐 Checking Docker registry login..."
if ! docker system info | grep -q "Username:"; then
  echo "⚠️  Warning: Not logged in to Docker registry"
  echo "   Make sure to set DOCKERHUB_USERNAME and DOCKERHUB_TOKEN environment variables"
fi

echo "📤 Pushing to registry..."
echo "Image: $IMAGE_NAME"

MAX_RETRIES=3
RETRY_DELAY=10

for i in $(seq 1 $MAX_RETRIES); do
  echo "Attempt $i/$MAX_RETRIES..."
  
  if docker push "$IMAGE_NAME"; then
    echo "✅ Successfully pushed: $IMAGE_NAME"
    echo "🎉 The image published!"
    
    echo "🔍 Verifying push..."
    docker pull "$IMAGE_NAME" 2>/dev/null && echo "✅ Verified: Image can be pulled" || echo "⚠️  Could not verify pull"
    
    exit 0
  else
    if [ $i -lt $MAX_RETRIES ]; then
      echo "⚠️  Push failed, retrying in ${RETRY_DELAY}s..."
      sleep $RETRY_DELAY
    else
      echo "❌ Failed to push image after $MAX_RETRIES attempts"
      exit 1
    fi
  fi
done
