import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { getFontSize } from '../responsiveFont';

const NoteNavBar = ({ title }) => {
  const navigation = useNavigation();

  const [menuProfileVisible, setMenuProfileVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.navigate('Login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };
  return (
    <View style={styles.navBar}>
      <TouchableOpacity style={styles.navButtons} onPress={() => navigation.goBack()}>
        <Icon name="chevron-back-outline" size={30} color="black" />
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </TouchableOpacity>
      <Text style={styles.noteTitle}>{title}</Text>
      <View style={styles.navButtons}>
        <TouchableOpacity onPress={() => { setMenuVisible(!menuVisible); setMenuProfileVisible(false); }}>
          <Icon name="menu" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          setMenuProfileVisible(!menuProfileVisible);
          setMenuVisible(false);
        }} style={styles.profileIcon}>
          <Icon name="person-circle-outline" size={30} color="black" />
        </TouchableOpacity>
      </View>
      {menuVisible && (
        <View style={styles.menu}>
          <TouchableOpacity onPress={() => { navigation.navigate('Home'); setMenuVisible(false); }}>
            <Text style={styles.menuItem}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { navigation.navigate('Notes'); setMenuVisible(false); }}>
            <Text style={styles.menuItem}>Notes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { navigation.navigate('Quiz'); setMenuVisible(false); }}>
            <Text style={styles.menuItem}>Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { navigation.navigate('MarkdownGuide'); setMenuVisible(false); }}>
            <Text style={styles.menuItem}>Help</Text>
          </TouchableOpacity>
        </View>
      )}
      {menuProfileVisible && (
        <View style={styles.menu}>
          <TouchableOpacity onPress={() => {
            navigation.navigate('AccountSettings');

            setMenuProfileVisible(false);
          }}>
            <Text style={styles.menuItem}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={[styles.menuItem, { color: 'red' }]}>Sign out</Text>
          </TouchableOpacity>
        </View>
      )}
    </View >
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#33FD0A',
    borderBottomWidth: 2,
    paddingRight: 15,
    paddingLeft: 15,
    backgroundColor: 'white',
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  navButtons: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center'
  },
  menu: {
    position: 'absolute',
    top: 50,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    zIndex: 2,
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  noteTitle: {
    fontSize: getFontSize(14),
    textDecorationLine: 'underline',
    textDecorationColor: '#33FD0A',
  },
  profileIcon: {
    padding: 8,
  },
});

export default NoteNavBar;
