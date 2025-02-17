import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Cell } from 'react-native-tableview-simple';
import { getFontSize } from '../responsiveFont';
import Icon from 'react-native-vector-icons/Ionicons';

const Card = (props) => {
  return (
    <TouchableOpacity onPress={() => props.navigation.navigate(props.page)}>
      <Cell
        {...props}
        backgroundColor={'transparent'}
        highlightUnderlayColor={'transparent'}
        cellContentView={
          <View style={styles.card}>
            <Text style={styles.cardText}>{props.title}</Text>
            <Icon name="chevron-forward" size={20} color="black" style={styles.chevron} />
          </View>
        }
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#E2E2E2',
    padding: 16,
    paddingTop: 100,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  cardText: {
    fontSize: getFontSize(18)
  },
  chevron: {
    marginLeft: 10
  }
});

export default Card;