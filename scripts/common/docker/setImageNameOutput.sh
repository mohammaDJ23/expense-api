#!/usr/bin/env bash

set -euo pipefail

source ./scripts/common/logs.sh
source ./scripts/common/docker/createImageName.sh

if [[ -n "${GITHUB_OUTPUT:-}" ]]; then
    echo "image-name=${IMAGE_NAME}" >> "$GITHUB_OUTPUT"
    log_success "✓ GitHub output set: image-name=${IMAGE_NAME}"
else
    log_warning "⚠ Not in GitHub Actions, skipping output"
fi
