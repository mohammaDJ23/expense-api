#!/bin/bash

set -e

CONTAINER_NAME="expense-api-development"

if ! docker ps | grep -q $CONTAINER_NAME; then
  echo "❌ Container is not running."
  exit 1
fi

echo "🔄 Updating dependencies..."

echo "📦 Installing dependencies..."
docker exec --user root $CONTAINER_NAME npm install

echo "🚀 Restarting container..."
docker-compose -f docker-compose.base.yml -f docker-compose.development.yml down
docker-compose -f docker-compose.base.yml -f docker-compose.development.yml up --watch

echo "⏳ Waiting for container to restart..."
for i in {1..10}; do
  if docker ps --filter "name=$CONTAINER_NAME" --filter "status=running" | grep -q $CONTAINER_NAME; then
    echo "✅ Container is running"
    break
  fi
  sleep 1
  echo "  ...still waiting ($i/10)"
done

sleep 2

echo "📋 Container status:"
docker ps --filter "name=$CONTAINER_NAME" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

echo "✅ Done! Container restarted with updated dependencies."
