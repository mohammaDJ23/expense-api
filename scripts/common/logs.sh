#!/usr/bin/env bash

set -eu

RESET='\033[0m'
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
CYAN='\033[0;36m'

log_info() {
  echo -e "${CYAN}[INFO]${RESET} $1"
}

log_success() {
  echo -e "${GREEN}[SUCCESS]${RESET} $1"
}

log_error() {
  echo -e "${RED}[ERROR]${RESET} $1" >&2
}

log_warning() {
  echo -e "${YELLOW}[WARNING]${RESET} $1"
}
