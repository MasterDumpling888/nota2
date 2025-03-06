import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { getFontSize } from '../responsiveFont';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const LoggedInNavBar = () => {
  const [menuProfileVisible, setMenuProfileVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.navigate('Home');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <View style={styles.navBar}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </TouchableOpacity>
      <View style={styles.navButtons}>
        <TouchableOpacity onPress={() => { setMenuVisible(!menuVisible); setMenuProfileVisible(false); }}>
          <Icon name="menu" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          setMenuProfileVisible(!menuProfileVisible);
          setMenuVisible(false);
        }} style={styles.profileIcon}>
          <Icon name="person-circle-outline" size={30} color="white" />
        </TouchableOpacity>
      </View>
      {menuVisible && (
        <View style={[styles.menu, { right: 85 }]}>
          <TouchableOpacity onPress={() => { navigation.navigate('Home'); setMenuVisible(false); }}>
            <Text style={styles.menuItem}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { navigation.navigate('Notes'); setMenuVisible(false); }}>
            <Text style={styles.menuItem}>Notes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { navigation.navigate('Quizes'); setMenuVisible(false); }}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#33FD0A',
    borderBottomWidth: 1,
    paddingRight: 15,
    paddingLeft: 15,
    backgroundColor: '#181818',
  },
  logo: {
    width: 60,
    height: 60,
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
    right: 35,
    backgroundColor: '#181818',
    borderRightWidth: 3,
    borderColor: '#33FD0A',
    paddingHorizontal: 0,
    zIndex: 2,
  },
  menuItem: {
    flex: 1,
    paddingVertical: 10,
    paddingLeft: 20,
    paddingRight: 5,
    fontSize: getFontSize(14),
    color: 'white',
    borderBottomWidth: 2,
    borderBottomColor: '#33FD0A',
    justifyContent: 'flex-end',
    textAlign: 'right',
    fontFamily: 'Raleway-Regular',
  },
  navItem: {
    fontSize: getFontSize(12)
  },
  profileIcon: {
    padding: 8,
  },
});

export default LoggedInNavBar;
