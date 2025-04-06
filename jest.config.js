const path = require('path')

module.exports = {
    roots: [path.resolve(__dirname, "src"), path.resolve(__dirname, "scripts")],
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest',
    },
    setupFilesAfterEnv: ['<rootDir>/jest/setupTests.js'],
    moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
    testRegex: '(/__tests__/.*|(||.|/)(test|spec))\\.jsx?$',
    moduleNameMapper: {
        "^.+\\.(css|less|scss)$": "identity-obj-proxy",
        "^.+\\.(svg|png|jpg|jpeg|pdf|webp|ttf|woff|woff2|mp4)$": "<rootDir>/jest/__mocks__/fileMock.js",
        "images/(.*)$": ["<rootDir>/assets/$1"],
        "^utils/(.*)$": ["<rootDir>/src/utils/$1"],
        "^react-i18next$": "<rootDir>/jest/__mocks__/react-i18next.js",
    },
    testPathIgnorePatterns: [
        "<rootDir>/node_modules/",
        "<rootDir>/build/",
        "<rootDir>/src/App.test.js"
    ],
    coveragePathIgnorePatterns: [
        "<rootDir>/node_modules/",
        "<rootDir>/build/",
        "<rootDir>/src/App.test.js"
    ],
    modulePaths: [
        "<rootDir>",
        "<rootDir>/src",
        'node_modules'
    ],
    moduleDirectories: ['node_modules']
}