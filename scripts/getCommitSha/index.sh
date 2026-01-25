#!/bin/bash

set -euo pipefail

echo "Getting commit_sha..."

COMMIT_SHA=$(git rev-parse HEAD)

echo "✅ The commit_sha is ${COMMIT_SHA}."

echo "::set-output name=commit_sha::${COMMIT_SHA}"
