import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Card from '../components/Card';
import { getFontSize } from '../responsiveFont';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import Footer from '../components/Footer';

function HomePage({ navigation }) {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUsername(userDoc.data().username);
        }
      } else {
        setUser(null);
        setUsername('');
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: -10,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [animation]);

  const animatedStyle = {
    transform: [{ translateY: animation }],
  };

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.subcontainer}>
          <Text style={[styles.h1Text, { textAlign: 'center' }]}>Welcome to Nota 👋</Text>
          <View>
            <Text style={[styles.body, { textAlign: 'center' }]}>Get Started</Text>
            <Animated.Image source={require('../assets/CaretDoubleDown.png')} style={[styles.image, animatedStyle]} />
          </View>
          <Card title="Sign up!" page="SignUp" navigation={navigation} />
          <Card title="Guide to Markdown" page="MarkdownGuide" navigation={navigation} />
        </View>
        <StatusBar style="auto" />
        <Footer />

      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView horizontal={false}>
          <View style={styles.subcontainer}>
            <Text style={[styles.h1Text, { textAlign: 'center' }]}>Welcome Back, {username} 💚</Text>
          </View>
          <View style={styles.subcontainer}>
            <Card title="Guide to Markdown" page="MarkdownGuide" navigation={navigation} />
            <Card title="My Notes" page="Notes" navigation={navigation} />
            <Card title="Take a Quiz" page="Quiz" navigation={navigation} />
          </View>
          <StatusBar style="auto" />
          <Footer />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    gap: 10
  },
  subcontainer: {
    lexDirection: 'column',
    flex: 1,
    gap: 25,
    marginTop: 50,
  },
  h1Text: {
    fontSize: getFontSize(24),
    fontWeight: 'bold',
    color: 'black',
    padding: 10,
    marginBottom: 20
  },
  body: {
    fontSize: 16,
    marginBottom: 16,
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 16,
  },
});

export default HomePage;