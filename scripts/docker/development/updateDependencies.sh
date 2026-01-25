#!/bin/bash

set -eu

CONTAINER_NAME="expense-api-development"
MAX_RETRIES=60
RETRY_DELAY=1

if ! docker ps | grep -q $CONTAINER_NAME; then
  echo "❌ Container '$CONTAINER_NAME' is not running."
  exit 1
fi

echo "🔄 Updating dependencies..."

echo "📦 Installing dependencies..."
docker exec --user root $CONTAINER_NAME npm install

echo "🚀 Restarting container..."
docker-compose -f docker-compose.development.yml down
docker-compose -f docker-compose.development.yml up -d --watch

echo "⏳ Waiting for container to restart..."
CONTAINER_STARTED=false

for ((i=1; i<=MAX_RETRIES; i++)); do
  if docker ps --filter "name=$CONTAINER_NAME" --filter "status=running" | grep -q $CONTAINER_NAME; then
    CONTAINER_HEALTH=$(docker inspect --format='{{.State.Health.Status}}' "$CONTAINER_NAME")
    
    if [[ $? -ne 0 ]]; then
      echo "❌ ERROR: Failed to inspect container '$CONTAINER_NAME'"
      exit 1
    fi

    if [[ -z "$CONTAINER_HEALTH" ]]; then
      CONTAINER_HEALTH="no-health-check"
    fi

    if [[ "$CONTAINER_HEALTH" == "healthy" ]] || [[ "$CONTAINER_HEALTH" == "no-health-check" ]]; then
      echo "✅ Container '$CONTAINER_NAME' is running and healthy"
      CONTAINER_STARTED=true
      break
    else
      echo "⚠️  Container is running but health check: $CONTAINER_HEALTH ($i/$MAX_RETRIES)"
    fi
  else
    echo "  ...still waiting for container to start ($i/$MAX_RETRIES)"
  fi
  
  sleep $RETRY_DELAY
done

if [ "$CONTAINER_STARTED" = false ]; then
  echo "❌ ERROR: Container '$CONTAINER_NAME' failed to start or it's unhealthy within $MAX_RETRIES seconds"
  
  echo ""
  echo "📋 Last 50 lines of container logs:"
  docker logs --tail 50 "$CONTAINER_NAME" 2>/dev/null || echo "Could not retrieve logs"
  
  echo ""
  echo "📋 Container status:"
  docker ps -a --filter "name=$CONTAINER_NAME" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}\t{{.State}}"
  
  exit 1
fi

echo "⏳ Waiting for application to initialize..."
sleep 3

echo "📋 Container status:"
docker ps --filter "name=$CONTAINER_NAME" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

echo "✅ Done! Container restarted with updated dependencies."
