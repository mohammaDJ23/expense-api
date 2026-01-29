#!/bin/bash

set -eu

echo "$$_$(date +%s%N)" | md5sum | cut -d' ' -f1
