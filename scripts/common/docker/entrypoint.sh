#!/usr/bin/env bash

set -eu

source ./scripts/common/logs.sh
source ./scripts/common/docker/vars.sh
source ./scripts/common/docker/validations.sh
source ./scripts/common/docker/runner.sh
source ./scripts/common/docker/pipelines.sh

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
    local pipeline_func="${PIPELINES[${MODE}]}"
    
    if [ -z "${pipeline_func}" ] || ! declare -f "${pipeline_func}" >/dev/null 2>&1; then
        log_error "Pipeline for mode '${MODE}' not found"
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

exit=$?
