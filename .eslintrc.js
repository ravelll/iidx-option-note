module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'react-app',
    'prettier',
    'prettier/react',
    'prettier/standard',
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
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
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
