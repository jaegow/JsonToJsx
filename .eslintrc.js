module.exports = {
  env: {
    browser: true,
    jest: true,
    es6: true,
    node: true,
  },
  extends: ['react-app', 'airbnb'],
  rules: {
    'jsx-a11y/no-static-element-interactions': 'warn',
    'jsx-a11y/click-events-have-key-events': 'warn',
    'jsx-a11y/anchor-is-valid': 'warn',

    'react/jsx-tag-spacing': 'warn',
    'react/no-unused-prop-types': 'warn',
    'react/button-has-type': 'warn',
    'react/require-default-props': 'warn',
    'react/jsx-one-expression-per-line': 'off',
    'react/prop-types': 'off',
    'react/jsx-filename-extension': 'off',

    'import/no-extraneous-dependencies': 'off',

    'space-in-parens': 'warn',
    'no-trailing-spaces': 'warn',
    'semi': 'warn',
    'arrow-body-style': 'warn',
    'max-len': [2, { code: 1000, tabWidth: 4, ignoreUrls: true} ],
    'camelcase': 'off',
    'no-unused-vars': 'warn',
    'no-underscore-dangle': 'off',
    'padded-blocks': 'warn',
    'no-multiple-empty-lines': 'warn',
    'object-curly-spacing': 'warn',
    // todo: need democratic decision on how this is handled
    'object-curly-newline': 'off',
  },
};
