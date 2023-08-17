module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'react-app',
    'prettier',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react', 'prettier'],
  rules: {
    camelcase: 'off',
    '@typescript-eslint/camelcase': 'off',
    'no-underscore-dangle': ['error', { allow: ['__typename'] }],
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['jsx', 'tsx'],
      },
    ],
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'react/no-danger': 'off',
    'prettier/prettier': 'error',
  },
}
