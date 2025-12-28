const { execSync } = require('child_process');
const fs = require('fs');

const { validateBranchName, getBranchId } = require('./branch-validator');
const { COMMIT_MSG_REGEX, COMMITS } = require('./constants');

function getCommitMessage() {
  try {
    const commitMsgFile =
      process.env.HUSKY_GIT_PARAMS || process.env.GIT_PARAMS || '.git/COMMIT_EDITMSG';

    if (fs.existsSync(commitMsgFile)) {
      return fs.readFileSync(commitMsgFile, 'utf8').trim();
    }

    return execSync('git log -1 --pretty=%B', {
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'ignore'],
    }).trim();
  } catch (error) {
    console.error(error);
    return '';
  }
}

function parseCommitMessage(message) {
  const lines = message.split('\n');
  const subject = lines[0].trim();
  const body = lines
    .slice(1)
    .filter((line) => line.trim())
    .join('\n');

  return { subject, body, fullMessage: message };
}

function validateCommitMessage(commitMessage = getCommitMessage()) {
  const errors = [];
  const warnings = [];

  if (!commitMessage || commitMessage.trim() === '') {
    errors.push('Commit message cannot be empty');
    return { isValid: false, errors, warnings };
  }

  const { subject, body } = parseCommitMessage(commitMessage);

  if (!COMMIT_MSG_REGEX.test(subject)) {
    errors.push(
      'Commit message subject does not match required format.',
      'Expected format: <type>: <branch-id> <description>',
      'Example: feat: 123456 add user authentication feature',
      `Valid types: ${COMMITS.join(', ')}`,
    );
    return { isValid: false, errors, warnings, subject, body };
  }

  const match = subject.match(/^(\w+):\s+(\d+)\s+(.*)/);
  if (!match) {
    errors.push('Unable to parse commit message');
    return { isValid: false, errors, warnings, subject, body };
  }

  const [, type, commitId, description] = match;

  const normalizedType = type.toLowerCase();
  if (!COMMITS.includes(normalizedType)) {
    errors.push(`Commit type "${type}" is not recognized.`, `Valid types: ${COMMITS.join(', ')}`);
  }

  if (description.length < 3) {
    errors.push('Description must be at least 3 characters long');
  }

  const branchId = getBranchId();
  if (branchId && commitId !== branchId) {
    errors.push(`Commit ID (${commitId}) doesn't match branch ID (${branchId})`);
  }

  if (body && body.length > 1000) {
    warnings.push('Commit body is long. Consider breaking into multiple commits.');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    parsed: { type: normalizedType, id: commitId, description, body },
    subject,
    body,
  };
}

function suggestCommitMessage() {
  const branchValidation = validateBranchName();
  if (!branchValidation.isValid || !branchValidation.parsed) {
    return null;
  }

  const { type, id, description } = branchValidation.parsed;

  const commitType = COMMITS[type.toLowerCase()] || type.toLowerCase();

  const readableDesc = description.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

  return `${commitType}: ${id} ${readableDesc}`;
}

function runCommitValidation() {
  const result = validateCommitMessage();

  if (result.isValid) {
    console.log('✓ Commit message is valid');
    if (result.warnings.length > 0) {
      result.warnings.forEach((warning) => console.log(`⚠ ${warning}`));
    }

    const suggestion = suggestCommitMessage();
    if (suggestion) {
      console.log(`\nSuggested commit message for current branch:`);
      console.log(`  ${suggestion}`);
    }
  } else {
    console.error('✗ Commit message validation failed:');
    result.errors.forEach((error) => console.error(`  • ${error}`));
    process.exit(1);
  }
}

if (require.main === module) {
  runCommitValidation();
}

module.exports = {
  getCommitMessage,
  parseCommitMessage,
  validateCommitMessage,
  suggestCommitMessage,
  runCommitValidation,
};
