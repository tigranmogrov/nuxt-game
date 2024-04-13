/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'vue/component-name-in-template-casing': [
      'error',
      'kebab-case'
    ],
    'vue/no-deprecated-slot-attribute': [
      'off'
    ],
    'vue/attribute-hyphenation': 'off',
    'semi':  [2, "always"]
  }
};
