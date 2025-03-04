// Mock Firebase Auth
jest.mock("firebase/auth", () => ({
    onAuthStateChanged: jest.fn(() => jest.fn()),
  }));
  
  // Mock Expo Splash Screen
  jest.mock("expo-splash-screen", () => ({
    preventAutoHideAsync: jest.fn(),
    hideAsync: jest.fn(),
  }));
  
  // Mock Expo Font Loading
  jest.mock("expo-font", () => ({
    loadAsync: jest.fn(() => Promise.resolve()),
  }));
  
  // Mock React Navigation
  jest.mock("@react-navigation/native", () => ({
    NavigationContainer: ({ children }) => children,
  }));
  
  jest.mock("@react-navigation/stack", () => ({
    createStackNavigator: jest.fn(() => ({
      Navigator: ({ children }) => children,
      Screen: () => null,
    })),
  }));
  