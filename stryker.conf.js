/**
 * @type {import('@stryker-mutator/api/core').StrykerOptions}
 */
module.exports = {
    packageManager: 'yarn',
    reporters: ['html', 'clear-text', 'dashboard'],
    testRunner: 'jest',
    coverageAnalysis: 'perTest',

    jest: {
        configFile: 'jest.config.js',
        /**
         * workaround for windows bug
         * https://stackoverflow.com/questions/62411154/trouble-with-stryker-and-jest
         * https://github.com/stryker-mutator/stryker/issues/1566
         */
        enableFindRelatedTests: false,
    },

    dashboard: {
        project: 'github.com/fvalussi/rpg-combat',
        version: 'master',
        reportType: 'full',
    },
}
