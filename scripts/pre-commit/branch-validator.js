const { execSync } = require('child_process');

const { BRANCH_NAME_REGEX, BRANCHES } = require('./constants');

function getCurrentBranch() {
  try {
    return execSync('git symbolic-ref --short HEAD', {
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'ignore'],
    }).trim();
  } catch (error) {
    console.error(error);
    console.log('Failed to get the current branch. trying another way...');
    try {
      return execSync('git branch --show-current', {
        encoding: 'utf8',
        stdio: ['pipe', 'pipe', 'ignore'],
      }).trim();
    } catch (error) {
      console.error(error);
      return process.env.GIT_BRANCH || 'unknown';
    }
  }
}

function validateBranchName(branchName = null) {
  const currentBranch = branchName || getCurrentBranch();
  const errors = [];
  const warnings = [];

  if (['master'].includes(currentBranch)) {
    return { isValid: true, errors, warnings, branchName: currentBranch };
  }

  if (!BRANCH_NAME_REGEX.test(currentBranch)) {
    errors.push(
      `Branch name "${currentBranch}" does not match required format.`,
      `Expected format: <type>/<id>--<description>`,
      `Valid types: ${BRANCHES.join(', ')}`,
      `Example: feature/123456--add-user-authentication`,
    );
    return { isValid: false, errors, warnings, branchName: currentBranch };
  }

  const [type, rest] = currentBranch.split('/');
  const [id, ...descriptionParts] = rest.split('--');
  const description = descriptionParts.join('--');

  if (!/^\d+$/.test(id)) {
    errors.push(`Branch ID "${id}" must be numeric only`);
  }

  if (!BRANCHES.includes(type.toLowerCase())) {
    errors.push(`Branch type "${type}" is not valid.`, `Valid types: ${BRANCHES.join(', ')}`);
  }

  if (!description || description.length < 3) {
    errors.push('Description must be at least 3 characters long');
  }

  if (description.length > 150) {
    warnings.push('Description should be concise (max 150 chars recommended)');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    branchName: currentBranch,
    parsed: { type, id, description },
  };
}

function getBranchId(branchName = null) {
  const validation = validateBranchName(branchName);
  if (validation.isValid && validation.parsed) {
    return validation.parsed.id;
  }
  return null;
}

function validateCurrentBranch() {
  const result = validateBranchName();

  if (result.isValid) {
    console.log('✓ Branch name is valid');
    if (result.warnings.length > 0) {
      result.warnings.forEach((warning) => console.log(`⚠ ${warning}`));
    }
  } else {
    console.error('✗ Branch name validation failed:');
    result.errors.forEach((error) => console.error(`  • ${error}`));
    process.exit(1);
  }
}

if (require.main === module) {
  validateCurrentBranch();
}

module.exports = {
  getCurrentBranch,
  validateBranchName,
  getBranchId,
  validateCurrentBranch,
};
