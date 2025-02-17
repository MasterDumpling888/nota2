import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import styles from '../styles';
import Card from '../components/Card';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';

function HomePage({ navigation }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.subcontainer}>
          <Text style={[styles.h1Text, { textAlign: 'center' }]}>Welcome to Nota 👋</Text>
          <Text style={[styles.body, { textAlign: 'center' }]}>Please sign up to get started</Text>
          <Button title="Sign Up" onPress={() => navigation.navigate('SignUp')} />
        </View>
        <StatusBar style="auto" />
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView horizontal={false}>
          <View style={styles.subcontainer}>
            <Text style={[styles.h1Text, { textAlign: 'center' }]}>Welcome to Nota 👋</Text>
            <Text style={[styles.body, { textAlign: 'center' }]}>Get Started</Text>
          </View>
          <View style={styles.subcontainer}>
            <Card title="Guide to Markdown" page="MarkdownGuide" navigation={navigation} style={styles} />
            <Card title="My Notes" page="Notes" navigation={navigation} style={styles} />
            <Card title="Take a Quiz" page="Quiz" navigation={navigation} style={styles} />
          </View>
          <StatusBar style="auto" />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default HomePage;