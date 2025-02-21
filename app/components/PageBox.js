import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { getFontSize } from '../responsiveFont';

const PageBox = ({ title, children, onClose }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.pageTitle}>
          <Icon name="chevron-back-outline" size={24} color="black" style={styles.closeIcon} />
          <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pageTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: getFontSize(18

    ),
    fontWeight: 'bold',
    marginBottom: 16,
  },
  closeIcon: {
    padding: 0,
    marginBottom: 15,
  },
});

export default PageBox;
