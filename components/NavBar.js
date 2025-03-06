import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getFontSize } from '../responsiveFont';


const NavBar = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.navBar}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </TouchableOpacity>
      <View style={styles.navButtons}>
        <TouchableOpacity style={[styles.navItem, { borderWidth: 0 }]} onPress={() => navigation.navigate('Login')}>
          <Text style={[styles.navItemText, { color: '#33FD0A' }]}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.navItemText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  navItem: {
    paddingRight: 10,
    paddingLeft: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: '#33FD0A',
    borderRadius: 100,
  },
  navItemText: {
    fontSize: getFontSize(12),
    color: 'white',
    fontFamily: 'Raleway-Regular',
  }
})

export default NavBar;
