import type { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';

const paths = {
  '@shared/*': ['src/shared/*'],
  '@account/*': ['src/account/*'],
};

const jestConfig: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coveragePathIgnorePatterns: [
    '<rootDir>/build',
    '<rootDir>/dist',
    '<rootDir>/node_modules',
  ],
  testMatch: ['**/src/**/*.test.+(ts)'],
  transform: {
    '^.+\\.(ts)$': 'ts-jest',
  },
  forceExit: true,
  modulePaths: ['./'],
  moduleNameMapper: pathsToModuleNameMapper(paths),
  modulePathIgnorePatterns: ['<rootDir>/config/'],
  verbose: true,
};

export default jestConfig;
