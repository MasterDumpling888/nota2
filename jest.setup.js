import '@testing-library/jest-native/extend-expect';
jest.mock('react-native-vector-icons/Ionicons', () => ({
  default: jest.fn(),
}));