import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NoteNavBar from '../components/NoteNavBar';
import PageBox from '../components/PageBox';
import Icon from 'react-native-vector-icons/Ionicons';
import Markdown from 'react-native-markdown-display';
import { getFontSize } from '../responsiveFont';
import { addNote, getNote, updateNote, fetchFolders, fetchTags } from '../services/notesService';
import { summarizeNote } from '../services/aiService';
import Footer from '../components/Footer';

function NoteEditor({ route, navigation }) {
  const { noteId } = route.params || {};
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [summarizedContent, setSummarizedContent] = useState('');
  const [folder, setFolder] = useState('');
  const [tag, setTag] = useState('');
  const [folders, setFolders] = useState([]);
  const [tags, setTags] = useState([]);
  const [folderDropdownVisible, setFolderDropdownVisible] = useState(false);
  const [tagDropdownVisible, setTagDropdownVisible] = useState(false);

  useEffect(() => {
    const loadNote = async () => {
      if (noteId) {
        try {
          const note = await getNote(noteId);
          setTitle(note.title);
          setContent(note.content);
          setSummarizedContent(note.summary || '');
          setFolder(note.folder || '');
          setTag(note.tag || '');
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

    const loadTags = async () => {
      try {
        const tagsList = await fetchTags();
        setTags(tagsList);
      } catch (error) {
        console.error('Failed to load tags', error);
      }
    };

    loadNote();
    loadFolders();
    loadTags();
  }, [noteId]);

  const handleSaveNote = async () => {
    try {
      const note = { 
        title, 
        content, 
        folder, 
        tag,
        summary: summarizedContent 
      };
      
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

  const handleSummarizeNote = async () => {
    try {
      const summary = await summarizeNote(content);
      setSummarizedContent(summary);
    } catch (error) {
      console.error('Failed to summarize note', error);
    }
  };

  const renderFolderItem = ({ item }) => (
    <TouchableOpacity onPress={() => { setFolder(item.id); setFolderDropdownVisible(false); }}>
      <Text style={styles.dropdownItem}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderTagItem = ({ item }) => (
    <TouchableOpacity onPress={() => { setTag(item.id); setTagDropdownVisible(false); }}>
      <Text style={styles.dropdownItem}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <NoteNavBar title={title || "New Note"} /> */}
      <PageBox title={noteId ? "Edit Note" : "Create Note"} onClose={() => navigation.goBack()}>
        <ScrollView>
          <View style={styles.header}>
            <TextInput
              style={styles.input}
              value={title}
              placeholder='Add your title'
              onChangeText={setTitle}
            />
            <TouchableOpacity style={styles.aiButton} onPress={handleSummarizeNote} >
              <Icon name="sparkles" size={24} color="black" style={styles.closeIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.previewContainer}>
            <Text style={styles.inputTitle}>Summary:</Text>
            <Text>{summarizedContent}</Text>
          </View>
          <View style={styles.previewContainer}>
            <Text style={styles.inputTitle}>Preview:</Text>
            <Markdown>{content}</Markdown>
          </View>
          <TextInput
            style={styles.textArea}
            value={content}
            placeholder='Start typing here! (Markdown supported)'
            onChangeText={setContent}
            multiline
          />

          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Folder</Text>
            <TouchableOpacity onPress={() => setFolderDropdownVisible(!folderDropdownVisible)} style={styles.selector}>
              <Text>{folder ? folders.find(f => f.id === folder)?.name : 'Select Folder'}</Text>
            </TouchableOpacity>
            {folderDropdownVisible && (
              <View style={styles.dropdown}>
                <FlatList
                  data={folders}
                  renderItem={renderFolderItem}
                  keyExtractor={(item) => item.id}
                />
              </View>
            )}
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Tag</Text>
            <TouchableOpacity onPress={() => setTagDropdownVisible(!tagDropdownVisible)} style={styles.selector}>
              <Text>{tag ? tags.find(c => c.id === tag)?.name : 'Select Tag'}</Text>
            </TouchableOpacity>
            {tagDropdownVisible && (
              <View style={styles.dropdown}>
                <FlatList
                  data={tags}
                  renderItem={renderTagItem}
                  keyExtractor={(item) => item.id}
                />
              </View>
            )}
          </View>
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveNote} >
            <Text style={{ fontWeight: 'bold', fontSize: getFontSize(18) }}>Save</Text>
          </TouchableOpacity>
          <Footer />
        </ScrollView>
      </PageBox>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    fontSize: getFontSize(24),
    fontWeight: 'bold',
  },
  inputTitle: {
    fontSize: getFontSize(14),
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 32,
  },
  textArea: {
    backgroundColor: '#CFFFC5',
    borderRadius: 5,
    padding: 8,
    marginBottom: 16,
    height: 150,
  },
  saveButton: {
    padding: 16,
    backgroundColor: '#32FB0A',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  aiButton: {
    padding: 8,
    backgroundColor: '#32FB0A',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selector: {
    borderWidth: 2,
    borderColor: '#32FB0A',
    borderRadius: 5,
    padding: 8,
    marginBottom: 8,
    marginTop: 8,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginTop: 8,
    maxHeight: 150,
  },
  dropdownItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  previewContainer: {
    marginTop: 16,
    marginBottom: 16,
    borderLeftWidth: 2,
    borderLeftColor: '#32FB0A',
    padding: 8,
  },
});

export default NoteEditor;
