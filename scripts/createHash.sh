#!/usr/bin/env bash

set -euo pipefail

echo "$$_$(date +%s%N)" | md5sum | cut -d' ' -f1
