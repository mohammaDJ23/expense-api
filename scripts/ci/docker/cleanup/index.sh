#!/usr/bin/env bash

set -euo pipefail

readonly STACK_NAME="${STACK_NAME:?ERROR: STACK_NAME is required}"
TIMEOUT=60

echo "🧹 Cleaning up Swarm stack: $STACK_NAME"

echo "📦 Removing stack..."

if docker stack ls --format "{{.Name}}" | grep -q "^${STACK_NAME}$"; then
  docker stack rm "$STACK_NAME"
else
  echo "ℹ️  Stack '$STACK_NAME' not found"
fi

echo ""
echo "⏳ Waiting for cleanup (max ${TIMEOUT}s)..."
echo "----------------------------------------"

completed=false
for i in $(seq 1 $TIMEOUT); do
  services=$(docker service ls --format "{{.Name}}" 2>/dev/null | grep "^${STACK_NAME}_" || true)
  remaining=$(echo "$services" | grep -c . || echo 0)
  
  if [ "$remaining" -eq 0 ]; then
    echo ""
    echo "✅ All ${i} services removed in ${i}s"
    completed=true
    break
  fi
  
  echo "[${i}s] Remaining: $remaining services"
  
  if [ "$remaining" -le 3 ]; then
    echo "$services" | sed 's/^/   • /'
  elif [ "$remaining" -gt 3 ]; then
    echo "   • $(echo "$services" | head -1)"
    echo "   • ... and $((remaining - 1)) more"
  fi
  
  sleep 1
done

if [ "$completed" = false ] && [ "$remaining" -gt 0 ]; then
  echo ""
  echo "⚠️  Timeout after ${TIMEOUT}s - forcing removal..."
  
  for service in $services; do
    echo "   Removing: $service"
    docker service rm "$service" 2>/dev/null || true
  done
  
  echo "   ✅ Forced removal completed"
fi

echo ""
echo "🔍 Checking for remaining containers..."
containers=$(docker ps -a --filter "label=com.docker.stack.namespace=${STACK_NAME}" --format "{{.Names}}" 2>/dev/null || true)
container_count=$(echo "$containers" | grep -c . || echo 0)

if [ "$container_count" -gt 0 ]; then
  echo "   Removing $container_count containers:"
  echo "$containers" | sed 's/^/   • /'
  echo "$containers" | xargs -r docker rm -f 2>/dev/null || true
  echo "   ✅ Containers removed"
else
  echo "   ✅ No containers left"
fi

echo ""
echo "🎉 Cleanup completed successfully!"
