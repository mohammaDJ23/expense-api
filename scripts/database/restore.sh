#!/usr/bin/env bash

set -euo pipefail

DATA_DIR="/var/lib/postgresql/data"

export PGPASSWORD="$(cat /run/secrets/database_password)"
export AWS_ACCESS_KEY_ID="$(cat /run/secrets/arvan_access_key)"
export AWS_SECRET_ACCESS_KEY="$(cat /run/secrets/arvan_secret_key)"

echo "========================================"
echo "PostgreSQL temporary restore"
echo "========================================"

echo
echo "Checking available backups..."

wal-g backup-list

echo
echo "Checking restore data directory..."

if [ "$(find "$DATA_DIR" -mindepth 1 -maxdepth 1 -print -quit)" ]; then
    echo "ERROR: Restore data directory is not empty."
    echo
    echo "This restore volume must be empty."
    echo "Remove the temporary restore volume and try again."
    exit 1
fi

echo
echo "Fetching latest full backup..."

wal-g backup-fetch "$DATA_DIR" LATEST

echo
echo "Configuring WAL recovery..."

cat >> "${DATA_DIR}/postgresql.auto.conf" <<'EOF'
restore_command = 'wal-g wal-fetch "%f" "%p"'
EOF

touch "${DATA_DIR}/recovery.signal"

chown -R postgres:postgres "$DATA_DIR"

echo
echo "Starting temporary PostgreSQL..."
echo "PostgreSQL will replay the archived WAL."
echo

exec /usr/local/bin/docker-entrypoint.sh postgres
