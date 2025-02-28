import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ScrollView, View, Text, PanResponder, Animated, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native'; // Import this!
import PageBox from '../components/PageBox';
import Icon from 'react-native-vector-icons/Ionicons';
import { generateQuestionsAndAnswers } from '../services/aiService';
import { fetchNotes } from '../services/notesService';
import { getFontSize } from '../responsiveFont';

const SCREEN_WIDTH = Dimensions.get('window').width;

function Quizes({ navigation }) {
  const [notes, setNotes] = useState([]);
  const slideAnims = useRef({}); // Store slide animations for each note

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const notesList = await fetchNotes();
        setNotes(notesList);
      } catch (error) {
        console.error('Failed to load notes', error);
      }
    };

    loadNotes();
  }, []);

  // 🟢 Reset all sliders when the user returns to this screen
  useFocusEffect(
    useCallback(() => {
      Object.values(slideAnims.current).forEach(anim => {
        anim.setValue(0);
      });
    }, [])
  );

  const handleNoteSelect = async (note) => {
    try {
      const generatedQuiz = await generateQuestionsAndAnswers(note.content);
      navigation.navigate('QuizDetail', { quiz: generatedQuiz });
    } catch (error) {
      console.error('Failed to generate quiz', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#181818' }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <PageBox title="Select a Note for Quiz" onClose={() => navigation.goBack()}>
          {notes.length === 0 ? (
            <Text type="default">No notes available.</Text>
          ) : (
            notes.map((note, index) => (
              <SlideButton
                key={note.id || index}
                note={note}
                onSelect={handleNoteSelect}
                slideAnims={slideAnims}
              />
            ))
          )}
        </PageBox>
      </ScrollView>
    </SafeAreaView>
  );
}

const SlideButton = ({ note, onSelect, slideAnims }) => {
  if (!slideAnims.current[note.id]) {
    slideAnims.current[note.id] = new Animated.Value(0);
  }

  const slideAnim = slideAnims.current[note.id];

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        const maxSlideDistance = SCREEN_WIDTH - 110;
        if (gestureState.dx >= 0 && gestureState.dx <= maxSlideDistance) {
          slideAnim.setValue(gestureState.dx);
        }
      },
      onPanResponderRelease: (e, gestureState) => {
        const maxSlideDistance = SCREEN_WIDTH - 110;
        const halfwayPoint = maxSlideDistance / 2;

        if (gestureState.dx > halfwayPoint) {
          // 🟢 Spring to the end & THEN call onSelect
          Animated.spring(slideAnim, {
            toValue: maxSlideDistance,
            useNativeDriver: false,
          }).start(() => {
            onSelect(note);
          });
        } else {
          Animated.spring(slideAnim, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  return (
    <View style={styles.noteContainer}>
      <Animated.View
        {...panResponder.panHandlers}
        style={[styles.slideButton, { transform: [{ translateX: slideAnim }] }]}
      >
        <Icon name="arrow-forward-outline" size={24} color="black" />
      </Animated.View>
      <View style={styles.slideContent}>
        <Text type="title" style={styles.title}>{note.title}</Text>
        <View style={styles.slideTextContainer}>
          <Icon name="sparkles-outline" size={12} color="#ACACAC" />
          <Text style={styles.slideText}>Slide to Generate Quiz</Text>
        </View>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  noteContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#33FD0A',
    borderRadius: 50,
    backgroundColor: "#181818",
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  slideButton: {
    padding: 10,
    backgroundColor: '#33FD0A',
    borderRadius: 50,
    alignItems: 'center',
    gap: 10,
    zIndex: 1
  },
  slideContent: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    color: 'white',
    fontSize: getFontSize(16),
    fontWeight: 'bold',
  },
  slideTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  slideText: {
    color: '#ACACAC',
    fontSize: getFontSize(12),
    fontWeight: 'light',
  }
});

export default Quizes;