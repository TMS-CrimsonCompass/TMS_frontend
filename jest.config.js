module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom', // for DOM-based testing (Next.js)
  moduleDirectories: ['node_modules', '<rootDir>/'],
  moduleNameMapper: {
    '^@/app/(.*)$': '<rootDir>/app/$1',
    '^@/utils/(.*)$': '<rootDir>/utils/$1',
    '^@/contexts/(.*)$': '<rootDir>/contexts/$1',
    '^@/types/(.*)$': '<rootDir>/types/$1',
    '^@/public/(.*)$': '<rootDir>/public/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
