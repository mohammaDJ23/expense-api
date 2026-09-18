#!/usr/bin/env bash

set -euo pipefail

export AWS_ACCESS_KEY_ID="$(cat /run/secrets/arvan_access_key)"
export AWS_SECRET_ACCESS_KEY="$(cat /run/secrets/arvan_secret_key)"

exec "$@"
