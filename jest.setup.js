jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({
    currentUser: null,
  })),
  initializeAuth: jest.fn(() => ({})),
  getReactNativePersistence: jest.fn(() => ({})),
  onAuthStateChanged: jest.fn((auth, callback) => {
    callback(null);
    return () => {};
  }),
  signInWithEmailAndPassword: jest.fn(async () => ({
    user: { uid: "123", email: "test@example.com" },
  })),
  signOut: jest.fn(async () => Promise.resolve()),
}));

jest.mock("react-native-vector-icons/Ionicons", () => "Icon");

jest.mock('react-native-fit-image', () => 'FitImage');

jest.mock('react-native-markdown-display', () => 'MarkdownDisplay');


global.setImmediate = global.setImmediate || ((fn, ...args) => global.setTimeout(fn, 0, ...args));