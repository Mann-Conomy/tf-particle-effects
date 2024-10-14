const tseslint = require("typescript-eslint");
const eslint = require("@mann-conomy/typescript-eslint-config");

module.exports = tseslint.config({
    extends: [
        ...eslint
    ],
    ignores: [
        "dist/**/*",
        "test/**/*.ts",
        "examples/*.ts",
        "jest.setup.ts",
        "jest.config.ts",
        "eslint.config.js"
    ]
});
