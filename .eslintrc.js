module.exports = {
  env: {
    browser: true,
    es6: true,
    'react-native/react-native': true,
  },
  extends: [
    'airbnb',
    'prettier',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react-native/all',
  ],
  settings: {
    'import/resolver': {
      typescript: {},
    },
    react: {
      version: 'detect',
    },
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-native',
    'react-hooks',
    '@typescript-eslint',
    'prettier',
    'simple-import-sort',
  ],
  rules: {
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
      },
    ],
    'react-hooks/exhaustive-deps': 'warn',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'react/require-default-props': 'off',
    'react/jsx-no-useless-fragment': 'off',
    'no-restricted-exports': ['off', { restrictedNamedExports: ['default'] }],
    'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx'] }],
    'no-shadow': 'off',
    'no-use-before-define': 'off',
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
    'import/prefer-default-export': 'off',
    'no-console': 'off',
    'no-empty-function': 'off',
    'react/jsx-props-no-spreading': ['off'],
    'jsx-a11y/no-static-element-interactions': 'off',
    'react/react-in-jsx-scope': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'import/no-extraneous-dependencies': [
      'warn',
      {
        devDependencies: true,
        optionalDependencies: true,
        peerDependencies: true,
      },
    ],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
        js: 'never',
        jsx: 'never',
      },
    ],
  },
  overrides: [
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      rules: {
        'react/require-default-props': 'off',
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              ['^react$', '^react-native$', '^react-native-*', '^expo-*', '^@?\\w'],
              ['^@/'],
              ['^\\.'],
            ],
          },
        ],
      },
    },
  ],
  ignorePatterns: ['scripts/'],
};
