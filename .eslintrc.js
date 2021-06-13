// Ref: [CLI] https://eslint.org/docs/user-guide/command-line-interface
// Ref: https://paulintrognon.fr/blog/typescript-prettier-eslint-next-js
module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: { ecmaVersion: 8 },
    ignorePatterns: ['node_modules/*', '.next/*'],
    plugins: ['@typescript-eslint', 'react'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended', // TypeScript rules
        'plugin:react/recommended', // React rules
        'plugin:react-hooks/recommended', // React hooks rules
        'prettier', // Prettier plugin
        'plugin:prettier/recommended', // Prettier recommended rules
    ],
    rules: {
        'react/react-in-jsx-scope': 'off',
        'react/display-name': ['off', { ignoreTranspilerName: false }],
        '@typescript-eslint/no-unused-vars': ['error'],
        '@typescript-eslint/no-inferrable-types': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-empty-function': 'off',
    },
    settings: {
        react: {
            createClass: 'createReactClass', // Regex for Component Factory to use, default to "createReactClass"
            pragma: 'React', // Pragma to use, default to "React"
            fragment: 'Fragment', // Fragment to use (may be a property of <pragma>), default to "Fragment"
            version: 'detect', // React version. "detect" automatically picks the version you have installed.
            // flowVersion: '0.53', // Flow version
        },
        propWrapperFunctions: [
            // The names of any function used to wrap propTypes, e.g. `forbidExtraProps`. If this isn't set, any propTypes wrapped in a function will be skipped.
            'forbidExtraProps',
            { property: 'freeze', object: 'Object' },
            { property: 'myFavoriteWrapper' },
        ],
        linkComponents: [
            // Components used as alternatives to <a> for linking, eg. <Link to={ url } />
            'Hyperlink',
            { name: 'Link', linkAttribute: 'to' },
        ],
    },
};
