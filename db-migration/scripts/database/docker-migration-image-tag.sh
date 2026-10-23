#!/usr/bin/env bash

set -euo pipefail

source ./scripts/root-path-resolver.sh
source "$PROJECT_ROOT/scripts/docker/docker-image-tag.sh"

tag_docker_image
