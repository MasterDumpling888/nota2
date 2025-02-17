// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { isSupported, getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCK-2bVqPM2OIOoByOTZbxfyGP3Q_ZUgbI",
  authDomain: "nota-ec778.firebaseapp.com",
  projectId: "nota-ec778",
  storageBucket: "nota-ec778.firebasestorage.app",
  messagingSenderId: "404606650031",
  appId: "1:404606650031:web:4dc56182773e0bc026b65a",
  measurementId: "G-FGEBDLQN20"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

let analytics;
isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  }
});

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { auth, analytics, db };