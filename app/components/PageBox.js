import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { getFontSize } from '../responsiveFont';

const PageBox = ({ title, children, onClose }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={onClose}>
          <Icon name="close-circle-outline" size={24} color="black" style={styles.closeIcon} />
        </TouchableOpacity>
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#E5E5E5',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: getFontSize(24),
    fontWeight: 'bold',
    marginBottom: 16,
  },
  closeIcon: {
    padding: 0,
    marginBottom: 15,
  },
});

export default PageBox;
