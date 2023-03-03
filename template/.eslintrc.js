module.exports = {
  root: true,
  env: {
    es2021: true,
    browser: true,
    node: true,
  },
  extends: [
    'standard',
    'prettier',
    'plugin:react/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    },
    project: './tsconfig.json'
  },
  plugins: ['@typescript-eslint', 'prettier', 'react'],
  settings: {
    react: {
      version: 'detect'
    },
    'import/resolver': {
      typescript: {
        'alwaysTryTypes': true
      }
    }
  },
  rules: {
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'no-dupe-class-members': 'off',
    '@typescript-eslint/no-dupe-class-members': ['error'],
    'no-undef': 'off',
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': ['error'],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    
    // std js practice
    'no-prototype-builtins': 'off',
    
    // for grpc payloads
    camelcase: 'off',
    
    // for react
    'react/prop-types': 'off',
    
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        singleQuote: true
      }
    ]
  }
}
