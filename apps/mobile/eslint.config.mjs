import nx from '@nx/eslint-plugin';
import baseConfig from '../../eslint.config.mjs';

export default [
  ...baseConfig,
  ...nx.configs['flat/react'],
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allowCircularSelfDependency: false,
          allow: [
            '@screens/**',
            '@contexts/**',
            '@utils/*',
            '@components/**',
            '@navigation/**',
            '@services/**',
          ],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
      'import/no-relative-parent-imports': 'off',
    },
  },
  {
    ignores: ['.expo', 'web-build', 'cache', 'dist'],
  },
];
