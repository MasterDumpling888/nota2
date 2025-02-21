import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

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

const tagsData = [
  { name: 'Important' },
  { name: 'Urgent' },
  { name: 'Miscellaneous' },
];

const notesData = [
  {
    title: 'Project Plan',
    content: `The project plan outlines the key milestones and deliverables for the upcoming quarter. 
    It includes the project scope, objectives, timeline, and resource allocation. 
    The plan also identifies potential risks and mitigation strategies. 
    Key stakeholders have been identified and their roles and responsibilities are clearly defined. 
    The project will be divided into three phases: initiation, execution, and closure. 
    Each phase will have specific tasks and deliverables that need to be completed on time to ensure the project's success.`,
    folder: foldersData[2].name,
    tag: tagsData[0].name
  },
  {
    title: 'Meeting Notes',
    content: `During the meeting, we discussed the progress of the current sprint and identified any blockers that the team is facing. 
    We reviewed the tasks that have been completed and those that are still in progress. 
    The team provided updates on their respective tasks and highlighted any issues that need to be addressed. 
    We also discussed the upcoming sprint and planned the tasks that need to be prioritized. 
    Action items were assigned to team members to ensure that the sprint goals are met. 
    The next meeting is scheduled for next week to review the progress and address any new issues.`,
    folder: foldersData[0].name,
    tag: tagsData[1].name
  },
  {
    title: 'Research Paper',
    content: `This research paper explores the impact of artificial intelligence on various industries. 
    It provides an overview of the current state of AI technology and its applications in different sectors such as healthcare, finance, and manufacturing. 
    The paper also discusses the ethical considerations and challenges associated with the widespread adoption of AI. 
    Case studies are presented to illustrate the benefits and potential risks of AI implementation. 
    The paper concludes with recommendations for policymakers and industry leaders on how to navigate the complexities of AI integration.`,
    folder: foldersData[2].name,
    tag: tagsData[2].name
  },
  {
    title: 'Personal Journal',
    content: `Today was a productive day. I managed to complete all the tasks on my to-do list and even had some time to relax. 
    I started the day with a morning workout, which gave me a boost of energy. 
    I then focused on my work projects and made significant progress. 
    In the afternoon, I took a break and went for a walk in the park. 
    It was refreshing to be outdoors and enjoy the nice weather. 
    In the evening, I spent some time reading a book and reflecting on the day. 
    Overall, it was a fulfilling day and I feel accomplished.`,
    folder: foldersData[1].name,
    tag: tagsData[2].name
  },
  {
    title: 'Technical Documentation',
    content: `The technical documentation provides detailed information about the software architecture and design. 
    It includes an overview of the system components and their interactions. 
    The documentation also covers the data flow and the various modules that make up the system. 
    Each module is described in detail, including its functionality, inputs, and outputs. 
    The documentation also includes code snippets and examples to illustrate key concepts. 
    Additionally, it provides guidelines for troubleshooting and debugging common issues. 
    The documentation is intended for developers and technical stakeholders who need to understand the inner workings of the software.`,
    folder: foldersData[2].name,
    tag: tagsData[0].name
  }
];

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
    const tagsCollection = collection(db, 'users', user.uid, 'tags');
    const notesCollection = collection(db, 'users', user.uid, 'notes');

    // Add folders to Firestore
    const folders = [];
    for (const folder of foldersData) {
      const docRef = await addDoc(foldersCollection, folder);
      folders.push({ id: docRef.id, ...folder });
    }

    // Add tags to Firestore
    const tags = [];
    for (const tag of tagsData) {
      const docRef = await addDoc(tagsCollection, tag);
      tags.push({ id: docRef.id, ...tag });
    }

    // Add notes to Firestore
    for (const note of notesData) {
      note.folder = folders[Math.floor(Math.random() * folders.length)].id;
      note.tag = tags[Math.floor(Math.random() * tags.length)].id;
      await addDoc(notesCollection, note);
    }

    console.log('Data seeded successfully');
  } catch (error) {
    console.error('Error seeding data: ', error);
  }
};

// User credentials
const email = 'dani@example.com';
const password = 'danica';

// Seed data
seedData(email, password);
