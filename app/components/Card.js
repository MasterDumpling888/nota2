import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { getFontSize } from '../responsiveFont';
import Icon from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';

const Card = (props) => {
  return (
    <TouchableOpacity onPress={() => props.navigation.navigate(props.page)}>
      <LinearGradient
        colors={['#33FD0A', '#1DAE00']}
        style={styles.gradientBorder}
      >
        <View style={styles.card}>
          <Text style={styles.cardText}>{props.title}</Text>
          <Icon name="chevron-forward" size={20} color="black" style={styles.chevron} />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  gradientBorder: {
    padding: 5,
    borderRadius: 100,
    width: '100%',
    backgroundColor: 'transparent',
  },
  card: {
    backgroundColor: 'white',
    padding: 50,
    borderRadius: 100,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardText: {
    fontSize: getFontSize(18),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  chevron: {
    marginLeft: 10
  }
});

export default Card;