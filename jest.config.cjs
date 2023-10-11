module.exports = {
    testEnvironment: "jsdom",
    moduleNameMapper: {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy"
    },
    setupFilesAfterEnv: ["@testing-library/jest-dom"],
    testMatch: ["**/test/**/*.test.jsx"],
    transform: {
      "^.+\\.jsx?$": "babel-jest"
    }
  };