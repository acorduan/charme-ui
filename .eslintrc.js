module.exports = {
  ignorePatterns: ['dist', '*.js'],
  overrides: [
    {
      files: ['*.ts'],
      extends: 'standard-with-typescript',
      parserOptions: {
        project: './tsconfig.json'
      },
      rules: {
        'accessor-pairs': 'off',
        '@typescript-eslint/consistent-type-imports': 'off',
        '@typescript-eslint/space-before-function-paren': ['error', 'never'],
        '@typescript-eslint/no-confusing-void-expression': 'off',
        'no-return-assign': 'off'
      }
    }
  ]
}
