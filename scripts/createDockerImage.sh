#!/bin/bash

set -e

IMAGE_NAME="$1"
BUILD_DIR="$2"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info() {
  printf "${BLUE}[INFO]${NC} %s\n" "$1"
}

log_success() {
  printf "${GREEN}[SUCCESS]${NC} %s\n" "$1"
}

log_warning() {
  printf "${YELLOW}[WARNING]${NC} %s\n" "$1"
}

log_error() {
  printf "${RED}[ERROR]${NC} %s\n" "$1"
}

validate_args() {
  if [ -z "${IMAGE_NAME}" ] || [ -z "${BUILD_DIR}" ]; then
    log_error "Usage: $0 <image_name> <build_directory>"
    log_error "Example: $0 myapp ./app-directory"
    return 1
  fi
  
  if [ ! -d "${BUILD_DIR}" ]; then
    log_error "Build directory not found: ${BUILD_DIR}"
    return 1
  fi
  
  if [ ! -f "${BUILD_DIR}/Dockerfile" ]; then
    log_error "Dockerfile not found in ${BUILD_DIR}"
    log_error "Looking for: ${BUILD_DIR}/Dockerfile"
    return 1
  fi
  
  log_success "Arguments validated successfully"
  return 0
}

check_env_vars() {
  local required_vars=("DOCKER_USERNAME" "DOCKER_PASSWORD" "SNYK_TOKEN")
  local missing_vars=()
  
  for var in "${required_vars[@]}"; do
    if [ -z "${!var}" ]; then
      missing_vars+=("$var")
    fi
  done
  
  if [ ${#missing_vars[@]} -gt 0 ]; then
    log_error "Missing required environment variables: ${missing_vars[*]}"
    return 1
  fi
  
  log_success "All required environment variables are set"
}

check_global_vars() {
  local scripts_dir="./scripts/common"
  
  if [ ! -d "${scripts_dir}" ]; then
    log_error "Scripts directory not found: ${scripts_dir}"
    return 1
  fi
  
  if [ ! -x "${scripts_dir}/createHash.sh" ]; then
    log_error "Hash script not found or not executable: ${scripts_dir}/createHash.sh"
    return 1
  fi
  
  HASH="$("${scripts_dir}/createHash.sh")"
  if [ -z "${HASH}" ]; then
    log_error "createHash.sh returned empty value"
    return 1
  fi
  
  if [ ! -x "${scripts_dir}/appName.sh" ]; then
    log_error "App name script not found or not executable: ${scripts_dir}/appName.sh"
    return 1
  fi
  
  APP_NAME="$("${scripts_dir}/appName.sh")"
  if [ -z "${APP_NAME}" ]; then
    log_error "appName.sh returned empty value"
    return 1
  fi
  
  return 0
}

setup_image_vars() {
  log_info "Setting up image variables..."
  
  IMAGE="${DOCKER_USERNAME}-${APP_NAME}/${IMAGE_NAME}"
  IMAGE_TAG=$(echo "${IMAGE}:${HASH}" | tr '[:upper:]' '[:lower:]')
  IMAGE_LATEST=$(echo "${IMAGE}:latest" | tr '[:upper:]' '[:lower:]')
  
  log_success "Image variables are created:"
  log_success "    HASH: ${HASH}"
  log_success "    IMAGE_TAG: ${IMAGE_TAG}"
  log_success "    IMAGE_LATEST: ${IMAGE_LATEST}"
  
  return 0
}

build_image() {
  log_info "Building Docker image:"
  log_info "    ${IMAGE_TAG}"
  log_info "    ${IMAGE_LATEST}"
  
  docker build \
    -t "${IMAGE_TAG}" \
    -t "${IMAGE_LATEST}" \
    "${BUILD_DIR}"
  
  log_success "Image built successfully:"
  log_success "    ${IMAGE_TAG}"
  log_success "    ${IMAGE_LATEST}"
}

scan_trivy() {
  log_info "Scanning with Trivy..."
  
  if ! trivy image \
      --format table \
      --exit-code 1 \
      --severity CRITICAL,HIGH \
      --ignore-unfixed \
      --skip-dirs /usr/local/lib/node_modules/npm \
      "${IMAGE_LATEST}"; then
    log_error "Trivy scan found critical/high vulnerabilities"
    return 1
  fi
  
  log_success "Trivy scan passed"
}

scan_docker_scout() {
  log_info "Scanning with Docker Scout..."
  
  if ! docker scout cves \
      --exit-code \
      --only-severity critical,high \
      --ignore-base \
      "${IMAGE_LATEST}"; then
    log_error "Docker Scout scan found some vulnerabilities"
    return 1
  fi
  
  log_success "Docker Scout scan passed"
}

scan_snyk() {
  log_info "Scanning with Snyk..."
  
  if ! snyk container test "${IMAGE_LATEST}" \
      --severity-threshold=high \
      --exit-code=1 \
      --exclude=/usr/local/lib/node_modules/npm; then
    log_error "Snyk scan found some vulnerabilities"
    return 1
  fi
  
  log_success "Snyk scan passed"
}

push_to_dockerhub() {
  log_info "Logging into Docker Hub..."
  echo "${DOCKER_PASSWORD}" | docker login -u "${DOCKER_USERNAME}" --password-stdin
  
  log_info "Pushing image to Docker Hub:"
  log_info "    ${IMAGE_TAG}"
  log_info "    ${IMAGE_LATEST}"

  docker push "${IMAGE_TAG}"
  docker push "${IMAGE_LATEST}"
  
  log_success "Image pushed successfully to Docker Hub"
}

cleanup() {
  log_info "Cleaning up..."
  
  docker logout || true
  
  docker rmi -f "${IMAGE_TAG}" 2>/dev/null || true
  docker rmi -f "${IMAGE_LATEST}" 2>/dev/null || true
  
  log_success "Cleanup completed"
}

main() {
  log_info "Starting Docker image build and security scan process"
  log_info "Image: ${IMAGE_NAME}"
  log_info "Build directory: ${BUILD_DIR}"
  
  validate_args &&
  check_env_vars &&
  check_global_vars &&
  setup_image_vars &&
  build_image &&
  scan_trivy &&
  scan_docker_scout &&
  scan_snyk &&
  push_to_dockerhub
  
  local exit_code=$?
  
  if [ $exit_code -eq 0 ]; then
    log_success "All steps completed successfully!"
  else
    log_error "Process failed with exit code: $exit_code"
  fi
  
  return $exit_code
}

trap cleanup EXIT

main
exit $?
