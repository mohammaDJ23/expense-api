#!/bin/bash

set -euo pipefail

detect_branch() {
  local detected_branch=""
  
  if [ -n "${BRANCH:-}" ]; then
    detected_branch="$BRANCH"
    echo "🔍 Using provided BRANCH env var: $detected_branch" >&2
  elif [ -n "${GITHUB_HEAD_REF:-}" ]; then
    detected_branch="$GITHUB_HEAD_REF"
    echo "🔍 Using GitHub PR branch: $detected_branch" >&2
  elif [ -n "${GITHUB_REF_NAME:-}" ]; then
    detected_branch="$GITHUB_REF_NAME"
    echo "🔍 Using GitHub push branch: $detected_branch" >&2
  else
    detected_branch=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "")
    if [ -n "$detected_branch" ]; then
      echo "🔍 Using git branch: '$detected_branch'" >&2
    else
      echo "🔍 No branch detected" >&2
    fi
  fi
  
  detected_branch="${detected_branch#refs/heads/}"
  echo "$detected_branch"
}

BRANCH=$(detect_branch)

if [ -z "$BRANCH" ]; then
  echo "❌ Error: Could not detect branch name" >&2
  echo "   Available environment:" >&2
  echo "   BRANCH: ${BRANCH:-}" >&2
  echo "   GITHUB_HEAD_REF: ${GITHUB_HEAD_REF:-}" >&2
  echo "   GITHUB_REF_NAME: ${GITHUB_REF_NAME:-}" >&2
  exit 1
fi

echo "$BRANCH"
