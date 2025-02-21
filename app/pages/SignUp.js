import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PageBox from '../components/PageBox';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { getFontSize } from '../responsiveFont';

function SignUp({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      // Handle password mismatch
      console.error("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save the username to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        username,
        email,
      });

      // Navigate to the homepage
      navigation.navigate('Home');
    } catch (error) {
      console.error(error);
      // Handle sign-up error
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageBox title="Sign Up" onClose={() => navigation.goBack()}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Username</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder='Type in your username here'
          />
        </View>
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
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.signUpText}>Sign Up</Text>
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
  signUpButton: {
    backgroundColor: '#32FB0A',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 5
  },
  signUpText: {
    fontSize: getFontSize(16),
    fontWeight: 'bold'
  }
});

export default SignUp;
