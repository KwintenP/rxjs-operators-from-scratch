module.exports = function(wallaby) {
    return {
        files: [
            'src/**/*.ts',
            '!src/**/*.spec.ts',
            'tsconfig.json',
            'package.json'
        ],
        tests: [
            'src/**/*.spec.ts'
        ],
        env: {
            type: 'node'
        },
        testFramework: 'jest',
        debug: false,
        // setup: function (wallaby) {
        //     var jestConfig = require('./jest.config');
        //     delete jestConfig.transform; // <--
        //     wallaby.testFramework.configure(jestConfig);
        // }
    };
};