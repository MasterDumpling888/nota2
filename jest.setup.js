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
  createUserWithEmailAndPassword: jest.fn(async () => ({
    user: { uid: "test-uid", email: "newuser@example.com" },
  }))
}));

jest.mock("firebase/firestore", () => ({
  doc: jest.fn(),
  setDoc: jest.fn(() => Promise.resolve()),
  getFirestore: jest.fn(() => ({}))
}));

jest.mock("react-native-vector-icons/Ionicons", () => "Icon");

jest.mock('react-native-fit-image', () => 'FitImage');

jest.mock('react-native-markdown-display', () => 'MarkdownDisplay');

jest.mock('./responsiveFont', () => ({
  getFontSize: jest.fn(size => size),
}));

jest.mock('./components/PageBox', () => 'PageBox');

global.setImmediate = global.setImmediate || ((fn, ...args) => global.setTimeout(fn, 0, ...args));

global.mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};