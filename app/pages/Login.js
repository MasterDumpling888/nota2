import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PageBox from '../components/PageBox';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { getFontSize } from '../responsiveFont';

function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // Navigate to the homepage
      navigation.navigate('Home');
    } catch (error) {
      console.error(error);
      // Handle login error
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageBox title="Login" onClose={() => navigation.goBack()}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder='Type in your email here'
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </PageBox>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#32FB0A',
    borderRadius: 5,
    padding: 8,
    marginTop: 8,
    backgroundColor: '#CFFFC5'
  },
  inputText: {
    fontSize: getFontSize(14),
  },
  loginButton: {
    backgroundColor: '#32FB0A',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 5
  },
  loginText: {
    fontSize: getFontSize(16),
    fontWeight: 'bold'
  }
});

export default Login;
