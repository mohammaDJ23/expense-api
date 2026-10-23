#!/usr/bin/env bash

set -euo pipefail

source ./scripts/root-path-resolver.sh
source "$PROJECT_ROOT/scripts/docker/docker-image-versioned-name.sh"
source "$PROJECT_ROOT/scripts/docker/docker-image-latest-name.sh"

IMAGE="mohammadnowresideh1997/expense-api-production-db-migration"

create_versioned_docker_image_name "${IMAGE}"
create_latest_docker_image_name "${IMAGE}"
