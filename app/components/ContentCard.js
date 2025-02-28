import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getFontSize } from '../responsiveFont';

const ContentCard = (props) => {
  if (props.isLeft) {
    return (
      <View style={styles.card}>
        <View style={styles.cardInnerStacked}>
          <Text style={styles.cardText}>{props.title}</Text>
          <Text style={styles.cardContent}>
            {props.content}
          </Text>
        </View>
        <View style={styles.cardInner} />
      </View>
    );
  } else {
    return (
      <View style={styles.cardRight}>
        <View style={styles.cardInnerStackedRight}>
          <Text style={[styles.cardText, { textAlign: 'right' }]}>{props.title}</Text>
          <Text style={[styles.cardContent, { textAlign: 'right' }]}>
            {props.content}
          </Text>
        </View>
        <View style={styles.cardInnerRight} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 40,
  },
  cardRight: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 40,
  },
  cardInner: {
    backgroundColor: '#181818',
    borderWidth: 1,
    borderColor: '#33FD0A',
    padding: 40,
    width: '75%',
    top: 0,
    left: 0,
    zIndex: 0,
  },
  cardInnerRight: {
    backgroundColor: '#181818',
    borderWidth: 1,
    borderColor: '#33FD0A',
    padding: 40,
    width: '75%',
    top: 0,
    right: 0,
    zIndex: 0,
  },
  cardInnerStacked: {
    backgroundColor: '#181818',
    borderWidth: 1,
    borderColor: '#33FD0A',
    padding: 10,
    width: '75%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'column',
    position: 'absolute',
    gap: 8,
    top: 10,
    left: 10,
    zIndex: 1,
  },
  cardInnerStackedRight: {
    backgroundColor: '#181818',
    borderWidth: 1,
    borderColor: '#33FD0A',
    padding: 10,
    width: '75%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexDirection: 'column',
    position: 'absolute',
    gap: 8,
    top: 10,
    right: 10,
    zIndex: 1,
  },
  cardText: {
    fontSize: getFontSize(24),
    textAlign: 'left',
    color: 'white',
    fontFamily: 'Raleway-SemiBold',
  },
  cardContent: {
    fontSize: getFontSize(14),
    textAlign: 'left',
    color: 'white',
    fontFamily: 'Raleway-Regular',
  },
  chevron: {
    marginLeft: 10
  }
});

export default ContentCard;