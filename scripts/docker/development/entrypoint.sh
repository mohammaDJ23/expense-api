#!/bin/bash

set -eu

docker-compose -f docker-compose.development.yml up --build --watch
