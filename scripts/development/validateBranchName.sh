#!/usr/bin/env bash

set -eu

export BRANCH=$(git branch --show-current 2>/dev/null || git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "unknown")

source ./scripts/common/validateBranchName.sh
