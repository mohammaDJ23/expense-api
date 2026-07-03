#!/usr/bin/env bash

set -euo pipefail

/usr/local/bin/supercronic /etc/dbBackup.cron &
SUPERCRONIC_PID=$!

exec /usr/local/bin/docker-entrypoint.sh "$@"
