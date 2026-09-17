#!/usr/bin/env bash

set -euo pipefail

PRODUCTION_DIR="/production"
RESTORE_DIR="/restore"
ROLLBACK_DIR="/rollback"

echo "========================================"
echo "PostgreSQL production replacement"
echo "========================================"

echo
echo "Checking restored database..."
if [ ! -f "$RESTORE_DIR/PG_VERSION" ]; then
    echo "ERROR: restored volume does not contain a PostgreSQL data directory."
    exit 1
fi
echo "Restored database is valid."

echo
echo "Checking current production database..."
if [ ! -f "$PRODUCTION_DIR/PG_VERSION" ]; then
    echo "ERROR: production volume does not contain a PostgreSQL data directory."
    exit 1
fi
echo "Current production database is valid."

echo
echo "Checking rollback volume..."
if [ -n "$(find "$ROLLBACK_DIR" -mindepth 1 -maxdepth 1 -print -quit)" ]; then
    echo "ERROR: rollback volume is not empty."
    echo "Refusing to overwrite the existing rollback."
    exit 1
fi
echo "Rollback volume is empty."

echo
echo "Step 1: Creating rollback of current production..."
tar -C "$PRODUCTION_DIR" -cf - . \
    | tar -C "$ROLLBACK_DIR" -xf -
echo "Current production copied to rollback volume."

echo
echo "Step 2: Removing production data..."
find "$PRODUCTION_DIR" \
    -mindepth 1 \
    -maxdepth 1 \
    -exec rm -rf -- {} +
echo "Production volume is empty."

echo
echo "Step 3: Copying restored database into production..."
tar -C "$RESTORE_DIR" -cf - . \
    | tar -C "$PRODUCTION_DIR" -xf -
echo "Restored database copied into production."

echo
echo "========================================"
echo "Production replacement completed"
echo "========================================"
