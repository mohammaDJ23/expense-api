#!/bin/sh

set -euo pipefail

/usr/local/bin/supercronic /etc/backup.cron &
SUPERCRONIC_PID=$!

exec /usr/local/bin/docker-entrypoint.sh "$@"
