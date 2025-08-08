/* eslint-disable @typescript-eslint/no-var-requires */
import type { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';

const { compilerOptions } = require('./tsconfig.json');
const { baseUrl, paths } = compilerOptions;

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
  modulePaths: [baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(paths),
  modulePathIgnorePatterns: ['<rootDir>/config/'],
  verbose: true,
};

export default jestConfig;
