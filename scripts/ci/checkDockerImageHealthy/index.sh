#!/bin/bash

set -euo pipefail

CONTAINER_NAME="${CONTAINER_NAME:-}"
PORT="${PORT:-3000}"
HEALTH_CHECK_TIMER="${HEALTH_CHECK_TIMER:-60}" 
HEALTH_ENDPOINT="${HEALTH_ENDPOINT:-/api/v1/health}"

if [ -z "$CONTAINER_NAME" ]; then
  echo "❌ ERROR: CONTAINER_NAME is not set"
  echo "   Usage: $0"
  echo "   Required env vars:"
  echo "     CONTAINER_NAME - name of container to check"
  exit 1
fi

echo "🔍 Starting health check for container: $CONTAINER_NAME"
echo "   Port: $PORT, Timeout: ${HEALTH_CHECK_TIMER}s, Endpoint: $HEALTH_ENDPOINT"
echo ""

HEALTH_OK=false
CONTAINER_STOPPED=false

for ((i=1; i<=HEALTH_CHECK_TIMER; i++)); do
  echo -ne "⏳ Checking... ${i}/${HEALTH_CHECK_TIMER}s\r"
  
  if ! docker ps --filter "name=${CONTAINER_NAME}" --format "{{.Names}}" | grep -q "^${CONTAINER_NAME}$"; then
    echo ""
    echo "❌ Container '$CONTAINER_NAME' is not running"
    CONTAINER_STOPPED=true
    break
  fi
  
  if docker exec "${CONTAINER_NAME}" sh -c \
      "curl -f -s --max-time 3 http://localhost:${PORT}${HEALTH_ENDPOINT} >/dev/null 2>&1"; then
    echo ""
    echo "✅ Health check passed after ${i}s"
    HEALTH_OK=true
    break
  fi

  sleep 1
done

echo ""

if [ "$HEALTH_OK" = "true" ]; then
  echo "🎉 Health check successful!"
  exit 0
elif [ "$CONTAINER_STOPPED" = "true" ]; then
  echo "❌ Container '$CONTAINER_NAME' stopped or crashed"
  echo ""
  echo "📋 Container logs:"
  docker logs "$CONTAINER_NAME" 2>/dev/null | tail -50 || echo "   (no logs available)"
  exit 1
else
  echo "❌ Health check timed out after ${HEALTH_CHECK_TIMER}s"
  echo ""
  echo "📋 Container status:"
  docker ps --filter "name=${CONTAINER_NAME}" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" || true

  HEALTH_STATUS=$(docker inspect --format='{{.State.Health.Status}}' "$CONTAINER_NAME" 2>/dev/null || echo "no-health-check")
  echo "📋 Docker health status: $HEALTH_STATUS"
  echo ""
  echo "📋 Container logs (last 50 lines):"
  docker logs "$CONTAINER_NAME" 2>/dev/null | tail -50 || echo "   (no logs available)"
  exit 1
fi
