import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getFontSize } from '../responsiveFont';
import Markdown from 'react-native-markdown-display';

const MarkdownCard = ({ title, markdown, key }) => {
  return (
    <View style={styles.card} key={key}>
      <Text style={styles.cardTitle}>{title}</Text>
      <View style={styles.cardContent}>
        <Markdown>{markdown}</Markdown>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#33FD0A',
    padding: 16,
    borderRadius: 10,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    overflow: 'hidden'
  },
  cardContent: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  cardTitle: {
    fontSize: getFontSize(18),
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default MarkdownCard;