#!/usr/bin/env bash

set -euo pipefail

source ./scripts/common/logs.sh

if [[ -n "${GITHUB_OUTPUT:-}" && -n "${IMAGE_NAME:-}" ]]; then
    echo "image_name=${IMAGE_NAME}" >> "$GITHUB_OUTPUT"
    log_success "✓ GitHub output set: image-name=${IMAGE_NAME}"
else
    log_warning "⚠ Missing GITHUB_OUTPUT or IMAGE_NAME, skipping output"
fi
