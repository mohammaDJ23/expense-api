#!/usr/bin/env bash

set -euo pipefail

required_envs=(
    DATABASE_HOST
    DATABASE_PORT
    DATABASE_NAME
    DATABASE_USER
    DATABASE_PASSWORD_FILE
)

for env in "${required_envs[@]}"; do
    if [ -z "${!env:-}" ]; then
        echo "ERROR: Required environment variable '${env}' is not set."
        exit 1
    fi
done

if [ ! -f "${DATABASE_PASSWORD_FILE}" ]; then
    echo "ERROR: Password file '${DATABASE_PASSWORD_FILE}' does not exist."
    exit 1
fi

readonly DATABASE_PASSWORD="$(<"${DATABASE_PASSWORD_FILE}")"

if [ -z "${DATABASE_PASSWORD}" ]; then
    echo "ERROR: Password file is empty."
    exit 1
fi

readonly CONNECTOR_NAME="expense-outbox"
readonly CONNECT_URL="http://debezium-connect:8083"

echo "Waiting for Debezium Connect..."

READY=false

for _ in $(seq 1 60); do
    if curl -fs "${CONNECT_URL}/" >/dev/null; then
        READY=true
        break
    fi

    sleep 2
done

if [ "${READY}" != "true" ]; then
    echo "ERROR: Debezium Connect did not become healthy within 120 seconds."

    exit 1
fi

echo "Debezium Connect is ready."

CONFIG="$(
    jq -n \
        --arg host "${DATABASE_HOST}" \
        --arg port "${DATABASE_PORT}" \
        --arg user "${DATABASE_USER}" \
        --arg password "${DATABASE_PASSWORD}" \
        --arg database "${DATABASE_NAME}" \
        '{
            "connector.class": "io.debezium.connector.postgresql.PostgresConnector",
            "database.hostname": $host,
            "database.port": $port,
            "database.user": $user,
            "database.password": $password,
            "database.dbname": $database,
            "plugin.name": "pgoutput",
            "slot.name": "expense_outbox",
            "publication.autocreate.mode": "all_tables",
            "snapshot.mode": "no_data",
            "topic.prefix": "expense-api",
            "table.include.list": "public.outbox_events",
            "transforms": "outbox",
            "transforms.outbox.type": "io.debezium.transforms.outbox.EventRouter",
            "transforms.outbox.route.by.field": "aggregate_type",
            "transforms.outbox.route.topic.replacement": "${routedByValue}",
            "transforms.outbox.table.field.event.key": "aggregate_id",
            "transforms.outbox.table.field.event.payload": "payload",
            "transforms.outbox.table.field.event.type": "event_type",
            "transforms.outbox.table.fields.additional.placement":
                "aggregate_type:header:aggregateType,aggregate_id:header:aggregateId,event_type:header:eventType,created_at:header:createdAt",
            "tombstones.on.delete": "false"
        }'
)"

HTTP_STATUS="$(
    curl \
        --silent \
        --output /dev/null \
        --write-out "%{http_code}" \
        "${CONNECT_URL}/connectors/${CONNECTOR_NAME}"
)"

if [ "${HTTP_STATUS}" = "404" ]; then
    echo "Creating connector..."

    jq -n \
        --arg name "${CONNECTOR_NAME}" \
        --argjson config "${CONFIG}" \
        '{name: $name, config: $config}' |
    curl \
        --fail \
        --silent \
        --show-error \
        -X POST \
        "${CONNECT_URL}/connectors" \
        -H "Content-Type: application/json" \
        --data @-

    echo "Connector created."
    exit 0

elif [ "${HTTP_STATUS}" = "200" ]; then
    echo "Updating connector..."

    printf '%s' "${CONFIG}" |
    curl \
        --fail \
        --silent \
        --show-error \
        -X PUT \
        "${CONNECT_URL}/connectors/${CONNECTOR_NAME}/config" \
        -H "Content-Type: application/json" \
        --data @-

    echo "Connector updated."
    exit 0

else
    echo "Unexpected HTTP status: ${HTTP_STATUS}"

    exit 1
fi