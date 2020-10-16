module.exports = {
  verbose: false,
  bail: 5,
  cacheDirectory: '/tmp/jest/',
  clearMocks: true,
  coverageDirectory: '<rootDir>/coverage/',
  setupFilesAfterEnv: ['<rootDir>/jest_config/setup_tests.js'],
  roots: ['<rootDir>/src/', '<rootDir>/setupTest-Tests'],
  preset: 'react-native',
  modulePathIgnorePatterns: [
    '<rootDir>/example/node_modules',
    '<rootDir>/lib/',
    '<rootDir>/node_modules/',
  ],
};
