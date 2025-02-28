import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PageBox from '../components/PageBox';
import Icon from 'react-native-vector-icons/Ionicons';
import { getFontSize } from '../responsiveFont';

function QuizDetail({ route, navigation }) {
  const { quiz } = route.params;
  const [revealedAnswers, setRevealedAnswers] = useState(Array(quiz.length).fill(false));

  const toggleAnswer = (index) => {
    const newRevealedAnswers = [...revealedAnswers];
    newRevealedAnswers[index] = !newRevealedAnswers[index];
    setRevealedAnswers(newRevealedAnswers);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <PageBox title="Quiz" onClose={() => navigation.goBack()}>
          {quiz.map((qaPair, index) => (
            <View key={index} style={styles.questionContainer}>
              <View style={styles.question}>
                <Text style={[styles.questionAnswerText, { fontFamily: 'Raleway-SemiBold', color: 'white' }]}>Question {index + 1}: </Text>
                <Text type="default" style={[styles.questionAnswerText, { color: 'white' }]}>{qaPair.question}</Text>
              </View>
              <TextInput
                style={styles.answerInput}
                placeholder="Your answer"
                multiline
              />
              <TouchableOpacity onPress={() => toggleAnswer(index)} style={styles.revealButton}>
                <Text style={styles.revealButtonText}>
                  {revealedAnswers[index] ? 'Hide Answer' : 'Reveal Answer'}
                </Text>
                <Icon name={revealedAnswers[index] ? "eye-off-outline" : "eye-outline"} size={20} color="black" />
              </TouchableOpacity>
              {revealedAnswers[index] && (
                <View style={styles.answer}>
                  <Text style={[styles.questionAnswerText, { fontFamily: 'Raleway-SemiBold', }]}>Answer {index + 1}: </Text>
                  <Text type="default" style={styles.questionAnswerText}>{qaPair.answer}</Text>
                </View>
              )}
            </View>
          ))}
        </PageBox>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  questionContainer: {
    flex: 1,
    gap: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#C9C9C9',
    borderRadius: 5,
  },
  question: {
    borderWidth: 2,
    borderColor: '#33FD0A',
    padding: 20,
    borderRadius: 5,
    gap: 10
  },
  questionAnswerText: {
    color: 'black',
    fontSize: getFontSize(16),
    fontFamily: 'Raleway-Regular',
  },
  answerInput: {
    marginTop: 10,
    padding: 20,
    backgroundColor: '#CFFFC5',
    borderRadius: 5,
    fontSize: getFontSize(16),
    color: 'black',
    fontFamily: 'Raleway-Regular',
  },
  answer: {
    borderTopWidth: 5,
    borderTopColor: '#33FD0A',
    backgroundColor: '#33FD0A',
    padding: 20,
    borderRadius: 5,
    gap: 10
  },
  revealButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#32FB0A',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  revealButtonText: {
    color: 'black',
    fontSize: getFontSize(16),
    fontFamily: 'Raleway-Bold',
  },
  answerText: {
    marginTop: 10,
    fontSize: getFontSize(16),
    color: 'white',
    fontFamily: 'Raleway-Regular',
  },
});

export default QuizDetail;
