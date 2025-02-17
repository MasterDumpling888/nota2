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
        <TouchableOpacity style={{ backgroundColor: 'black', padding: '5', borderRadius: 5 }} onPress={() => navigation.navigate('Login')}>
          <Text style={[styles.navItem, { color: 'white' }]}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.navItem}>Sign Up</Text>
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
    fontSize: getFontSize(12)
  }
})

export default NavBar;
