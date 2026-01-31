#!/usr/bin/env bash

set -eu

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

export ENVIRONMENT="development"
export MODE="development"
export SECRETS="${SECRETS}"
export CLEANUP_ON_SUCCESS="false"

source ./scripts/common/entrypoint.sh
