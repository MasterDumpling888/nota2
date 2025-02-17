import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PageBox from '../components/PageBox';

import styles from '../styles';

function Quiz({ navigation }) {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const storedNotes = await AsyncStorage.getItem('notes');
        if (storedNotes) {
          setNotes(JSON.parse(storedNotes));
        }
      } catch (error) {
        console.error('Failed to load notes', error);
      }
    };

    fetchNotes();
  }, []);

  const handleNoteSelect = (note) => {
    setSelectedNote(note);
    // Logic to generate quiz from the selected note
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <PageBox title="Select a Note for Quiz" onClose={() => navigation.goBack()}>
          {notes.length === 0 ? (
            <Text type="default">No notes available.</Text>
          ) : (
            notes.map((note, index) => (
              <TouchableOpacity key={index} onPress={() => handleNoteSelect(note)} style={styles.noteContainer}>
                <Text type="subtitle">{note.title}</Text>
                <Text type="default">{note.content}</Text>
              </TouchableOpacity>
            ))
          )}
          {selectedNote && (
            <View style={styles.selectedNoteContainer}>
              <Text type="title">Selected Note</Text>
              <Text type="subtitle">{selectedNote.title}</Text>
              <Text type="default">{selectedNote.content}</Text>
              {/* Add quiz generation logic here */}
            </View>
          )}
        </PageBox>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Quiz;