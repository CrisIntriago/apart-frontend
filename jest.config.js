export default {
  testEnvironment: 'node',
  transform: {
    '^.+\\.(js|mjs|ts|tsx)$': ['babel-jest', { presets: ['@babel/preset-env', '@babel/preset-typescript'] }],
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  globals: {},
};
