module.exports = {
    preset: "jest-expo",
    setupFilesAfterEnv: [
      // './__mocks__/firebaseMock.js',
      "./jest.setup.js"
    ],
    automock: false,
    transformIgnorePatterns: [
        "node_modules/(?!(expo|react-native|@react-native|@react-navigation|@testing-library/react-native)/)"
    ],
    transform: {
      "^.+\\.jsx?$": "babel-jest"  // Ensure Babel processes JavaScript
    }
  };
  