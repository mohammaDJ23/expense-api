#!/usr/bin/env bash

set -euo pipefail

RESET='\033[0m'
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
CYAN='\033[0;36m'

log_info() {
  printf "${CYAN}[INFO]${RESET} %s\n" "$1"
}

log_success() {
  printf "${GREEN}[SUCCESS]${RESET} %s\n" "$1"
}

log_error() {
  printf "${RED}[ERROR]${RESET} %s\n" "$1" >&2
}

log_warning() {
  printf "${YELLOW}[WARNING]${RESET} %s\n" "$1"
}
