#!/bin/bash

set -euo pipefail

readonly COMPOSE_FILE="${COMPOSE_FILE:?ERROR: COMPOSE_FILE is required}"
readonly STACK_NAME="${STACK_NAME:?ERROR: STACK_NAME is required}"
readonly SERVICE_NAME="${SERVICE_NAME:?ERROR: SERVICE_NAME is required}"
readonly IMAGE_NAME="${IMAGE_NAME:?ERROR: IMAGE_NAME is required}"
readonly SECRETS_DIR="${SECRETS_DIR:?ERROR: SECRETS_DIR is required}"
readonly ENVIRONMENT="${ENVIRONMENT:?ERROR: ENVIRONMENT is required}"
readonly WATCH_MODE="${WATCH_MODE:-false}"

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
}

setup_secrets() {
  echo "Creating Docker secrets..."
  for secret in "database_password" "redis_password" "jwt_secret"; do
    local secret_file="${SECRETS_DIR}/${secret}.txt"
    if [ ! -f "$secret_file" ]; then
      echo "❌ $secret_file not found";
      exit 1;
    fi
    if docker secret inspect "$secret" >/dev/null 2>&1; then
      echo "✅ $secret (already exists)"
    else
      docker secret create "$secret" "$secret_file" >/dev/null && echo "✅ $secret created"
    fi
  done
}

build_all_services() {
  echo ""
  echo "🏗️  Building Docker images..."
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
  echo "📝 View logs: docker service logs -f $SERVICE_NAME"
  echo ""
  echo "🔧 To rebuild: $COMPOSE_CMD -f $COMPOSE_FILE build && docker service update --force --image $IMAGE_NAME $SERVICE_NAME"
}

watch_mode() {
  [ "$WATCH_MODE" != "true" ] && return

  if [[ "${ENVIRONMENT}" != "development" ]]; then
    echo "⚠️  Watch mode only available in development environment"
    return 0
  fi

  echo ""
  echo "👀 WATCH MODE ENABLED"
  echo "   Watching: ./src, ./package.json"
  echo "   Press Ctrl+C to exit"
  echo ""
  
  local -r timestamp_file="/tmp/swarm_watch_$$"
  touch "$timestamp_file"
  
  cleanup() {
    rm -f "$timestamp_file" 2>/dev/null || true
  }
  trap cleanup EXIT
  
  while true; do
    echo "📝 Viewing logs (30 seconds)..."
    echo ""
    
    timeout 30 docker service logs -f --tail 50 "${STACK_NAME}_expense-api" 2>/dev/null || true
    
    echo ""
    echo "🔄 Checking for changes..."
    
    if find ./src ./package.json -type f -newer "$timestamp_file" 2>/dev/null | grep -q .; then
      echo "📦 Changes detected!"
      echo "🏗️  Rebuilding..."
      
      if $COMPOSE_CMD -f "$COMPOSE_FILE" build expense-api; then
        echo "✅ Build successful, updating service..."
        if docker service update --force --image $IMAGE_NAME "${STACK_NAME}_expense-api"; then
          echo "🎉 Service updated successfully!"
        else
          echo "⚠️  Service update had issues"
        fi
      else
        echo "❌ Build failed"
      fi
      
      touch "$timestamp_file"
    else
      echo "✅ No changes detected"
    fi
    
    echo ""
    echo "Next check in 5 seconds..."
    sleep 5
  done
}

main() {
  export STACK_NAME
  export IMAGE_NAME

  init_swarm

  setup_secrets

  build_all_services

  deploy_stack

  wait_for_services

  show_status

  watch_mode
}

main "$@"
