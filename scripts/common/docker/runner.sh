#!/usr/bin/env bash

set -euo pipefail

check_daemon() {
    if docker info >/dev/null 2>&1; then
        log_success "Docker daemon is running"
        return 0
    fi
    log_error "Docker daemon is not running"
    return 1
}

docker_compose() {
    local cmd=""
    
    if command -v docker-compose >/dev/null 2>&1; then
        cmd="docker-compose"
    elif docker compose version >/dev/null 2>&1; then
        cmd="docker compose"
    else
        log_error "Docker Compose not found"
        return 1
    fi
    
    ${cmd} -f "${COMPOSE_FILE}" "$@"
}

run_compose() {
    log_info "Starting the services..."

    docker_compose up --build -d

    if [ $? -eq 0 ]; then
        log_success "Services started successfully"
        return 0
    else
        log_error "Failed to start services"
        return 1
    fi
}

wait_for_compose() {
    local -r timeout=120
    
    log_info "Waiting for containers to be healthy (max ${timeout}s)..."
    
    local start_time=$(date +%s)
    local end_time=$((start_time + timeout))
    local failed_containers=""
    
    while [ $(date +%s) -lt "${end_time}" ]; do
        local containers=$(docker_compose ps -q 2>/dev/null)
        
        local total=$(echo "${containers}" | grep -c . || echo "0")
        
        if [ "${total}" -eq 0 ]; then
            log_warning "No containers running"
            sleep 1
            continue
        fi
        
        local ready=0
        
        while IFS= read -r container_id; do
            [ -z "${container_id}" ] && continue
            
            local status=$(docker inspect "${container_id}" --format '{{.State.Status}}' 2>/dev/null)
            local health=$(docker inspect "${container_id}" --format '{{if .State.Health}}{{.State.Health.Status}}{{else}}none{{end}}' 2>/dev/null)
            local name=$(docker inspect "${container_id}" --format '{{.Name}}' 2>/dev/null | sed 's/\///g')

            if [ "${status}" = "running" ]; then
                if [ "${health}" = "none" ] || [ "${health}" = "healthy" ]; then
                    ((ready++))
                else
                    docker logs "${container_id}"
                    failed_containers="${name} (health: ${health})"
                fi
            else
                docker logs "${container_id}"
                failed_containers="${name} (status: ${status})"
            fi
        done <<< "${containers}"
        
        if [ "${ready}" -eq "${total}" ] && [ "${total}" -gt 0 ]; then
            local elapsed=$(( $(date +%s) - start_time ))
            log_success "All ${total} containers ready after ${elapsed}s"
            return 0
        fi
        
        local elapsed=$(( $(date +%s) - start_time ))
        log_info "[${elapsed}s] ${ready}/${total} ready..."
        
        sleep 1
    done
    
    log_error "Timeout: Containers not ready within ${timeout}s"
    
    if [ -n "${failed_containers}" ]; then
        log_error "Failed containers: ${failed_containers}"
        
        log_error "Container statuses:"
        docker_compose ps
    else
        log_error "No specific container detected as failed"
    fi
    
    return 1
}

show_status() {
    log_info "Containers status:"
    
    if docker_compose ps; then
        return 0
    fi
    
    log_error "Failed to get containers status"
    return 1
}

push_to_dockerhub() {
    log_info "Pushing to Dockerhub..."
    
    local image_without_tag="${IMAGE_NAME%:*}"
    
    local latest_image="${image_without_tag}:latest"
    
    if docker tag "${IMAGE_NAME}" "${latest_image}"; then
        log_success "Tagged: ${IMAGE_NAME} -> ${latest_image}"
    else
        log_error "Failed to tag image"
        return 1
    fi
    
    log_info "Pushing images to Docker Hub..."
    
    if docker push "${IMAGE_NAME}" && docker push "${latest_image}"; then
        log_success "Pushed: ${IMAGE_NAME} and ${latest_image}"
        return 0
    else
        log_error "Failed to push images"
        return 1
    fi
}

cleanup() {
    local exit_code=$?
    
    if [ "${exit_code}" -ne 0 ]; then
        docker_compose down -v >/dev/null 2>&1 || true
    fi
    
    docker image prune -f >/dev/null 2>&1 || true
}

trap cleanup EXIT ERR INT TERM
