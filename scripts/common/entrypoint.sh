#!/usr/bin/env bash

set -eu

source ./scripts/common/logs.sh

readonly APP_NAME="$(source ./scripts/common/appName.sh)"

readonly ENVIRONMENT="${INPUT_ENVIRONMENT:-${ENVIRONMENT:-}}"
readonly MODE="${INPUT_MODE:-${MODE:-}}"
readonly SECRETS="${INPUT_SECRETS:-${SECRETS:-}}"
readonly CLEANUP_ON_SUCCESS="${INPUT_CLEANUP_ON_SUCCESS:-${CLEANUP_ON_SUCCESS:-"true"}}"

check_args() {
  if [ -z "${ENVIRONMENT}" ] || [ -z "${MODE}" ]; then
    log_error "Missing required configuration"
    log_error "The following environment variables must be set:"
    log_error "ENVIRONMENT=production MODE=production ./entrypoint.sh"
  fi
  
  if [[ ! "${ENVIRONMENT}" =~ ^(development|production)$ ]]; then
    log_error "Invalid ENVIRONMENT value: '${ENVIRONMENT}'"
    log_error "Valid values: development or production"
    return 1
  fi
  
  if [[ ! "${MODE}" =~ ^(development|ci|production)$ ]]; then
    log_error "Invalid MODE value: '${MODE}'"
    log_error "Valid values: development, ci or production"
    return 1
  fi

  if [ -n "${SECRETS}" ]; then
    local -r pattern='^[a-zA-Z_][a-zA-Z0-9_]*=[^=;]*(;[a-zA-Z_][a-zA-Z0-9_]*=[^=;]*)*$'
    if [[ ! "${SECRETS}" =~ ${pattern} ]]; then
      log_error "Invalid SECRETS"
      log_error "The SECRETS pattern:"
      log_error "db_password=123;jwt_password=123"
      return 1
    fi
  fi
  
  return 0
}

init_variables() {
  readonly COMPOSE_FILE="docker-compose.swarm.${MODE}.yml"
  readonly STACK_NAME="${APP_NAME}-${MODE}"
  readonly SERVICE_NAME="${APP_NAME}-${MODE}_${APP_NAME}"
  readonly IMAGE_NAME="${APP_NAME}-${MODE}:latest"

  export IMAGE_NAME

  return 0
}

check_daemon() {
  if docker info >/dev/null 2>&1; then
    log_success "Docker daemon is running"
    return 0
  fi
  log_error "Docker daemon is not running"
  return 1
}

init_swarm() {
  local state
  state=$(docker info --format '{{.Swarm.LocalNodeState}}' 2>/dev/null)
  
  if [ "${state}" = "error" ]; then
    log_warning "Swarm is in error state, attempting recovery..."
    
    local leave_success="false"
    
    for i in {1..5}; do
      log_info "Attempt $i: Leaving swarm..."
      if docker swarm leave --force 2>/dev/null; then
        leave_success="true"
        break
      fi
      sleep 1
    done
    
    if [ "$leave_success" = "false" ]; then
      log_error "Failed to leave swarm after 5 attempts"
      return 1
    fi
  fi
  
  state=$(docker info --format '{{.Swarm.LocalNodeState}}' 2>/dev/null)
  
  if [ -z "${state}" ] || [ "${state}" = "inactive" ]; then
    log_info "Initializing Docker Swarm..."
    
    if docker swarm init --advertise-addr 127.0.0.1 >/dev/null 2>&1 || \
       docker node ls >/dev/null 2>&1; then
      log_success "Swarm ready"
      return 0
    else
      log_error "Swarm initialization failed"
      return 1
    fi
  elif [ "${state}" = "active" ]; then
    log_success "Swarm already active"
    return 0
  else
    log_warning "Swarm is in '${state}' state"
    if docker node ls >/dev/null 2>&1; then
      log_success "Swarm is usable despite '${state}' state"
      return 0
    fi
    
    return 1
  fi
}

setup_secrets() {
  log_info "Creating Docker secrets..."

  if [ -z "${SECRETS}" ]; then
    log_warning "No secrets detected"
    return 0
  fi
  
  IFS=';' read -ra secret_pairs <<< "${SECRETS}"
  
  for pair in "${secret_pairs[@]}"; do
    [ -z "${pair}" ] && continue
    
    IFS='=' read -r name value <<< "${pair}"
    
    if [ -z "${name}" ]; then
      continue
    fi
    
    if [ -z "${value}" ]; then
      log_warning "${name} has empty value, skipping"
      continue
    fi
    
    if docker secret inspect "${name}" >/dev/null 2>&1; then
      log_success "${name} (already exists)"
    else
      if echo "${value}" | docker secret create "${name}" - >/dev/null 2>&1; then
        log_success "${name} created"
      else
        log_error "Failed to create ${name}"
        return 1
      fi
    fi
  done

  return 0
}

