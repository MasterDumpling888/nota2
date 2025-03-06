import { db, auth } from '../firebaseConfig';
import { collection, addDoc, updateDoc, deleteDoc, getDocs, doc, getDoc } from 'firebase/firestore';

const getUserNotesCollection = () => {
  const user = auth.currentUser;
  if (!user) throw new Error('User not authenticated');
  return collection(db, 'users', user.uid, 'notes');
};

const getUserFoldersCollection = () => {
  const user = auth.currentUser;
  if (!user) throw new Error('User not authenticated');
  return collection(db, 'users', user.uid, 'folders');
};

const getUserTagsCollection = () => {
  const user = auth.currentUser;
  if (!user) throw new Error('User not authenticated');
  return collection(db, 'users', user.uid, 'tags');
};

export const addNote = async (note) => {
  try {
    const notesCollection = getUserNotesCollection();
    const docRef = await addDoc(notesCollection, note);
    return docRef.id;
  } catch (error) {
    console.error("Error adding note: ", error);
    throw error;
  }
};

export const updateNote = async (id, updatedNote) => {
  try {
    const notesCollection = getUserNotesCollection();
    const noteDoc = doc(notesCollection, id);
    await updateDoc(noteDoc, updatedNote);
  } catch (error) {
    console.error("Error updating note: ", error);
    throw error;
  }
};

export const deleteNote = async (id) => {
  try {
    const notesCollection = getUserNotesCollection();
    const noteDoc = doc(notesCollection, id);
    await deleteDoc(noteDoc);
  } catch (error) {
    console.error("Error deleting note: ", error);
    throw error;
  }
};

export const fetchNotes = async () => {
  try {
    const notesCollection = getUserNotesCollection();
    const querySnapshot = await getDocs(notesCollection);
    const notesList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return notesList;
  } catch (error) {
    console.error("Error fetching notes: ", error);
    throw error;
  }
};

export const getNote = async (id) => {
  try {
    const notesCollection = getUserNotesCollection();
    const noteDoc = doc(notesCollection, id);
    const noteSnapshot = await getDoc(noteDoc);
    if (noteSnapshot.exists()) {
      return { id: noteSnapshot.id, ...noteSnapshot.data() };
    } else {
      throw new Error('Note not found');
    }
  } catch (error) {
    console.error("Error getting note: ", error);
    throw error;
  }
};

export const addFolder = async (folder) => {
  try {
    const foldersCollection = getUserFoldersCollection();
    const docRef = await addDoc(foldersCollection, folder);
    return docRef.id;
  } catch (error) {
    console.error("Error adding folder: ", error);
    throw error;
  }
};

export const addTag = async (tag) => {
  try {
    const tagsCollection = getUserTagsCollection();
    const docRef = await addDoc(tagsCollection, tag);
    return docRef.id;
  } catch (error) {
    console.error("Error adding tag: ", error);
    throw error;
  }
};

export const fetchFolders = async () => {
  try {
    const foldersCollection = getUserFoldersCollection();
    const querySnapshot = await getDocs(foldersCollection);
    const foldersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return foldersList;
  } catch (error) {
    console.error("Error fetching folders: ", error);
    throw error;
  }
};

export const fetchTags = async () => {
  try {
    const tagsCollection = getUserTagsCollection();
    const querySnapshot = await getDocs(tagsCollection);
    const tagsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return tagsList;
  } catch (error) {
    console.error("Error fetching tags: ", error);
    throw error;
  }
};
