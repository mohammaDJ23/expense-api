#!/usr/bin/env bash

set -eu

APP_NAME=$(source ./scripts/common/appName.sh)
HASH=$(source ./scripts/common/createHash.sh)

SECRETS=""

if [ -d "./secrets" ]; then
    for file in ./secrets/*.txt; do
        [ -f "${file}" ] || continue
        key=$(basename "${file}" .txt)
        value=$(cat "${file}" | tr -d '\n\r')
        
        if [ -n "${SECRETS}" ]; then
            SECRETS="${SECRETS};${key}=${value}"
        else
            SECRETS="${key}=${value}"
        fi
    done
fi

export MODE="development"
export ENVIRONMENT="development"
export COMPOSE_FILE="docker-compose.swarm.${ENVIRONMENT}.yml"
export STACK_NAME="${APP_NAME}-${ENVIRONMENT}"
export SERVICE_NAME="${APP_NAME}-${ENVIRONMENT}_${APP_NAME}"
export IMAGE_NAME="docker-username-development/${APP_NAME}-${ENVIRONMENT}:${HASH}"
export SECRETS="${SECRETS}"

source ./scripts/common/docker/entrypoint.sh