build_all_services() {
  log_info "Building the images of the services..."
  local -r services_to_build=$(docker compose -f "${COMPOSE_FILE}" config --services 2>/dev/null || echo "")
  
  if [ $? -ne 0 ] || [ -z "${services_to_build}" ]; then
    log_error "Failed to get services list or no services found"
    return 1
  fi
  
  for service in $services_to_build; do
    log_info "Building: ${service}"

    if docker compose -f "${COMPOSE_FILE}" config --services | grep -q "^${service}$"; then
      if docker compose -f "${COMPOSE_FILE}" build "${service}"; then
        log_success "${service} built"
      else
        log_error "Failed to build ${service}"
        return 1
      fi
    else
      log_error "Could not find ${service}"
      return 1
    fi
  done
  
  log_success "All images built successfully"
  return 0
}

deploy_stack() {
  log_info "Deploying stack: ${STACK_NAME}..."
  
  if docker stack deploy -c "${COMPOSE_FILE}" "${STACK_NAME}"; then
    log_success "Stack deployed successfully"
    return 0
  else
    log_error "Failed to deploy stack"
    return 1
  fi
}

wait_for_services() {
  local -r timeout=60
  local -r interval=5
  
  log_info "Waiting for services (max ${timeout}s)..."
  
  local start_time=$(date +%s)
  local end_time=$((start_time + timeout))
  local last_failed_service_name=""
  
  while [ $(date +%s) -lt "${end_time}" ]; do
    local total=$(docker stack services "${STACK_NAME}" --format "{{.Name}}" 2>/dev/null | grep -c .)
    
    if [ "${total}" -eq 0 ]; then
      sleep 1
      continue
    fi
    
    local ready=0
    local replicas_list=$(docker stack services "${STACK_NAME}" --format "{{.Name}} {{.Replicas}}" 2>/dev/null)

    while IFS= read -r service_line; do
      [ -z "${service_line}" ] && continue
      
      local service_name=$(echo "${service_line}" | awk '{print $1}')
      local replicas=$(echo "${service_line}" | awk '{print $2}')
      local current=$(echo "${replicas}" | cut -d/ -f1)
      local desired=$(echo "${replicas}" | cut -d/ -f2)
      
      if [ "${current}" -eq "${desired}" ]; then
        ((ready++))
      else
        last_failed_service_name="${service_name}"
      fi
    done <<< "${replicas_list}"
    
    if [ "${ready}" -eq "${total}" ] && [ "${total}" -gt 0 ]; then
      local elapsed=$(( $(date +%s) - start_time ))
      log_success "All ${total} services ready after ${elapsed}s"
      return 0
    fi
    
    local elapsed=$(( $(date +%s) - start_time ))
    if [ $((elapsed % interval)) -eq 0 ]; then
      log_info "[${elapsed}s] ${ready}/${total} ready..."
    fi
    
    sleep 1
  done
  
  log_error "Timeout: Services not ready within ${timeout}s"

  if [ -n "${last_failed_service_name}" ]; then
    log_error "Last failed service: ${last_failed_service_name}"
    log_error "Service status:"

    docker service ps "${last_failed_service_name}" \
      --no-trunc \
      --format "
        Task:     {{.Name}}
        Status:   {{.CurrentState}}
        Node:     {{.Node}}
        Error:    {{.Error}}
        Image:    {{.Image}}
      " \
      2>/dev/null || true
  else
    log_error "No specific service detected as failed"
  fi
  
  return 1
}

show_status() {
  log_info "Services status:"
  
  if docker stack services "${STACK_NAME}"; then
    log_info "View logs: docker service logs --raw -f ${SERVICE_NAME}"
    return 0
  fi

  log_error "Failed to get stack services"
  return 1  
}

cleanup() {
  if docker stack ls | grep -q "${STACK_NAME}" 2>/dev/null; then
    log_info "Cleaning up Docker stack: ${STACK_NAME}..."
    docker stack rm "${STACK_NAME}" 2>/dev/null || true
  fi
}

trap cleanup ERR

main() {
  check_args &&
  init_variables &&
  check_daemon &&
  init_swarm &&
  setup_secrets &&
  build_all_services &&
  deploy_stack &&
  wait_for_services &&
  show_status

  local exit_code=$?
  
  if [ $exit_code -eq 0 ]; then
    log_success "All steps completed successfully!"
    if [ "${CLEANUP_ON_SUCCESS}" = "true" ]; then
      cleanup
    fi
  else
    log_error "Process failed with exit code: $exit_code"
  fi
  
  return $exit_code
}

main "$@"

exit $?
