#!/usr/bin/env bash

set -euo pipefail

wal-g backup-push /var/lib/postgresql/data

wal-g delete retain FIND_FULL 2 --confirm
