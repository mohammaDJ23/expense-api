#!/bin/bash

set -euo pipefail

readonly COMPOSE_FILE="${COMPOSE_FILE:?ERROR: COMPOSE_FILE is required}"
readonly STACK_NAME="${STACK_NAME:?ERROR: STACK_NAME is required}"
readonly SERVICE_NAME="${SERVICE_NAME:?ERROR: SERVICE_NAME is required}"
readonly IMAGE_NAME="${IMAGE_NAME:?ERROR: IMAGE_NAME is required}"
readonly ENVIRONMENT="${ENVIRONMENT:?ERROR: ENVIRONMENT is required}"
readonly SECRETS="${SECRETS:-}"

if docker info >/dev/null 2>&1; then
  echo "✅ Docker daemon is running"
else
  echo "❌ Docker daemon is not running"
  exit 1
fi

echo ""
echo "🚀 Starting development stack with Docker Swarm..."
echo "   Stack: $STACK_NAME"
echo "   Image: $IMAGE_NAME"
echo ""

if command -v docker-compose >/dev/null 2>&1; then
  readonly COMPOSE_CMD="docker-compose"
else
  readonly COMPOSE_CMD="docker compose"
fi

init_swarm() {
  local -r swarm_state=$(docker info --format '{{.Swarm.LocalNodeState}}' 2>/dev/null || echo "inactive")
  if [ "$swarm_state" = "active" ]; then
    echo "✅ Docker Swarm is active"
    echo "   Node ID: $(docker info --format '{{.Swarm.NodeID}}' 2>/dev/null || echo "unknown")"
  else
    echo "Initializing Docker Swarm..."
    docker swarm init --advertise-addr 127.0.0.1 2>/dev/null || echo "⚠️  Swarm initialization failed or already in progress"
  fi
  echo ""
}

setup_secrets() {
  echo "Creating Docker secrets..."
  
  [ -z "${SECRETS:-}" ] && { echo "⚠️  No secrets"; return 0; }
  
  echo "$SECRETS" | tr ';' '\n' | while IFS='=' read -r name value; do
    [ -z "$name" ] && continue
    
    if [ -z "$value" ]; then
      echo "⚠️  $name has empty value, skipping"
      continue
    fi
    
    if docker secret inspect "$name" >/dev/null 2>&1; then
      echo "✅ $name (already exists)"
    else
      if echo "$value" | docker secret create "$name" - >/dev/null 2>&1; then
        echo "✅ $name created"
      else
        echo "❌ Failed to create $name"
        exit 1
      fi
    fi
  done
}

build_all_services() {
  echo ""
  echo "🏗️  Building the images of the services..."
  local -r services_to_build=$($COMPOSE_CMD -f "$COMPOSE_FILE" config --services 2>/dev/null || echo "")
  for service in $services_to_build; do
    if $COMPOSE_CMD -f "$COMPOSE_FILE" config --services | grep -q "^${service}$"; then
      echo "   Building: $service"
      if $COMPOSE_CMD -f "$COMPOSE_FILE" build "$service"; then
        echo "   ✅ $service built"
      else
        echo "❌ ERROR: Failed to build $service"
        exit 1
      fi
    fi
  done
  echo "✅ All images built successfully"
}

deploy_stack() {
  echo ""
  echo "Deploying stack: $STACK_NAME..."
  docker stack deploy -c "$COMPOSE_FILE" "$STACK_NAME"
}

wait_for_services() {
  local -r -i timeout=180

  echo "⏳ Waiting for services (max ${timeout}s)..."
  for i in $(seq 1 $timeout); do
    local total=$(docker stack services "$STACK_NAME" --format "{{.Name}}" 2>/dev/null | grep -c .)
    if [ "$total" -eq 0 ]; then
      sleep 1
      continue
    fi

    local replicas_list=$(docker stack services "$STACK_NAME" --format "{{.Replicas}}" 2>/dev/null | tr '\n' ' ')
    local ready=$(echo "$replicas_list" | tr ' ' '\n' | awk -F/ '$1 == $2' | wc -l)
    if [ "$ready" -eq "$total" ] && [ "$total" -gt 0 ]; then
      echo "✅ All $total services ready after ${i}s"
      return 0
    fi
    
    if [ $((i % 5)) -eq 0 ]; then
      echo "   [${i}s] $ready/$total services ready..."
    fi
    
    sleep 1
  done
  
  echo ""
  echo "❌ ERROR: Services not ready within ${timeout}s"
  docker stack services "$STACK_NAME"
  exit 1
}

show_status() {
  echo ""
  echo "📋 Services:"
  docker stack services "$STACK_NAME"
  
  echo ""
  echo "📝 View logs: docker service logs --raw -f $SERVICE_NAME"
  echo ""
}

main() {
  init_swarm

  setup_secrets

  build_all_services

  deploy_stack

  wait_for_services

  show_status
}

main "$@"
