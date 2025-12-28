const { execSync } = require('child_process');

const projectRoot = process.cwd();

function runLintFix() {
  try {
    console.log('🔍 Running ESLint with auto-fix...');
    execSync('npm run lint:fix', {
      cwd: projectRoot,
      stdio: 'inherit',
      encoding: 'utf8',
    });
    return true;
  } catch (error) {
    console.error('ESLint auto-fix failed:', error);
    return false;
  }
}

function runFormat() {
  try {
    console.log('💅 Running Prettier formatting...');
    execSync('npm run format', {
      cwd: projectRoot,
      stdio: 'inherit',
      encoding: 'utf8',
    });
    return true;
  } catch (error) {
    console.error('Prettier formatting failed:', error);
    return false;
  }
}

function stageFixedFiles() {
  try {
    console.log('\n📦 Staging auto-fixed files...');
    execSync('git add .', {
      cwd: projectRoot,
      stdio: 'pipe',
      encoding: 'utf8',
    });
    console.log('✅ Files staged successfully');
    return true;
  } catch (error) {
    console.error('Failed to stage files:', error.message);
    return false;
  }
}

function checkAll() {
  console.log('🚀 Starting pre-commit checks...\n');

  const lintFixSuccess = runLintFix();
  const formatSuccess = runFormat();

  if (!lintFixSuccess || !formatSuccess) {
    console.error('\n❌ Auto-fix failed. Please check the errors above.');
    return false;
  }

  console.log('\n✅ Auto-fix completed. Running final checks...\n');
  return true;
}

if (require.main === module) {
  const success = checkAll();

  if (success) {
    stageFixedFiles();
    process.exit(0);
  } else {
    process.exit(1);
  }
}

module.exports = {
  runLintFix,
  runFormat,
  stageFixedFiles,
  checkAll,
};
