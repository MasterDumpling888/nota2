import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, TextInput, StyleSheet, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchNotes, addFolder, addTag, fetchFolders, fetchTags } from '../services/notesService';
import PageBox from '../components/PageBox';
import Icon from 'react-native-vector-icons/Ionicons';
import { getFontSize } from '../responsiveFont';

import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Adjust sizes based on screen width
const FAB_SIZE = Math.min(width, height) * 0.15; // 12% of the smaller screen dimension

const Notes = ({ navigation }) => {
  const [notes, setNotes] = useState([]);
  const [folders, setFolders] = useState([]);
  const [tags, setTags] = useState([]);
  const [newFolder, setNewFolder] = useState('');
  const [newTag, setNewTag] = useState('');
  const [fabExtended, setFabExtended] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const [showFolderInput, setShowFolderInput] = useState(false);
  const [showTagInput, setShowTagInput] = useState(false);
  const [displayMode, setDisplayMode] = useState('notes');

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

    const loadTags = async () => {
      try {
        const tagsList = await fetchTags();
        setTags(tagsList);
      } catch (error) {
        console.error('Failed to load tags', error);
      }
    };

    loadNotes();
    loadFolders();
    loadTags();
  }, []);

  const handleAddFolder = async () => {
    try {
      await addFolder({ name: newFolder });
      setNewFolder('');
      const foldersList = await fetchFolders();
      setFolders(foldersList);
      setShowFolderInput(false);
    } catch (error) {
      console.error('Failed to add folder', error);
    }
  };

  const handleAddTag = async () => {
    try {
      await addTag({ name: newTag });
      setNewTag('');
      const tagsList = await fetchTags();
      setTags(tagsList);
      setShowTagInput(false);
    } catch (error) {
      console.error('Failed to add Tag', error);
    }
  };

  const toggleFab = () => {
    setFabExtended(!fabExtended);
    Animated.timing(animation, {
      toValue: fabExtended ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const fabOptionStyle = (index) => ({
    transform: [
      {
        translateX: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -1 * (index)],
        }),
      },
      {
        scale: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
        }),
      },
    ],
    opacity: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
  });

  const renderNotesByFolder = (folderId) => {
    return notes
      .filter((note) => note.folder === folderId)
      .map((note, index) => (
        <TouchableOpacity
          key={index}
          style={styles.noteContainer}
          onPress={() => navigation.navigate('NoteEditor', { noteId: note.id })}
        >
          <Icon name="document-text-outline" size={24} color="white" />
          <Text style={styles.noteTitle}>{note.title}</Text>
          <Text style={styles.noteContent}>{note.summary || 'Summary'}</Text>
        </TouchableOpacity>
      ));
  };

  const renderNotesByTag = (TagId) => {
    return notes
      .filter((note) => note.tag === TagId)
      .map((note, index) => (
        <TouchableOpacity
          key={index}
          style={styles.noteContainer}
          onPress={() => navigation.navigate('NoteEditor', { noteId: note.id })}
        >
          <Icon name="document-text-outline" size={24} color="white" />
          <Text style={styles.noteTitle}>{note.title}</Text>
          <Text style={styles.noteContent}>{note.summary || 'Summary'}</Text>
        </TouchableOpacity>
      ));
  };

  const renderContent = () => {
    switch (displayMode) {
      case 'notes':
        return notes.map((note, index) => (
          <TouchableOpacity
            key={index}
            style={styles.noteContainer}
            onPress={() => navigation.navigate('NoteEditor', { noteId: note.id })}
          >
            <Icon name="document-text-outline" size={24} color="white" />
            <Text style={styles.noteTitle}>{note.title}</Text>
            <Text style={styles.noteContent}>{note.summary || 'Summary'}</Text>
          </TouchableOpacity>
        ));
      case 'folders':
        return folders.map((folder, index) => (
          <View key={index} style={styles.folderContainer}>
            <Icon name="folder-outline" size={24} color="white" />
            <Text style={styles.folderTitle}>{folder.name}</Text>
            {renderNotesByFolder(folder.id)}
          </View>
        ));
      case 'tags':
        return tags.map((tag, index) => (
          <View key={index} style={styles.tagContainer}>
            <Icon name="pricetag-outline" size={24} color="white" />
            <Text style={styles.tagTitle}>{tag.name}</Text>
            {renderNotesByTag(tag.id)}
          </View>
        ));
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageBox title="Your Notes" onClose={() => navigation.goBack()}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.displayButton, displayMode === 'notes' && styles.activeButton]}
            onPress={() => setDisplayMode('notes')}
          >
            <Icon name="document-text-outline" size={24} color="#33FD0A" />
            <Text style={styles.buttonText}>Notes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.displayButton, displayMode === 'folders' && styles.activeButton]}
            onPress={() => setDisplayMode('folders')}
          >
            <Icon name="folder-outline" size={24} color="#33FD0A" />
            <Text style={styles.buttonText}>Folders</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.displayButton, displayMode === 'tags' && styles.activeButton]}
            onPress={() => setDisplayMode('tags')}
          >
            <Icon name="pricetag-outline" size={24} color="#33FD0A" />
            <Text style={styles.buttonText}>Tags</Text>
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {renderContent()}
        </ScrollView>
        <View style={styles.fabContainer}>
          {fabExtended && (
            <Animated.View style={fabOptionStyle(0)}>
              <TouchableOpacity
                onPress={() => navigation.navigate('NoteEditor')}
                style={styles.fabOption}
              >
                <Icon name="document-text-outline" size={24} color="black" />
                <Text style={styles.fabOptionText}>Note</Text>
              </TouchableOpacity>
            </Animated.View>
          )}
          {fabExtended && (
            <Animated.View style={fabOptionStyle(1)}>
              <TouchableOpacity
                onPress={() => {
                  setShowFolderInput(true);
                  setShowTagInput(false);
                }}
                style={styles.fabOption}
              >
                <Icon name="folder-outline" size={24} color="black" />
                <Text style={styles.fabOptionText}>Folder</Text>
              </TouchableOpacity>
            </Animated.View>
          )}
          {fabExtended && (
            <Animated.View style={fabOptionStyle(2)}>
              <TouchableOpacity
                onPress={() => {
                  setShowTagInput(true);
                  setShowFolderInput(false);
                }}
                style={styles.fabOption}
              >
                <Icon name="pricetag-outline" size={24} color="black" />
                <Text style={styles.fabOptionText}>Tag</Text>
              </TouchableOpacity>
            </Animated.View>
          )}
          <TouchableOpacity
            style={styles.fab}
            onPress={() => {
              toggleFab();
              setShowFolderInput(false);
              setShowTagInput(false);
            }}
          >
            <Icon name={fabExtended ? "close" : "add"} size={35} color="black" />
          </TouchableOpacity>
        </View>
        {showFolderInput && (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="New Folder"
              value={newFolder}
              onChangeText={setNewFolder}
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleAddFolder}>
              <Text style={styles.saveButtonText}>Add Folder</Text>
            </TouchableOpacity>
          </View>
        )}
        {showTagInput && (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="New Tag"
              value={newTag}
              onChangeText={setNewTag}
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleAddTag}>
              <Text style={styles.saveButtonText}>Add Tag</Text>
            </TouchableOpacity>
          </View>
        )}
      </PageBox>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  noteContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#33FD0A',
    gap: 8,
  },
  noteTitle: {
    fontSize: getFontSize(18),
    fontFamily: 'Raleway-SemiBold',
    color: 'white',
    marginBottom: 8,
  },
  noteContent: {
    fontSize: getFontSize(14),
    fontFamily: 'Raleway-Regular',
    color: 'white',
  },
  folderContainer: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#33FD0A',
    borderRadius: 10,
    marginTop: 10,
    gap: 8,
  },
  folderTitle: {
    fontSize: getFontSize(20),
    fontFamily: 'Raleway-SemiBold',
    color: 'white',
    marginBottom: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#33FD0A'
  },
  tagContainer: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#33FD0A',
    borderRadius: 10,
    marginTop: 10,
    gap: 8,
  },
  tagTitle: {
    fontSize: getFontSize(20),
    fontFamily: 'Raleway-SemiBold',
    color: 'white',
    marginBottom: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#33FD0A'
  },
  inputContainer: {
    marginBottom: 16,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#33FD0A',
    backgroundColor: '#33FD0Aa5',
    borderRadius: 5,
    padding: 8,
    marginTop: 8,
    fontSize: getFontSize(16),
  },
  saveButton: {
    backgroundColor: '#33FD0A',
    borderRadius: 5,
    padding: 10,
    marginTop: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'black',
    fontSize: getFontSize(16),
    fontFamily: 'Raleway-SemiBold',
  },
  fabContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingTop: 16,
    flexDirection: 'row',
    gap: FAB_SIZE * 0.7, // Adjust gap based on FAB size
  },
  fab: {
    backgroundColor: '#33FD0A',
    borderRadius: FAB_SIZE / 2,
    width: FAB_SIZE,
    height: FAB_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabOption: {
    backgroundColor: '#33FD0A',
    borderRadius: FAB_SIZE / 2,
    width: FAB_SIZE,
    height: FAB_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    gap: 4,
  },
  fabOptionText: {
    color: 'black',
    fontSize: getFontSize(14),
    fontFamily: 'Raleway-SemiBold',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  displayButton: {
    padding: 10,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#33FD0A',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  activeButton: {
    backgroundColor: '#33FD0Aa3',
    color: 'black',
  },
  buttonText: {
    color: 'white',
    fontSize: getFontSize(15),
    fontFamily: 'Raleway-SemiBold'
  },
});

export default Notes;