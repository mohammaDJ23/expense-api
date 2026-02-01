#!/usr/bin/env bash

set -eu

declare -A PIPELINES
PIPELINES=(
    ["development"]="development_pipeline"
    ["ci"]="ci_pipeline"
    ["ci_production"]="ci_production_pipeline"
    ["production"]="production_pipeline"
)
readonly PIPELINES

development_pipeline() {
    run_step "check_daemon" &&
    run_step "init_swarm" &&
    run_step "setup_secrets" &&
    run_step "build_all_services" &&
    run_step "deploy_stack" &&
    run_step "wait_for_services" &&
    run_step "show_status"

    return $?
}

ci_pipeline() {
    run_step "check_daemon" &&
    run_step "init_swarm" &&
    run_step "setup_secrets" &&
    run_step "build_all_services" &&
    run_step "deploy_stack" &&
    run_step "wait_for_services" &&
    run_step "show_status" &&
    run_step "cleanup"

    return $?
}

ci_production_pipeline() {
    run_step "check_daemon" &&
    run_step "init_swarm" &&
    run_step "setup_secrets" &&
    run_step "build_all_services" &&
    run_step "deploy_stack" &&
    run_step "wait_for_services" &&
    run_step "show_status" &&
    run_step "push_to_dockerhub"
    run_step "cleanup"

    return $?
}
