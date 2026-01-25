#!/bin/bash

set -euo pipefail

cleanup_secrets() {
  echo "🧹 Cleaning up Docker secrets..."
  docker secret rm database_password 2>/dev/null || true
  docker secret rm redis_password 2>/dev/null || true
  docker secret rm jwt_secret 2>/dev/null || true
}

trap 'cleanup_secrets' ERR

echo "🔐 Creating Docker secrets..."

REQUIRED_VARS=("DATABASE_PASSWORD" "REDIS_PASSWORD" "JWT_SECRET")
MISSING_VARS=()

for var in "${REQUIRED_VARS[@]}"; do
  if [ -z "${!var:-}" ]; then
    MISSING_VARS+=("$var")
  fi
done

if [ ${#MISSING_VARS[@]} -gt 0 ]; then
  echo "❌ ERROR: Missing required environment variables:"
  for var in "${MISSING_VARS[@]}"; do
    echo "   - $var"
  done
  echo ""
  echo "   Make sure these are set in your CI environment or GitHub Secrets"
  echo "   Example in GitHub Actions:"
  echo "     env:"
  echo "       DATABASE_PASSWORD: \${{ secrets.DATABASE_PASSWORD }}"
  exit 1
fi

EMPTY_VARS=()
for var in "${REQUIRED_VARS[@]}"; do
  if [ -z "${!var}" ]; then
    EMPTY_VARS+=("$var")
  fi
done

if [ ${#EMPTY_VARS[@]} -gt 0 ]; then
  echo "❌ ERROR: Environment variables cannot be empty:"
  for var in "${EMPTY_VARS[@]}"; do
    echo "   - $var"
  done
  exit 1
fi

echo "Initializing Docker swarm..."
if ! docker swarm init --advertise-addr 127.0.0.1 2>/dev/null; then
  echo "⚠️  Docker swarm already initialized or running in swarm mode"
fi

create_secret() {
  local secret_name="$1"
  local secret_value="$2"
  
  echo "Creating secret: $secret_name"
  
  if docker secret ls --format "{{.Name}}" | grep -q "^${secret_name}$"; then
    echo "⚠️  Secret '$secret_name' already exists, removing..."
    docker secret rm "$secret_name" 2>/dev/null || true
  fi
  
  if echo "$secret_value" | docker secret create "$secret_name" - 2>&1; then
    echo "✅ Created secret: $secret_name"
    return 0
  else
    echo "❌ Failed to create secret: $secret_name"
    return 1
  fi
}

FAILED_SECRETS=()

if ! create_secret "database_password" "$DATABASE_PASSWORD"; then
  FAILED_SECRETS+=("database_password")
fi

if ! create_secret "redis_password" "$REDIS_PASSWORD"; then
  FAILED_SECRETS+=("redis_password")
fi

if ! create_secret "jwt_secret" "$JWT_SECRET"; then
  FAILED_SECRETS+=("jwt_secret")
fi

if [ ${#FAILED_SECRETS[@]} -gt 0 ]; then
  echo "❌ ERROR: Failed to create secrets: ${FAILED_SECRETS[*]}"
  exit 1
fi

echo "✅ All Docker secrets created successfully"

echo ""
echo "🔍 Verifying secrets..."
docker secret ls

COMPOSE_FILE="docker-compose.ci.yml"
if [ ! -f "$COMPOSE_FILE" ]; then
  echo "❌ ERROR: Docker compose file '$COMPOSE_FILE' not found!"
  echo "   Current directory: $(pwd)"
  echo "   Available files:"
  ls -la . || true
  exit 1
fi

echo ""
echo "🏗️ Building Docker images..."

if docker stack deploy -c "$COMPOSE_FILE" app 2>/dev/null; then
  echo "✅ Docker stack deployed"
else
  echo "⚠️  Docker stack deploy failed, trying docker compose build..."
  if docker compose -f "$COMPOSE_FILE" build; then
    echo "✅ Docker images built successfully"
  else
    echo "❌ Docker build failed"
    exit 1
  fi
fi

echo ""
echo "📦 Built images:"
docker images --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}" | head -10

echo "✅ Build process complete!"
