#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Running pre-commit checks...${NC}\n"

# Get the project root directory
PROJECT_ROOT="$(git rev-parse --show-toplevel)"
SCRIPTS_DIR="$PROJECT_ROOT/scripts/pre-commit"

# Function to print section headers
print_header() {
  echo -e "\n${BLUE}=== $1 ===${NC}"
}

# Function to handle errors
handle_error() {
  echo -e "\n${RED}❌ $1${NC}"
  echo -e "${YELLOW}Pre-commit hook failed. Please fix the issues above.${NC}"
  exit 1
}

# Function to print success
print_success() {
  echo -e "\n${GREEN}✅ $1${NC}"
}

# 1. Check for staged files
print_header "Checking for staged files"
STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM)
if [ -z "$STAGED_FILES" ]; then
  echo "No files staged for commit. Skipping pre-commit checks."
  exit 0
fi
print_success "Found $(echo "$STAGED_FILES" | wc -l | tr -d ' ') staged file(s)"

# 2. Validate branch name
print_header "Validating branch name"
if node "$SCRIPTS_DIR/branch-validator.js"; then
  print_success "Branch name is valid"
else
  handle_error "Branch name validation failed"
fi

# 3. Validate commit message
print_header "Validating commit message"
if node "$SCRIPTS_DIR/commit-validator.js"; then
  print_success "Commit message is valid"
else
  handle_error "Commit message validation failed"
fi

# 4. Run linting and formatting checks
print_header "Running code quality checks"
if node "$SCRIPTS_DIR/lint-checker.js"; then
  print_success "All code quality checks passed"
else
  handle_error "Code quality checks failed"
fi

# 5. Final success message
echo -e "\n${GREEN}========================================${NC}"
echo -e "${GREEN}🎉 All pre-commit checks passed!${NC}"
echo -e "${GREEN}========================================${NC}\n"
