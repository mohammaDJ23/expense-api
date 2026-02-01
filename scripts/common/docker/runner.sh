#!/usr/bin/env bash

set -eu

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
    local -r timeout=180
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

push_to_dockerhub() {
    log_info "Pushing to Dockerhub..."
 
    local service_image=$(docker service inspect "${SERVICE_NAME}" --format '{{.Spec.TaskTemplate.ContainerSpec.Image}}' 2>/dev/null)
    
    if [ -z "${service_image}" ] || [ "${service_image}" = "<no value>" ]; then
        log_error "Could not find image for service: ${SERVICE_NAME}"
        return 1
    fi
    
    local image_without_tag="${service_image%:*}"
    
    local latest_image="${image_without_tag}:latest"
    
    if docker tag "${service_image}" "${latest_image}"; then
        log_success "Tagged: ${service_image} -> ${latest_image}"
    else
        log_error "Failed to tag image"
        return 1
    fi
    
    log_info "Pushing images to Docker Hub..."
    
    if docker push "${service_image}"; then
        log_success "Pushed: ${service_image}"
    else
        log_error "Failed to push: ${service_image}"
        return 1
    fi
    
    if docker push "${latest_image}"; then
        log_success "Pushed: ${latest_image}"
        return 0
    else
        log_error "Failed to push: ${latest_image}"
        return 1
    fi
}

cleanup() {
    docker stack rm "${STACK_NAME}" >/dev/null 2>&1 || true
    
    sleep 10
    
    docker service ls --filter "label=com.docker.stack.namespace=${STACK_NAME}" -q | xargs -r docker service rm >/dev/null 2>& || true
    
    docker swarm leave --force >/dev/null 2>& || true
    
    docker ps -a --filter "label=com.docker.stack.namespace=${STACK_NAME}" -q | xargs -r docker rm -f >/dev/null 2>& || true
    
    docker network ls --filter "label=com.docker.stack.namespace=${STACK_NAME}" -q | xargs -r docker network rm >/dev/null 2>& || true
    
    docker image prune -f >/dev/null 2>& || true

    docker system prune -f --volumes >/dev/null 2>& || true
}

trap cleanup EXIT ERR
