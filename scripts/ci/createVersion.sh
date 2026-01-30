#!/usr/bin/env bash

set -euo pipefail

output_version() {
  local version="$1"
  local released="$2"

  if [ -n "${GITHUB_OUTPUT:-}" ]; then
    echo "version=$version" >> "$GITHUB_OUTPUT"
    echo "released=$released" >> "$GITHUB_OUTPUT"
  else
    echo "version=$version"
    echo "released=$released"
  fi
}

GIT_EMAIL="${GIT_EMAIL:-release-bot@users.noreply.github.com}"
GIT_NAME="${GIT_NAME:-Automated Release Bot}"

echo "⚙️ Configuring git user as: $GIT_NAME <$GIT_EMAIL>"
git config --global user.email "$GIT_EMAIL"
git config --global user.name "$GIT_NAME"

if [[ ! -f "package.json" ]]; then
  echo "❌ ERROR: package.json not found in current directory!"
  echo "   Current directory: $(pwd)"
  echo "   Contents:"
  ls -la . || true
  exit 1
fi

echo "🔍 Getting previous version..."
PREVIOUS_VERSION=$(jq -r '.version' package.json)
echo "Previous version: ${PREVIOUS_VERSION}"

echo "🧪 Running semantic-release dry run..."

SEMANTIC_OUTPUT=$(pnpm exec semantic-release --dry-run --ci 2>&1) || {
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
  "Cutting release"
  "Creating tag"
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
  echo "⚠️  Could not find version with standard phrases, trying pattern search..."
  VERSION_MATCH=$(echo "${SEMANTIC_OUTPUT}" | tail -20 | grep -oE '[0-9]+\.[0-9]+\.[0-9]+' | head -1)
  if [[ -n "${VERSION_MATCH}" ]]; then
    NEXT_VERSION="${VERSION_MATCH}"
    echo "📝 Found version via pattern match: ${NEXT_VERSION}"
  fi
fi

if [[ -z "${NEXT_VERSION}" ]]; then
  echo "❌ Could not determine next version from semantic-release output"
  echo "Debug: Looking for version patterns in output..."
  echo "${SEMANTIC_OUTPUT}" | grep -E "[0-9]+\.[0-9]+\.[0-9]+|v[0-9]+\.[0-9]+\.[0-9]+" || true
  exit 1
fi

if [[ "${NEXT_VERSION}" == "${PREVIOUS_VERSION}" ]]; then
  echo "✅ Version unchanged (${PREVIOUS_VERSION}). No release needed."
  output_version "$PREVIOUS_VERSION" false
  exit 0
fi

echo "✅ New version detected: ${PREVIOUS_VERSION} → ${NEXT_VERSION}"

echo "🚀 Starting actual Semantic Release process..."
if ! pnpm exec semantic-release --ci; then
  echo "❌ Semantic release failed"
  output_version "$NEXT_VERSION" false
  exit 1
fi

echo "✅ Semantic Release successful!"

output_version "$NEXT_VERSION" true
