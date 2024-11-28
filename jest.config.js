module.exports = {
  preset: 'ts-jest',
  testMatch: ['**/?(*.)+(spec|test).ts'],
  testPathIgnorePatterns: ['/node_modules/'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1', // 'src/'로 시작하는 경로를 <rootDir>/src로 매핑
  },
};
