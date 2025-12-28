import path from 'node:path';
import { fileURLToPath } from 'node:url';

import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import importPlugin from 'eslint-plugin-import';
import jestPlugin from 'eslint-plugin-jest';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import securityPlugin from 'eslint-plugin-security';
import sonarjs from 'eslint-plugin-sonarjs';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

export default defineConfig([
  {
    ignores: [
      'dist/',
      'build/',
      '.nest/',

      'node_modules/',

      'coverage/',
      '.nyc_output/',
      'test-results/',

      '*.log',
      'logs/',
      'npm-debug.log*',
      'yarn-debug.log*',
      'yarn-error.log*',

      '.pnp.*',
      '.yarn/',
      '.yarnrc.yml',

      '.env',
      '.env.*',
      '!.env.example',

      '.vscode/',
      '.idea/',
      '*.swp',
      '*.swo',
      '*~',

      '.DS_Store',
      'Thumbs.db',

      '*.md',
      '!README.md',
      '!CONTRIBUTING.md',

      '*.json',
      '*.yml',
      '*.yaml',
      '*.toml',

      'Dockerfile',
      'Dockerfile.development',
      'Dockerfile.staging',
      'Dockerfile.production',
      'Dockerfile.ci',
      'docker-compose.yml',
      'docker-compose.development.yml',
      'docker-compose.staging.yml',
      'docker-compose.production.yml',
      '.dockerignore',

      '.eslintrc.js',
      '.eslintrc.*',
      'tsconfig.json',
      'tsconfig.*.json',
      'nest-cli.json',

      'package-lock.json',
      'yarn.lock',
      'pnpm-lock.yaml',

      'tmp/',
      'temp/',

      'eslint.config.mjs',
      'eslint.config.js',
      'eslint.config.cjs',
    ],
  },

  // Base ESLint recommended
  eslint.configs.recommended,

  // TypeScript strict configuration
  {
    files: ['**/*.ts'],
    extends: [...tseslint.configs.strictTypeChecked, ...tseslint.configs.stylisticTypeChecked],
  },

  // JavaScript configuration
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
        ...globals.es2022,
      },
    },
  },


  // Import plugin configuration
  {
    plugins: {
      import: importPlugin,
    },
    rules: {
      // Import rules
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          pathGroups: [
            {
              pattern: '@nestjs/**',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@/**',
              group: 'internal',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          'newlines-between': 'always',
        },
      ],
      'import/no-duplicates': 'error',
      'import/no-cycle': 'error',
      'import/no-useless-path-segments': 'error',
      'import/no-default-export': 'off',
      'import/no-named-as-default': 'error',
      'import/no-unresolved': 'error',
      'import/no-absolute-path': 'error',
      'import/namespace': 'off',
    },
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts'],
      },
      'import/resolver': {
        typescript: {
          project: path.join(_dirname, 'tsconfig.eslint.json'),
          alwaysTryTypes: true, // This helps with JS files importing TS modules
        },
        node: true,
      },
    },
  },

  // Unused imports plugin
  {
    plugins: {
      'unused-imports': unusedImports,
    },
    rules: {
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },

  // SonarJS plugin
  {
    plugins: {
      sonarjs,
    },
    rules: {
      ...sonarjs.configs.recommended.rules,
      'sonarjs/cognitive-complexity': ['error', 15],
      'sonarjs/no-duplicate-string': 'error',
      'sonarjs/no-all-duplicated-branches': 'error',
      'sonarjs/no-identical-functions': 'error',
      'sonarjs/no-small-switch': 'error',
      'sonarjs/no-use-of-empty-return-value': 'error',
      'sonarjs/prefer-immediate-return': 'error',
      'sonarjs/prefer-single-boolean-return': 'error',
      'sonarjs/no-os-command-from-path': 'off',
      'sonarjs/no-ignored-exceptions': 'off'
    },
  },

  // Security plugin
  {
    plugins: {
      security: securityPlugin,
    },
    rules: {
      'security/detect-object-injection': 'error',
      'security/detect-unsafe-regex': 'error',
      'security/detect-buffer-noassert': 'error',
      'security/detect-child-process': 'error',
      'security/detect-disable-mustache-escape': 'error',
      'security/detect-eval-with-expression': 'error',
      'security/detect-no-csrf-before-method-override': 'error',
      'security/detect-non-literal-fs-filename': 'off',
      'security/detect-non-literal-regexp': 'off',
      'security/detect-non-literal-require': 'error',
      'security/detect-pseudoRandomBytes': 'error',
      'security/detect-possible-timing-attacks': 'error',
    },
  },

  // Jest plugin (only for test files)
  {
    files: ['**/*.spec.ts', '**/*.test.ts'],
    plugins: {
      jest: jestPlugin,
    },
    rules: {
      ...jestPlugin.configs.recommended.rules,
    },
  },

  // Global configuration
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
        ...globals.es2022,
      },
      sourceType: 'module',
      parserOptions: {
        project: path.join(_dirname, 'tsconfig.eslint.json'),
        tsconfigRootDir: import.meta.dirname,
        warnOnUnsupportedTypeScriptVersion: false,
      },
    },
  },

  // Custom rules
  {
    files: ['**/*.ts'],
    rules: {
      // TypeScript Strict Rules
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'error',
      '@typescript-eslint/no-unsafe-call': 'error',
      '@typescript-eslint/no-unsafe-return': 'error',
      '@typescript-eslint/no-unsafe-argument': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
      ],
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
      '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-base-to-string': 'error',
      '@typescript-eslint/no-unnecessary-condition': 'error',
      '@typescript-eslint/no-import-type-side-effects': 'error',
      '@typescript-eslint/method-signature-style': ['error', 'property'],
      '@typescript-eslint/prefer-readonly': 'error',
      '@typescript-eslint/prefer-reduce-type-parameter': 'error',
      '@typescript-eslint/prefer-string-starts-ends-with': 'error',
      '@typescript-eslint/require-await': 'error',
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        { allowNumber: true, allowBoolean: true },
      ],
      '@typescript-eslint/no-unnecessary-type-constraint': 'error',
      '@typescript-eslint/no-redundant-type-constituents': 'error',
      '@typescript-eslint/no-meaningless-void-operator': 'error',
      '@typescript-eslint/no-extraneous-class': 'off',

      // Naming conventions
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'class',
          format: ['PascalCase'],
        },
        {
          selector: 'interface',
          format: ['PascalCase'],
          prefix: ['I'],
        },
        {
          selector: 'enum',
          format: ['PascalCase'],
        },
        {
          selector: 'typeAlias',
          format: ['PascalCase'],
          prefix: ['T'],
        },
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow',
        },
        {
          selector: 'function',
          format: ['camelCase'],
        },
        {
          selector: 'parameter',
          format: ['camelCase'],
          leadingUnderscore: 'allow',
        },
      ],
    },
  },

  {
    files: ['**/*.ts', '**/*.js'],
    rules: {  
      // Best Practices
      'no-console': ['error', { allow: ['warn', 'error', 'log', 'info'] }],
      'no-debugger': 'error',
      'no-alert': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-template': 'error',
      'object-shorthand': 'error',
      'no-useless-return': 'error',
      'no-useless-concat': 'error',
      'no-throw-literal': 'error',
      'no-self-compare': 'error',
      'no-param-reassign': ['error', { props: true }],
      'no-else-return': ['error', { allowElseIf: false }],
      'no-implicit-coercion': 'error',
      'no-lonely-if': 'error',
      'no-unneeded-ternary': 'error',
      'no-nested-ternary': 'error',
      'no-magic-numbers': 'off',
      'max-depth': ['error', 4],
      'max-lines': ['error', { max: 500, skipBlankLines: true }],
      'max-lines-per-function': ['error', { max: 100 }],
      'max-params': ['error', 3],
      complexity: ['error', 15],
      'consistent-return': 'error',
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
      'default-case': 'error',
      'default-case-last': 'error',
      'dot-notation': 'error',
      'guard-for-in': 'error',
      'no-empty-function': 'error',
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-invalid-this': 'error',
      'no-iterator': 'error',
      'no-labels': 'error',
      'no-lone-blocks': 'error',
      'no-multi-str': 'error',
      'no-new': 'error',
      'no-new-func': 'error',
      'no-new-wrappers': 'error',
      'no-octal-escape': 'error',
      'no-proto': 'error',
      'no-return-assign': 'error',
      'no-return-await': 'error',
      'no-script-url': 'error',
      'no-self-assign': 'error',
      'no-sequences': 'error',
      'no-unused-expressions': 'error',
      'no-useless-call': 'error',
      'no-useless-catch': 'error',
      'no-useless-escape': 'error',
      'no-void': 'error',
      'prefer-promise-reject-errors': 'error',
      radix: 'error',
      'require-await': 'error',
      'wrap-iife': 'error',
      yoda: 'error',
    },
  },

  // Test file overrides
  {
    files: ['**/*.spec.ts', '**/*.test.ts'],
    rules: {
      'max-lines-per-function': 'off',
      'max-lines': 'off',
      'max-params': 'off',
      complexity: 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/unbound-method': 'off',
      '@typescript-eslint/require-await': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      'no-magic-numbers': 'off',
      'import/no-default-export': 'off',
    },
  },

  // DTO and Entity file overrides
  {
    files: ['**/*.dto.ts', '**/*.entity.ts'],
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'max-lines-per-function': 'off',
    },
  },

  // Main file override
  {
    files: ['src/main.ts'],
    rules: {
      'no-console': 'off',
    },
  },

  // Prettier integration (must be last)
  eslintPluginPrettierRecommended,
]);
