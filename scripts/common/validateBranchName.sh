#!/usr/bin/env bash

set -eu

BRANCH="${BRANCH:-}"
CONFIG_FILE="${CONFIG_FILE:-.branch.namerc.json}"

echo "🚀 Starting branch validation..."

if [ -z "$BRANCH" ]; then
  echo "❌ Error: BRANCH environment variable is not set"
  exit 1
fi

if [ ! -f "$CONFIG_FILE" ]; then
  echo "❌ Error: Config file '$CONFIG_FILE' not found"
  echo "   Current directory: $(pwd)"
  echo "   Available files:"
  ls -la . || true
  echo ""
  echo "   Either create it or set CONFIG_FILE environment variable"
  exit 1
fi

echo "Branch name: '$BRANCH'"
echo "Config file: $CONFIG_FILE"
echo ""

if [ "$BRANCH" = "HEAD" ]; then
  echo "✅ Detached HEAD detected (likely tag build)"
  echo "   Skipping branch validation"
  exit 0
fi

echo "🔍 Validating branch: $BRANCH"
echo ""

if ! pnpm exec branch-name-lint "$CONFIG_FILE" --branch="$BRANCH"; then
  echo ""
  echo "❌ Branch validation failed!"
  exit 1
fi

echo ""
echo "✅ Branch validation passed!"
