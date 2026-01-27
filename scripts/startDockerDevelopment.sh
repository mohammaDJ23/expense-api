#!/bin/bash

set -euo pipefail

export COMPOSE_FILE="${COMPOSE_FILE:-docker-compose.swarm.development.yml}"
export STACK_NAME="${STACK_NAME:-expense-api-development}"
export SERVICE_NAME="${SERVICE_NAME:-expense-api-development_expense-api}"
export IMAGE_NAME="${IMAGE_NAME:-expense-api-development:latest}"
export ENVIRONMENT="${ENVIRONMENT:-development}"

SECRETS=""
if [ -d "./secrets" ]; then
  for file in ./secrets/*.txt; do
    [ -f "$file" ] || continue
    key=$(basename "$file" .txt)
    value=$(cat "$file" | tr -d '\n\r')
    
    if [ -n "$SECRETS" ]; then
      SECRETS="${SECRETS};${key}=${value}"
    else
      SECRETS="${key}=${value}"
    fi
  done
fi

export SECRETS

source ./scripts/common/startDocker.sh
