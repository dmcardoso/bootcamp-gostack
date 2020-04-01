module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: ['eslint-plugin-import-helpers'],
  rules: {
    'react-native/no-inline-styles': 'off',
    'import-helpers/order-imports': [
        'warn',
        { // example configuration
            newlinesBetween: 'always',
            groups: [
                ['/^react/'],
                'module',
                '/^@shared/',
                ['parent', 'sibling', 'index', '/^~/'],
            ],
            alphabetize: { order: 'asc', ignoreCase: true },
        },
    ],
  },
  settings: {
      'import/resolver': {
          'babel-plugin-root-import': {
              rootPathSuffix: 'src'
          }
      }
  }
};
