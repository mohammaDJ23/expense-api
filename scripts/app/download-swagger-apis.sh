#!/usr/bin/env bash

set -euo pipefail

mkdir -p artifacts

curl \
    --fail \
    --silent \
    --show-error \
    --retry 10 \
    --retry-connrefused \
    --retry-delay 3 \
    http://127.0.0.1:3000/swagger/json \
    --output artifacts/backend-apis.json

jq -e '
    (.openapi | type == "string") and
    (.paths | type == "object")
' artifacts/backend-apis.json > /dev/null

echo "OpenAPI specification downloaded and validated successfully."
