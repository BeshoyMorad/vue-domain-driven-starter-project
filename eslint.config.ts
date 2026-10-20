import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import typescriptEslint from 'typescript-eslint';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const domainsDir = path.resolve(currentDir, 'src/domains');

const domains = fs.existsSync(domainsDir)
  ? fs
      .readdirSync(domainsDir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name)
  : [];

const domainIsolationConfigs = domains.map((domain) => {
  const otherDomains = domains.filter((d) => d !== domain);
  return {
    files: [`src/domains/${domain}/**/*.{ts,vue}`],
    rules: {
      'no-restricted-imports': [
        'error' as const,
        {
          patterns: [
            {
              group: [
                ...otherDomains.flatMap((other) => [
                  `@/domains/${other}/**`,
                  `@/domains/${other}`,
                  `@domains/${other}/**`,
                  `@domains/${other}`,
                  `../${other}/**`,
                  `../../${other}/**`,
                  `../../../${other}/**`,
                ]),
              ],
              message: `Domain '${domain}' is strictly isolated and cannot import from sibling domain(s): ${otherDomains.join(', ')}.`,
            },
          ],
        },
      ] as ['error', { patterns: { group: string[]; message: string }[] }],
    },
  };
});

export default typescriptEslint.config(
  { ignores: ['*.d.ts', '**/coverage', '**/dist', 'node_modules'] },
  {
    extends: [
      eslint.configs.recommended,
      ...typescriptEslint.configs.recommended,
      ...eslintPluginVue.configs['flat/recommended'],
    ],
    files: ['**/*.{ts,vue}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        parser: typescriptEslint.parser,
        extraFileExtensions: ['.vue'],
      },
    },
    rules: {
      // Structure & Length
      'max-lines': ['warn', { max: 300, skipBlankLines: true, skipComments: true }],
      'max-lines-per-function': ['warn', { max: 50, skipBlankLines: true, skipComments: true }],
      'no-restricted-imports': [
        'warn',
        {
          patterns: [
            {
              group: ['../*', '../../*', '../../../*', '../../../../*', '../../../../../*'],
              message: 'Use the @/ alias instead of parent-relative imports.',
            },
          ],
        },
      ],

      // Vue Specifics
      'vue/block-order': [
        'error',
        {
          order: ['script', 'template', 'style'],
        },
      ],
      'vue/block-lang': [
        'error',
        {
          script: { lang: 'ts' },
        },
      ],
      'vue/attributes-order': [
        'error',
        {
          order: [
            'DEFINITION',
            'CONDITIONALS',
            'LIST_RENDERING',
            'RENDER_MODIFIERS',
            'GLOBAL',
            'UNIQUE',
            'TWO_WAY_BINDING',
            'OTHER_ATTR',
            'EVENTS',
            'CONTENT',
          ],
          alphabetical: false,
        },
      ],
      'vue/multi-word-component-names': 'off',

      // Type Safety
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          // Forces 'import type { ... }' for better build tree-shaking
          prefer: 'type-imports',
          fixStyle: 'separate-type-imports',
        },
      ],
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/array-type': ['error', { default: 'array' }], // Enforce 'User[]' instead of 'Array<User>'

      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    },
  },
  // Architecture Boundary: Core cannot import domains
  {
    files: ['src/core/**/*.{ts,vue}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/domains/**', '@/domains', '@domains/**', '@domains'],
              message: 'src/core must not import from domains layer.',
            },
          ],
        },
      ],
    },
  },
  // Architecture Boundary: Shared cannot import domains
  {
    files: ['src/shared/**/*.{ts,vue}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/domains/**', '@/domains', '@domains/**', '@domains'],
              message: 'src/shared must not import from domains layer.',
            },
          ],
        },
      ],
    },
  },
  // Architecture Boundary: Cross-domain isolation rules
  ...domainIsolationConfigs,
  {
    files: ['**/types/**/*.ts'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector:
            ':matches(Program, ExportNamedDeclaration, ExportDefaultDeclaration) > :matches(VariableDeclaration, FunctionDeclaration, ClassDeclaration, TSEnumDeclaration, ExpressionStatement):not([declare=true])',
          message:
            'types/ holds only type / interface. Move runtime values to constants/ or utils/.',
        },
      ],
    },
  },
  {
    files: ['**/*.spec.ts', '**/*.test.ts', 'tests/**/*.ts'],
    rules: {
      'max-lines': 'off',
      'max-lines-per-function': 'off',
    },
  },
  eslintConfigPrettier
);
