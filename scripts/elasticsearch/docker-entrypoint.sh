#!/usr/bin/env bash

set -euo pipefail

if [ -n "$ELASTIC_PASSWORD_FILE" ]; then
    TEMP_SECRET="/tmp/elasticsearch_password"

    cp "${ELASTIC_PASSWORD_FILE}" "${TEMP_SECRET}"
    chmod 600 "${TEMP_SECRET}"

    export ELASTIC_PASSWORD_FILE="${TEMP_SECRET}"
fi

exec /usr/local/bin/docker-entrypoint.sh "$@"
