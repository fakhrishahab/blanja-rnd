const path = require('path')

module.exports = {
  rootDir: path.resolve(__dirname, '../../'),
  moduleFileExtensions: [
    'js',
    'json',
    'vue'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/dev/$1',
    '^@config/profile': '<rootDir>/config/profile.js',
    '^Vue': 'vue/dist/vue.esm.js'
  },
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest'
  },
//   snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-vue'],
  setupFiles: ['<rootDir>/test/unit/setup'],
//   mapCoverage: true,
//   coverageDirectory: '<rootDir>/test/unit/coverage',
//   collectCoverageFrom: [
//     'src/**/*.{js,vue}',
//     '!src/main.js',
//     '!src/router/index.js',
//     '!**/node_modules/**'
//   ]
}
