module.exports = {
    preset: "jest-expo",
    setupFilesAfterEnv: [ "./jest.setup.js" ],
    testEnvironment: 'jsdom', // ✅ Fixes act() warnings
    automock: false,
    transformIgnorePatterns: [
        "node_modules/(?!(expo|react-native|@react-native|@react-navigation|@testing-library/react-native)/)"
    ],
    transform: {
      "^.+\\.jsx?$": "babel-jest"  // Ensure Babel processes JavaScript
    }
  };
  