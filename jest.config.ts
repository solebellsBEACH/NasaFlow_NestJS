export default {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: '.',
    testRegex: '.*\\.spec\\.ts$',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    collectCoverageFrom: [
        '**/*.(t|j)s',
    ],
    coverageDirectory: './coverage',
    testEnvironment: 'node',
    moduleNameMapper: {
        "^@shared/(.*)$": "<rootDir>/src/shared/$1",
        "^@users/(.*)$": "<rootDir>/src/users/$1",
        "^@database/(.*)$": "<rootDir>/src/database/$1",
        "^@auth/(.*)$": "<rootDir>/src/auth/$1",
    }
};
