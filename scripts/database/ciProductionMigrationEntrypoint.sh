#!/usr/bin/env bash

set -euo pipefail

ENVIRONMENT="production"

source ./scripts/database/migration.sh
