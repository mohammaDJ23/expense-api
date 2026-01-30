#!/bin/bash

set -euo pipefail

COMMIT_MSG_FILE="${1:-}"
CONFIG_FILE="${CONFIG_FILE:-commitlint.config.js}"

echo "🚀 Starting commit message validation..."

if [ -z "$COMMIT_MSG_FILE" ]; then
  echo "❌ Error: No commit message file provided"
  echo "   Usage: $0 <commit-msg-file>"
  exit 1
fi

if [ ! -f "$CONFIG_FILE" ]; then
  echo "❌ Error: Commitlint config file not found: $CONFIG_FILE"
  echo "   Please create: $CONFIG_FILE"
  exit 1
fi

if [ ! -f "$COMMIT_MSG_FILE" ]; then
  echo "❌ Error: Commit message file not found: $COMMIT_MSG_FILE"
  exit 1
fi

echo "📄 Validating: $COMMIT_MSG_FILE"
echo "⚙️  Using config: $CONFIG_FILE"
echo ""

pnpm exec commitlint --edit "$COMMIT_MSG_FILE"

echo "✅ Commit message validation passed!"
