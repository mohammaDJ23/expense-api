#!/usr/bin/env bash

set -euo pipefail

source ./scripts/logs.sh
source ./scripts/docker/vars.sh
source ./scripts/docker/validations.sh
source ./scripts/docker/runner.sh
source ./scripts/docker/pipelines.sh

run_step() {
    local step="$1"
    
    if ! declare -f "${step}" >/dev/null 2>&1; then
        log_error "Step '${step}' not found"
        return 1
    fi
    
    $step

    local exit_code=$?

    if [ "${exit_code}" -ne 0 ]; then
        return $exit_code
    fi
    
    return 0
}

run_pipeline() {
    local pipeline_func="${PIPELINES[${PIPELINE}]}"
    
    if [ -z "${pipeline_func}" ] || ! declare -f "${pipeline_func}" >/dev/null 2>&1; then
        log_error "Pipeline for pipeline '${PIPELINE}' not found"
        return 1
    fi
    
    $pipeline_func
    
    return $?
}

main() {
    init_vars && check_args

    local exit_code=$?

    if [ "${exit_code}" -ne 0 ]; then
        return $exit_code
    fi
    
    run_pipeline

    return $?
}

main "$@"

exit $?
