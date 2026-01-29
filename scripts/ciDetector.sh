#!/bin/bash

set -euo pipefail

detect_ci() {
  if [ -n "${GITHUB_ACTIONS:-}" ] || [ -n "${GITHUB_ACTION:-}" ]; then
    CI_PLATFORM="github"
    CI_WORKSPACE="${GITHUB_WORKSPACE:-$PWD}"
  elif [ -n "${GITLAB_CI:-}" ]; then
    CI_PLATFORM="gitlab"
    CI_WORKSPACE="${CI_PROJECT_DIR:-$PWD}"
  elif [ -n "${CIRCLECI:-}" ]; then
    CI_PLATFORM="circleci"
    CI_WORKSPACE="${CIRCLE_WORKING_DIRECTORY:-$PWD}"
  elif [ -n "${JENKINS_URL:-}" ]; then
    CI_PLATFORM="jenkins"
    CI_WORKSPACE="${WORKSPACE:-$PWD}"
  else
    CI_PLATFORM="local"
    CI_WORKSPACE="$PWD"
  fi

  export CI_PLATFORM
  export CI_WORKSPACE
}

if [[ "${BASH_SOURCE[0]}" = "$0" ]]; then
  detect_ci
  echo "CI_PLATFORM=$CI_PLATFORM"
  echo "CI_WORKSPACE=$CI_WORKSPACE"
else
  detect_ci
fi
