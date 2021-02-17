module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    coverageDirectory: 'reports/coverage',
    coverageReporters: ['html', 'text', 'text-summary'],
}
