module.exports = {
    preset: "jest-expo",
    setupFilesAfterEnv: [
      "@testing-library/jest-native/extend-expect",
      "<rootDir>/jest.setup.js"
    ],
    transformIgnorePatterns: [
        "node_modules/(?!(expo|react-native|@react-native|@react-navigation|@testing-library/react-native)/)"
    ],
    transform: {
      "^.+\\.tsx?$": "babel-jest", // Ensure Babel processes TypeScript
      "^.+\\.jsx?$": "babel-jest"  // Ensure Babel processes JavaScript
    }
  };
  