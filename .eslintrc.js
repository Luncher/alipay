module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: ['airbnb-typescript/base'],
  parserOptions: {
    project: './tsconfig.eslint.json'
  },
  env: {
    node: true
  },
  rules: {
    'max-len': ['error', { code: 120 }],
    'comma-dangle': ['error', 'never'],
    semi: 'off',
    '@typescript-eslint/semi': ['error', 'never'],
    'import/prefer-default-export': 'off'
  }
}
