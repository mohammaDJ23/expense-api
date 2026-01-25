#!/bin/bash

set -euo pipefail

BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "")
CONFIG_FILE="${CONFIG_FILE:-.branch.namerc.json}"

echo "🚀 Starting branch validation..."

if [ -z "$BRANCH" ]; then
  echo "❌ Error: Could not determine branch name"
  echo "   Make sure you're in a git repository"
  exit 1
fi

if [ ! -f "$CONFIG_FILE" ]; then
  echo "❌ Error: Config file '$CONFIG_FILE' not found"
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

npx branch-name-lint "$CONFIG_FILE" --branch="$BRANCH"

echo ""
echo "✅ Branch validation passed!"
