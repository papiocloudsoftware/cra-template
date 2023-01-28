module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    jest: true
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    },
    project: "./tsconfig.json"
  },
  settings: {
    react: {
      version: "detect"
    },
    "import/resolver": {
      typescript: {
        "alwaysTryTypes": true
      }
    }
  },
  plugins: [
    "@typescript-eslint/eslint-plugin",
    "@typescript-eslint/tslint",
    "prettier",
    "simple-import-sort",
    "promise"
  ],
  extends: [
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended"
  ],
  rules: {
    "prettier/prettier": ["error", {
      printWidth: 120,
      "trailingComma": "none",
      "arrowParens": "always"
    }],
    "@typescript-eslint/no-non-null-assertion": "off",
    "simple-import-sort/imports": "error",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/prefer-optional-chain": "error",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-var-requires": "off",
    "eol-last": ["error", "always"],
    "no-console": "off",
    "curly": "error",
    "object-shorthand": ["error", "always"],
    "no-unused-vars": "off",
    "no-warning-comments": ["warn", {
      terms: ["TODO", "FIXME"],
      location: "anywhere"
    }],
    "max-depth": ["error", {max: 3}],
    "@typescript-eslint/tslint/config": ["error", {
      rules: {
        "completed-docs": [true, {
          interfaces: {visibilities: ["exported"]}
        }]
      }
    }]
  }
}
