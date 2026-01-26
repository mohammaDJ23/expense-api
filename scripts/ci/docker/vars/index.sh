#!/bin/bash

set -euo pipefail

export COMPOSE_FILE="${COMPOSE_FILE:-docker-compose.swarm.ci.yml}"
export STACK_NAME="${STACK_NAME:-expense-api-ci}"
export SERVICE_NAME="${SERVICE_NAME:-expense-api-ci_expense-api}"
export IMAGE_NAME="${IMAGE_NAME:-expense-api-ci:latest}"
export SECRETS_DIR="${SECRETS_DIR:-./.ci.secrets}"
export ENVIRONMENT="${ENVIRONMENT:-production}"

log_message() {
  echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1"
}

log_message "Setting variables:"
log_message "  COMPOSE_FILE=${COMPOSE_FILE}"
log_message "  STACK_NAME=${STACK_NAME}"
log_message "  SERVICE_NAME=${SERVICE_NAME}"
log_message "  IMAGE_NAME=${IMAGE_NAME}"
log_message "  SECRETS_DIR=${SECRETS_DIR}"
log_message "  ENVIRONMENT=${ENVIRONMENT}"

if [ -n "${GITHUB_OUTPUT:-}" ]; then
  echo "COMPOSE_FILE=$COMPOSE_FILE" >> $GITHUB_OUTPUT
  echo "STACK_NAME=$STACK_NAME" >> $GITHUB_OUTPUT
  echo "SERVICE_NAME=$SERVICE_NAME" >> $GITHUB_OUTPUT
  echo "IMAGE_NAME=$IMAGE_NAME" >> $GITHUB_OUTPUT
  echo "SECRETS_DIR=$SECRETS_DIR" >> $GITHUB_OUTPUT
  echo "ENVIRONMENT=$ENVIRONMENT" >> $GITHUB_OUTPUT
else
  echo "WARNING: GITHUB_OUTPUT not set. Step outputs won't be available."
fi

if [ -n "${GITHUB_ENV:-}" ]; then
  echo "COMPOSE_FILE=$COMPOSE_FILE" >> $GITHUB_ENV
  echo "STACK_NAME=$STACK_NAME" >> $GITHUB_ENV
  echo "SERVICE_NAME=$SERVICE_NAME" >> $GITHUB_ENV
  echo "IMAGE_NAME=$IMAGE_NAME" >> $GITHUB_ENV
  echo "SECRETS_DIR=$SECRETS_DIR" >> $GITHUB_ENV
  echo "ENVIRONMENT=$ENVIRONMENT" >> $GITHUB_ENV
else
  echo "WARNING: GITHUB_ENV not set. Step env won't be available."
fi
