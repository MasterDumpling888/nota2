import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { faker, simpleFaker } from '@faker-js/faker';

// Firebase configuration
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
const db = getFirestore(app);
const auth = getAuth(app);

// Fictional data
const foldersData = [
  { name: 'Work' },
  { name: 'Personal' },
  { name: 'Projects' },
];

const categoriesData = [
  { name: 'Important' },
  { name: 'Urgent' },
  { name: 'Miscellaneous' },
];

const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];

const generateNotesData = (folders, categories) => {
  return Array.from({ length: 10 }, () => ({
    title: faker.lorem.sentence(),
    content: simpleFaker.string.uuid(3),
    folder: getRandomElement(folders).id,
    category: getRandomElement(categories).id,
  }));
};

// Function to seed data
const seedData = async (email, password) => {
  try {
    // Sign in the user
    await signInWithEmailAndPassword(auth, email, password);
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');

    console.log(`Authenticated as ${user.email}`);

    // Get user's collections
    const foldersCollection = collection(db, 'users', user.uid, 'folders');
    const categoriesCollection = collection(db, 'users', user.uid, 'categories');
    const notesCollection = collection(db, 'users', user.uid, 'notes');

    // Add folders to Firestore
    const folders = [];
    for (const folder of foldersData) {
      const docRef = await addDoc(foldersCollection, folder);
      folders.push({ id: docRef.id, ...folder });
    }

    // Add categories to Firestore
    const categories = [];
    for (const category of categoriesData) {
      const docRef = await addDoc(categoriesCollection, category);
      categories.push({ id: docRef.id, ...category });
    }

    // Generate and add notes to Firestore
    const notesData = generateNotesData(folders, categories);
    for (const note of notesData) {
      await addDoc(notesCollection, note);
    }

    console.log('Data seeded successfully');
  } catch (error) {
    console.error('Error seeding data: ', error);
  }
};

// Replace with the email and password of an existing user
const email = 'user2@example.com';
const password = 'password123';

// Seed data
seedData(email, password);
