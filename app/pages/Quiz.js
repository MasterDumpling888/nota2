import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PageBox from '../components/PageBox';
import { generateReviewQuestions } from '../services/aiService';

function Quiz({ navigation }) {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [questions, setQuestions] = useState([]);

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

  const handleNoteSelect = async (note) => {
    setSelectedNote(note);
    try {
      const generatedQuestions = await generateReviewQuestions(note.content);
      setQuestions(generatedQuestions);
    } catch (error) {
      console.error('Failed to generate review questions', error);
    }
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
              <View style={styles.questionsContainer}>
                {questions.map((question, index) => (
                  <View key={index} style={styles.question}>
                    <Text>{question}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </PageBox>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  noteContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  selectedNoteContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: 'lightgray',
  },
  questionsContainer: {
    marginTop: 16,
  },
  question: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
});

export default Quiz;