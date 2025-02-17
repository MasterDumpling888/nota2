import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Button, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchNotes, addFolder, addCategory, fetchFolders, fetchCategories } from '../services/notesService';
import PageBox from '../components/PageBox';
import { Ionicons } from '@expo/vector-icons';
import { TabView } from 'react-native-tab-view';
import { Dimensions } from 'react-native';

import styles from '../styles';

const AllNotes = ({ notes, navigation }) => (
  <ScrollView>
    {notes.length === 0 ? (
      <Text type="default">No notes available.</Text>
    ) : (
      notes.map((note, index) => (
        <TouchableOpacity
          key={index}
          style={styles.noteContainer}
          onPress={() => navigation.navigate('NoteEditor', { noteId: note.id })}
        >
          <Text style={styles.noteTitle}>{note.title}</Text>
          <Text style={styles.noteContent}>{note.content}</Text>
        </TouchableOpacity>
      ))
    )}
  </ScrollView>
);

const NotesByCategory = ({ categories, navigation }) => (
  <ScrollView>
    {categories.length === 0 ? (
      <Text type="default">No categories available.</Text>
    ) : (
      categories.map((category, index) => (
        <View key={index} style={styles.noteContainer}>
          <Text style={styles.noteTitle}>{category.name}</Text>
        </View>
      ))
    )}
  </ScrollView>
);

const NotesByFolder = ({ folders, navigation }) => (
  <ScrollView>
    {folders.length === 0 ? (
      <Text type="default">No folders available.</Text>
    ) : (
      folders.map((folder, index) => (
        <View key={index} style={styles.noteContainer}>
          <Text style={styles.noteTitle}>{folder.name}</Text>
        </View>
      ))
    )}
  </ScrollView>
);

function Notes({ navigation }) {
  const [notes, setNotes] = useState([]);
  const [folders, setFolders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newFolder, setNewFolder] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'all', title: 'All Notes' },
    { key: 'category', title: 'By Category' },
    { key: 'folder', title: 'By Folder' },
  ]);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const notesList = await fetchNotes();
        setNotes(notesList);
      } catch (error) {
        console.error('Failed to load notes', error);
      }
    };

    const loadFolders = async () => {
      try {
        const foldersList = await fetchFolders();
        setFolders(foldersList);
      } catch (error) {
        console.error('Failed to load folders', error);
      }
    };

    const loadCategories = async () => {
      try {
        const categoriesList = await fetchCategories();
        setCategories(categoriesList);
      } catch (error) {
        console.error('Failed to load categories', error);
      }
    };

    loadNotes();
    loadFolders();
    loadCategories();
  }, []);

  const handleAddFolder = async () => {
    try {
      await addFolder({ name: newFolder });
      setNewFolder('');
      const foldersList = await fetchFolders();
      setFolders(foldersList);
    } catch (error) {
      console.error('Failed to add folder', error);
    }
  };

  const handleAddCategory = async () => {
    try {
      await addCategory({ name: newCategory });
      setNewCategory('');
      const categoriesList = await fetchCategories();
      setCategories(categoriesList);
    } catch (error) {
      console.error('Failed to add category', error);
    }
  };

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'all':
        return <AllNotes notes={notes} navigation={navigation} />;
      case 'category':
        return <NotesByCategory categories={categories} navigation={navigation} />;
      case 'folder':
        return <NotesByFolder folders={folders} navigation={navigation} />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageBox title="Your Notes" onClose={() => navigation.goBack()}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: Dimensions.get('window').width }}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="New Folder"
            value={newFolder}
            onChangeText={setNewFolder}
          />
          <Button title="Add Folder" onPress={handleAddFolder} />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="New Category"
            value={newCategory}
            onChangeText={setNewCategory}
          />
          <Button title="Add Category" onPress={handleAddCategory} />
        </View>
      </PageBox>
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('NoteEditor')}
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default Notes;