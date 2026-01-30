#!/bin/bash

set -euo pipefail

detect_branch() {
  local detected_branch=""
  
  if [ -n "${BRANCH:-}" ]; then
    detected_branch="$BRANCH"
    echo "✅ Using provided BRANCH env var: $detected_branch" >&2
  elif [ -n "${GITHUB_HEAD_REF:-}" ]; then
    detected_branch="$GITHUB_HEAD_REF"
    echo "✅ Using GitHub PR branch: $detected_branch" >&2
  elif [ -n "${GITHUB_REF_NAME:-}" ]; then
    detected_branch="$GITHUB_REF_NAME"
    echo "✅ Using GitHub push branch: $detected_branch" >&2
  else
    if ! git rev-parse --git-dir > /dev/null 2>&1; then
      echo "⚠️ Not in a git repository" >&2
      echo ""
      return
    fi
    
    detected_branch=$(git symbolic-ref -q HEAD 2>/dev/null || git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "")
    
    if [ -n "$detected_branch" ] && [ "$detected_branch" != "HEAD" ]; then
      echo "✅ Using git branch: '$detected_branch'" >&2
    elif [ "$detected_branch" = "HEAD" ]; then
      echo "⚠️ Git is in detached HEAD state" >&2
      detected_branch=""
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
  echo "   Current directory: $(pwd)" >&2
  echo "   Is git repo: $(git rev-parse --git-dir 2>/dev/null && echo "yes" || echo "no")" >&2
  exit 1
fi

# if [ -n "${GITHUB_OUTPUT:-}" ]; then
#   echo "branch=$BRANCH" >> "$GITHUB_OUTPUT"
# else
#   echo "branch=$BRANCH"
# fi

echo "::set-output name=branch::$BRANCH"
