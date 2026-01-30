#!/usr/bin/env bash

set -euo pipefail

readonly SERVICE_NAME="${SERVICE_NAME:?ERROR: SERVICE_NAME is required}"
readonly HEALTH_ENDPOINT="${HEALTH_ENDPOINT:-/api/v1/health}"
readonly PORT="${PORT:-3000}"
readonly TIMEOUT=120

echo "🔍 Health check: $SERVICE_NAME"
echo "   Endpoint: http://localhost:${PORT}${HEALTH_ENDPOINT}"
echo "   Timeout: ${TIMEOUT}s"
echo ""

if ! docker service ls --filter "name=${SERVICE_NAME}" --quiet >/dev/null 2>&1; then
  echo "❌ Service '$SERVICE_NAME' not found"
  exit 1
fi

show_service_tasks() {
  docker service ps "$SERVICE_NAME" \
    --format "table {{.ID}}\t{{.Name}}\t{{.Image}}\t{{.Ports}}\t{{.CurrentState}}\t{{.Node}}\t{{.Error}}" \
    --no-trunc
}

echo "📊 Initial status:"
show_service_tasks

for i in $(seq 1 $TIMEOUT); do  
  replicas=$(docker service inspect "$SERVICE_NAME" \
    --format '{{.Spec.Mode.Replicated.Replicas}}' 2>/dev/null || echo "0")
  
  if [ "$replicas" -eq 0 ]; then
    echo ""
    echo "❌ Service has 0 replicas"
    exit 1
  fi
  
  tasks=$(docker service ps "$SERVICE_NAME" \
    --format '{{.ID}} {{.CurrentState}}')
  
  running=$(echo "$tasks" | grep -c "Running" || echo "0")
  remaining=$((replicas - running))
  
  if [ "$running" -eq "$replicas" ]; then
    echo "[${i}s/${TIMEOUT}s] ✅ All replicas running: ${running}/${replicas}"
    
    all_healthy=true
    healthy_count=0
    last_failed_container=""
     
    for task in $(echo "$tasks" | grep "Running" | awk '{print $1}'); do
      container_id=$(docker inspect "$task" \
        --format '{{.Status.ContainerStatus.ContainerID}}' 2>/dev/null)
      container_id="${container_id#docker://}"
      
      if [ -z "$container_id" ]; then
        all_healthy=false
        last_failed_container="Task $task: No container ID"
        continue
      fi
      
      if docker exec "$container_id" curl \
          -sf \
          --max-time 3 "http://localhost:${PORT}${HEALTH_ENDPOINT}" >/dev/null 2>&1; then
        healthy_count=$((healthy_count + 1))
      else
        all_healthy=false
        last_failed_container="${container_id}"
      fi
    done
    
    if [ "$all_healthy" = true ]; then
      echo "[${i}s/${TIMEOUT}s] ✅ SUCCESS: All $replicas replicas are healthy!"
      exit 0
    else
      echo "[${i}s/${TIMEOUT}s] ⚠️  Health: ${healthy_count}/${replicas} healthy"
    fi
  else
    echo "[${i}s/${TIMEOUT}s] ⏳ Waiting: ${running}/${replicas} running (${remaining} remaining)"
  fi
  
  sleep 1
done

echo ""
echo "[${TIMEOUT}s/${TIMEOUT}s] ❌ TIMEOUT: Health check failed after ${TIMEOUT}s"

if [ -n "$last_failed_container" ]; then
  if [[ "$last_failed_container" == "Task "* ]]; then
    echo "Last failure: $last_failed_container"
  else
    echo "Last failed container: $last_failed_container"
    
    if docker inspect "$last_failed_container" >/dev/null 2>&1; then
      echo "  Container details:"
      docker inspect "$last_failed_container" --format \
        'Status: {{.State.Status}}
        Exit Code: {{.State.ExitCode}}
        Error: {{.State.Error}}
        Started: {{.State.StartedAt}}
        Finished: {{.State.FinishedAt}}'
      
      echo ""
      echo "  Last 50 logs:"
      docker logs --tail=50 "$last_failed_container" 2>&1 | sed 's/^/    /'
    else
      echo "  Container not found (may have been removed)"
    fi
  fi
fi

echo ""
echo "📊 Final status:"
show_service_tasks

exit 1
