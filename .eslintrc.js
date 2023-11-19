module.exports = {
  ignorePatterns: ['projects/charme-ui/src/lib/_ignore'],
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
        '@typescript-eslint/space-before-function-paren': ['error', 'never']
      }
    }
  ]
}
