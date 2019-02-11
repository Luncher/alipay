module.exports = {
  "verbose": true,
  "roots": [
    "<rootDir>/src/",
    "<rootDir>/tests/"
  ],
  "transform": {
    "^.+\\.ts$": "ts-jest"
  },
  "modulePaths": [
    "<rootDir>"
  ],
  "testEnvironment": 'node',
  "testRegex": "/tests/.*(test|spec)\.ts$",
  "moduleFileExtensions": ["ts", "js"]
}