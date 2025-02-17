import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PageBox from '../components/PageBox';
import Markdown from 'react-native-markdown-display';
import { addNote, getNote, updateNote, fetchFolders, fetchCategories } from '../services/notesService';

function NoteEditor({ route, navigation }) {
  const { noteId } = route.params || {};
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [folder, setFolder] = useState('');
  const [category, setCategory] = useState('');
  const [folders, setFolders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [folderModalVisible, setFolderModalVisible] = useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);

  useEffect(() => {
    const loadNote = async () => {
      if (noteId) {
        try {
          const note = await getNote(noteId);
          setTitle(note.title);
          setContent(note.content);
          setFolder(note.folder || '');
          setCategory(note.category || '');
        } catch (error) {
          console.error('Failed to load note', error);
        }
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

    loadNote();
    loadFolders();
    loadCategories();
  }, [noteId]);

  const handleSaveNote = async () => {
    try {
      const note = { title, content, folder, category };
      if (noteId) {
        await updateNote(noteId, note);
      } else {
        await addNote(note);
      }
      navigation.goBack();
    } catch (error) {
      console.error('Failed to save note', error);
    }
  };

  const renderFolderItem = ({ item }) => (
    <TouchableOpacity onPress={() => { setFolder(item.id); setFolderModalVisible(false); }}>
      <Text style={styles.modalItem}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity onPress={() => { setCategory(item.id); setCategoryModalVisible(false); }}>
      <Text style={styles.modalItem}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageBox title={noteId ? "Edit Note" : "Create Note"} onClose={() => navigation.goBack()}>
        <View style={styles.inputContainer}>
          <Text>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>Content (Markdown supported)</Text>
          <TextInput
            style={styles.textArea}
            value={content}
            onChangeText={setContent}
            multiline
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>Folder</Text>
          <TouchableOpacity onPress={() => setFolderModalVisible(true)} style={styles.selector}>
            <Text>{folder ? folders.find(f => f.id === folder)?.name : 'Select Folder'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <Text>Category</Text>
          <TouchableOpacity onPress={() => setCategoryModalVisible(true)} style={styles.selector}>
            <Text>{category ? categories.find(c => c.id === category)?.name : 'Select Category'}</Text>
          </TouchableOpacity>
        </View>
        <Button title="Save Note" onPress={handleSaveNote} />
        <View style={styles.previewContainer}>
          <Text>Preview:</Text>
          <Markdown>{content}</Markdown>
        </View>
      </PageBox>

      <Modal visible={folderModalVisible} animationType="slide">
        <SafeAreaView style={styles.modalContainer}>
          <FlatList
            data={folders}
            renderItem={renderFolderItem}
            keyExtractor={(item) => item.id}
          />
          <Button title="Close" onPress={() => setFolderModalVisible(false)} />
        </SafeAreaView>
      </Modal>

      <Modal visible={categoryModalVisible} animationType="slide">
        <SafeAreaView style={styles.modalContainer}>
          <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id}
          />
          <Button title="Close" onPress={() => setCategoryModalVisible(false)} />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 8,
    marginTop: 8,
  },
  textArea: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 8,
    marginTop: 8,
    height: 150,
  },
  selector: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 8,
    marginTop: 8,
  },
  modalContainer: {
    flex: 1,
    padding: 16,
  },
  modalItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  previewContainer: {
    marginTop: 16,
  },
});

export default NoteEditor;
