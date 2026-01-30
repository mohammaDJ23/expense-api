#!/usr/bin/env bash

set -euo pipefail

echo "Getting commit_sha..."

if ! git rev-parse --git-dir > /dev/null 2>&1; then
  echo "❌ ERROR: Not in a git repository!"
  echo "   Current directory: $(pwd)"
  exit 1
fi

COMMIT_SHA=$(git rev-parse HEAD)

if [ -z "$COMMIT_SHA" ]; then
  echo "❌ ERROR: Could not get commit SHA!"
  exit 1
fi

echo "✅ The commit_sha is ${COMMIT_SHA}."

if [ -n "${GITHUB_OUTPUT:-}" ]; then
  echo "commit_sha=$COMMIT_SHA" >> "$GITHUB_OUTPUT"
else
  echo "commit_sha=$COMMIT_SHA"
fi
