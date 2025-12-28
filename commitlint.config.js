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

module.exports = {
  rules: {
    // Custom rule to validate your commit message format
    'commit-message-format': [2, 'always'],
  },
  plugins: [
    {
      rules: {
        'commit-message-format': ({ header }) => {
          // Regex to validate commit message format
          const COMMIT_MSG_REGEX = new RegExp(`^(${COMMITS.join('|')}):\\s+\\d+\\s+.+$`, 'i');

          if (!COMMIT_MSG_REGEX.test(header)) {
            return [
              false,
              `Commit message must follow the format: <type>: <id> <description>\n` +
                `Allowed types: ${COMMITS.join(', ')}\n` +
                `Example: feat: 123 Add user authentication feature\n` +
                `Your message: "${header}"`,
            ];
          }

          // Extract ID from commit message
          const match = header.match(/^[^:]+:\s+(\d+)/);
          const commitId = match ? match[1] : null;

          // Get current branch name
          const branchName = require('child_process')
            .execSync('git branch --show-current', { encoding: 'utf-8' })
            .trim();

          // Extract ID from branch name if it follows pattern: <type>/<id>--<description>
          const branchMatch = branchName.match(/\/(\d+)--/);
          const branchId = branchMatch ? branchMatch[1] : null;

          // Check if IDs match
          if (branchId && commitId && branchId !== commitId) {
            return [
              false,
              `Commit ID (${commitId}) does not match branch ID (${branchId})\n` +
                `Branch: ${branchName}\n` +
                `Commit: ${header}\n` +
                `They must have the same ID number.`,
            ];
          }

          return [true];
        },
      },
    },
  ],
};
