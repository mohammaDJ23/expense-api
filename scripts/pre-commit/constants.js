const BRANCHES = ['feature', 'chore', 'release', 'refactor', 'fix', 'hotfix', 'docs', 'config'];

const COMMITS = [
  'feature',
  'feat',
  'improvement',
  'enhancement',
  'optimization',
  'fix',
  'perf',
  'performance',
  'hotfix',
  'config',
  'security',
  'breaking',
  'docs',
  'readme',
  'style',
  'refactor',
  'test',
  'build',
  'ci',
  'cd',
  'chore',
  'revert',
  'rollback',
  'release',
];

const BRANCH_NAME_REGEX = new RegExp(`^(${BRANCHES.join('|')})/\\d+--[a-z0-9-]+$`, 'i');

const COMMIT_MSG_REGEX = new RegExp(`^(${COMMITS.join('|')}):\\s+\\d+\\s+.+$`, 'i');

module.exports = {
  BRANCHES,
  COMMITS,
  BRANCH_NAME_REGEX,
  COMMIT_MSG_REGEX,
};
