module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|expo-status-bar|expo-linear-gradient|react-native-vector-icons|firebase|@firebase|@react-native-async-storage/async-storage)',
  ],
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.svg': '<rootDir>/__mocks__/svgMock.js',
    '^@react-native-async-storage/async-storage$': '<rootDir>/__mocks__/@react-native-async-storage/async-storage.js',
    '^react-native-vector-icons/Ionicons$': '<rootDir>/__mocks__/react-native-vector-icons/Ionicons.js',
    '^firebase/(.*)$': '<rootDir>/node_modules/firebase/$1',
  },
};
