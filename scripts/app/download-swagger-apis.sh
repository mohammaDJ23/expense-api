#!/usr/bin/env bash

set -euo pipefail

PORT="${PORT:?ERROR: PORT environment variable must be provided}"
OUTPUT_FILE="${OUTPUT_FILE:?ERROR: OUTPUT_FILE environment variable must be provided}"

mkdir -p "$(dirname "$OUTPUT_FILE")"

curl \
    --fail \
    --silent \
    --show-error \
    --retry 10 \
    --retry-connrefused \
    --retry-delay 3 \
    "http://127.0.0.1:${PORT}/swagger/json" \
    --output "$OUTPUT_FILE"

jq -e '
    (.openapi | type == "string") and
    (.paths | type == "object")
' "$OUTPUT_FILE" > /dev/null

echo "OpenAPI specification downloaded and validated successfully: $OUTPUT_FILE"
