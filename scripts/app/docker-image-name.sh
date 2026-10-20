#!/usr/bin/env bash

set -euo pipefail

source ./scripts/docker/createVersionedDockerImageName.sh
source ./scripts/docker/createLatestDockerImageName.sh

IMAGE="mohammadnowresideh1997/expense-api-production"

create_versioned_docker_image_name "${IMAGE}"
create_latest_docker_image_name "${IMAGE}"
