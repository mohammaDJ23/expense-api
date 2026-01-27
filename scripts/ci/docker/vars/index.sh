#!/bin/bash

set -euo pipefail

APP_NAME="${APP_NAME:?ERROR: APP_NAME is required}"
MODE="${MODE:?ERROR: MODE is required}"

export COMPOSE_FILE="${COMPOSE_FILE:-docker-compose.swarm.$MODE.yml}"
export STACK_NAME="${STACK_NAME:-$APP_NAME-$MODE}"
export SERVICE_NAME="${SERVICE_NAME:-$APP_NAME-$MODE_$APP_NAME}"
export IMAGE_NAME="${IMAGE_NAME:-$APP_NAME-$MODE}"
export ENVIRONMENT="${ENVIRONMENT:-production}"

log_message() {
  echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1"
}

log_message "Setting variables:"
log_message "  COMPOSE_FILE=${COMPOSE_FILE}"
log_message "  STACK_NAME=${STACK_NAME}"
log_message "  SERVICE_NAME=${SERVICE_NAME}"
log_message "  IMAGE_NAME=${IMAGE_NAME}"
log_message "  ENVIRONMENT=${ENVIRONMENT}"

if [ -n "${GITHUB_OUTPUT:-}" ]; then
  echo "COMPOSE_FILE=$COMPOSE_FILE" >> $GITHUB_OUTPUT
  echo "STACK_NAME=$STACK_NAME" >> $GITHUB_OUTPUT
  echo "SERVICE_NAME=$SERVICE_NAME" >> $GITHUB_OUTPUT
  echo "IMAGE_NAME=$IMAGE_NAME" >> $GITHUB_OUTPUT
  echo "ENVIRONMENT=$ENVIRONMENT" >> $GITHUB_OUTPUT
else
  echo "WARNING: GITHUB_OUTPUT not set. Step outputs won't be available."
fi

if [ -n "${GITHUB_ENV:-}" ]; then
  echo "COMPOSE_FILE=$COMPOSE_FILE" >> $GITHUB_ENV
  echo "STACK_NAME=$STACK_NAME" >> $GITHUB_ENV
  echo "SERVICE_NAME=$SERVICE_NAME" >> $GITHUB_ENV
  echo "IMAGE_NAME=$IMAGE_NAME" >> $GITHUB_ENV
  echo "ENVIRONMENT=$ENVIRONMENT" >> $GITHUB_ENV
else
  echo "WARNING: GITHUB_ENV not set. Step env won't be available."
fi
