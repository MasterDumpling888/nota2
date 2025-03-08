import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getFontSize } from '../responsiveFont';
import Markdown from 'react-native-markdown-display';
import markdownStyles from '../markdownStyles';

const MarkdownCard = ({ title, markdown }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <View style={styles.cardContent}>
        <View style={styles.cardInner}>
          <Text style={styles.cardContentTitle}>Input: Markdown</Text>
          <Text style={styles.cardText}>{markdown}</Text>
        </View>
        <View style={styles.cardInnerMD}>
          <Text style={styles.cardContentTitle}>Output</Text>
          <Markdown style={markdownStyles}>{markdown}</Markdown>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#181818',
    borderWidth: 2,
    borderColor: '#33FD0A',
    padding: 16,
    borderRadius: 10,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    gap: 10
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    color: 'white',
    borderTopWidth: 1,
    borderColor: '#33FD0A',
    flexWrap: 'wrap',
    padding: 10,
  },
  cardTitle: {
    fontSize: getFontSize(18),
    fontFamily: 'Raleway-SemiBold',
    color: 'white',
    textAlign: 'center',
  },
  cardContentTitle: {
    fontSize: getFontSize(16),
    fontFamily: 'Raleway-SemiBold',
    color: 'white',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#33FD0A',
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 50,
    marginVertical: 5,
  },
  cardInner: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardInnerMD: {
    // flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#33FD0A',
  },
  cardText: {
    fontSize: getFontSize(16),
    fontFamily: 'Courier',
    color: 'white',
    textAlign: 'left',
  },
});

export default MarkdownCard;