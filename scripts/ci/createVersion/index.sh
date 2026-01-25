#!/bin/bash

set -euo pipefail

echo "🔍 Getting previous version..."
PREVIOUS_VERSION=$(jq -r '.version' package.json)
echo "Previous version: ${PREVIOUS_VERSION}"

echo "🧪 Running semantic-release dry run..."

SEMANTIC_OUTPUT=$(npx semantic-release --dry-run --ci 2>&1) || {
  EXIT_CODE=$?
  echo "❌ semantic-release failed with exit code: ${EXIT_CODE}"
  echo "Output:"
  echo "${SEMANTIC_OUTPUT}"
  exit $EXIT_CODE
}

echo "📋 Semantic-release dry run output:"
echo "${SEMANTIC_OUTPUT}"

NEXT_VERSION=""
PHRASES=(
  "The next release version is"
  "next release version is"
  "would release version"
  "Published release"
)

for PHRASE in "${PHRASES[@]}"; do
  if echo "${SEMANTIC_OUTPUT}" | grep -q "${PHRASE}"; then
    LINE=$(echo "${SEMANTIC_OUTPUT}" | grep "${PHRASE}" | head -n 1)
    if [[ $LINE =~ ([0-9]+\.[0-9]+\.[0-9]+) ]]; then
      NEXT_VERSION="${BASH_REMATCH[1]}"
      echo "📝 Found version using phrase: '${PHRASE}'"
      break
    fi
  fi
done

if [[ -z "${NEXT_VERSION}" ]]; then
  echo "❌ Could not determine next version from semantic-release output"
  echo "Debug: Looking for version patterns in output..."
  echo "${SEMANTIC_OUTPUT}" | grep -E "[0-9]+\.[0-9]+\.[0-9]+|v[0-9]+\.[0-9]+\.[0-9]+" || true
  exit 1
fi

if [[ "${NEXT_VERSION}" == "${PREVIOUS_VERSION}" ]]; then
  echo "❌ Version unchanged (${PREVIOUS_VERSION}). No release needed."
  exit 1
fi

echo "✅ New version detected: ${PREVIOUS_VERSION} → ${NEXT_VERSION}"

echo "🚀 Starting actual Semantic Release process..."
if ! npx semantic-release --ci; then
  echo "❌ Semantic release failed"
  exit 1
fi

echo "✅ Semantic Release successful!"
