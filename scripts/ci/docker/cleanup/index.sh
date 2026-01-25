#!/bin/bash

set -euo pipefail

STACK_NAME="${STACK_NAME:-app}"
TIMEOUT=30 

echo "🧹 Cleaning up Docker Swarm resources..."

if docker stack ls --format "{{.Name}}" | grep -q "^${STACK_NAME}$"; then
  echo "Removing stack: $STACK_NAME"
  
  docker stack rm -v "$STACK_NAME"
  
  for i in $(seq 1 $TIMEOUT); do
    if ! docker stack ls --format "{{.Name}}" | grep -q "^${STACK_NAME}$"; then
      echo "✅ Stack removed after ${i}s"
      break
    fi
    
    if [ $i -eq $TIMEOUT ]; then
      echo "⚠️  Timeout removing stack"
      docker service ls --format "{{.Name}}" | grep "^${STACK_NAME}_" | \
        xargs -r docker service rm 2>/dev/null || true
    fi
    
    sleep 1
  done
fi

echo "Removing secrets..."
for secret in "database_password" "redis_password" "jwt_secret"; do
  docker secret rm "$secret" 2>/dev/null && echo "✅ $secret" || true
done

echo "✅ Cleanup complete!"
