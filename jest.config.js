module.exports = {
  "transform" : {
    "^.+\\.[jt]sx?$": "ts-jest",
  },
  "testEnvironment": "node",
  "testRegex": "/__tests__/.*\\.(test|spec)\\.(t|j)sx?$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
  ],
  "transformIgnorePatterns": [
    "node_modules"
  ],
  "coveragePathIgnorePatterns": [
    "/node_modules/",
    "/__tests__/",
  ],
  "maxWorkers": 1,
  "globals": {
    "ts-jest": {
      "diagnostics": true,
      "isolatedModules": true
    }
  },
  "moduleNameMapper": {
    "^@interfaces/(.*)": "<rootDir>/src/client/interfaces/$1",
    "^@models/(.*)": "<rootDir>/src/client/models/$1",
    "^@providers/(.*)": "<rootDir>/src/client/providers/$1",
    "^@errors/(.*)": "<rootDir>/src/client/errors/$1",
    "^@constants/(.*)": "<rootDir>/src/client/constants/$1",
    "^@env/(.*)": "<rootDir>/src/client/env/$1",
    "^@enums/(.*)": "<rootDir>/src/client/enums/$1",
    "^@components/(.*)": "<rootDir>/src/client/components/$1",
    "^@repositories/(.*)": "<rootDir>/src/client/repositories/$1",
    "^@contexts/(.*)": "<rootDir>/src/client/contexts/$1",
    "^@stores/(.*)": "<rootDir>/src/client/stores/$1",
    "^@utils/(.*)": "<rootDir>/src/client/utils/$1",
    "^@externals/(.*)": "<rootDir>/src/client/externals/$1",
    "^@decorators/(.*)": "<rootDir>/src/client/decorators/$1",
    "^@libs/(.*)": "<rootDir>/src/client/libs/$1",
    "^@styles/(.*)": "<rootDir>/src/client/styles/$1",
    "^@assets/(.*)": "<rootDir>/public/assets/$1",
  }
};
