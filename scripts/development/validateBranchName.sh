#!/usr/bin/env bash

set -euo pipefail

export BRANCH=$(git branch --show-current 2>/dev/null || git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "")

source ./scripts/common/validateBranchName.sh
