import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },  
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  setupFiles: ['dotenv/config'],
  testPathIgnorePatterns: ['/dist/'], // 👈 add this line
};

export default config;
