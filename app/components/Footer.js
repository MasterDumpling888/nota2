import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { getFontSize } from '../responsiveFont';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Image source={require('../assets/footer-logo.png')} style={styles.logo} />
      <Text style={styles.footerText}>© 2025 Nota. All rights reserved.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    marginTop: 50,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  footerLinks: {
    alignItems: 'center',
    gap: 16,

  },
  footerItem: {
    fontSize: getFontSize(18),
  },
  footerText: {
    fontSize: getFontSize(12),
    color: 'gray',
  },
});

export default Footer;

