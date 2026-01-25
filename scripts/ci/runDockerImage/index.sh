#!/bin/bash

set -euo pipefail

COMPOSE_FILE="${COMPOSE_FILE:-docker-compose.ci.yml}"

echo "🚀 Starting Docker services from $COMPOSE_FILE..."

[ -f "$COMPOSE_FILE" ] || { echo "❌ File not found: $COMPOSE_FILE"; exit 1; }

docker compose -f "$COMPOSE_FILE" up -d

echo ""
echo "📊 Services status:"
docker compose -f "$COMPOSE_FILE" ps
