import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { getFontSize } from '../responsiveFont';
import Icon from 'react-native-vector-icons/Ionicons';

const Card = (props) => {
  if (props.isLeft) {

    return (
      <TouchableOpacity onPress={() => props.navigation.navigate(props.page)} style={styles.card}>
        <View style={styles.cardInnerStacked}>
          <Text style={styles.cardText}>{props.title}</Text>
          <Icon name="chevron-forward" size={20} color="white" style={styles.chevron} />
        </View>
        <View style={styles.cardInner} />

      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate(props.page)} style={styles.cardRight}>
        <View style={styles.cardInnerStackedRight}>
          <Text style={styles.cardText}>{props.title}</Text>
          <Icon name="chevron-forward" size={20} color="white" style={styles.chevron} />
        </View>
        <View style={styles.cardInnerRight} />

      </TouchableOpacity>
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
    padding: 30,
    width: '75%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
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
    padding: 30,
    width: '75%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
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

export default Card;