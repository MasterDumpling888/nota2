jest.mock('@react-native-firebase/auth', () => {
  return {
    getReactNativePersistence: jest.fn(() => 'mockPersistence'),
    initializeAuth: jest.fn(() => ({
      currentUser: null,
      signInWithEmailAndPassword: jest.fn(),
      createUserWithEmailAndPassword: jest.fn(),
      signOut: jest.fn(),
    })),
  };
});
