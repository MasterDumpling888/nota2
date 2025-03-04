import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Card from '../components/Card';
import ContentCard from '../components/ContentCard';
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

  const contentCards = [
    { title: "Markdown-Powered Note-Taking", content: "Write freely with Markdown for effortless formatting. Bold text, headings, lists—everything you need for structured, clean notes.", isLeft: true },
    { title: "AI-Powered Summarization", content: "No time to review long notes? Let Nota’s AI create quick, concise summaries so you can absorb key points faster.", isLeft: false },
    { title: "Smart Quiz Generation", content: "Studying for an exam? Transform your notes into quiz questions instantly and test your knowledge with AI-generated questions.", isLeft: true },
  ];

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView horizontal={false} showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false} style={{ borderRightWidth: 1, borderLeftWidth: 1, borderColor: '#33FD0A', flex: 1 }}>
          <View style={[styles.subcontainer, { paddingHorizontal: 35 }]}>
            <Text style={[styles.h1Text, { textAlign: 'left' }]}>Welcome to Nota 👋</Text>
            <Text style={[styles.subtitleText, { textAlign: 'left' }]}>
              Your notes{"\n"}just got <Text style={{ fontFamily: 'Raleway-SemiBold' }}>even better.</Text>
            </Text>
            <View>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}
                style={styles.promptButton}
              >
                <Text style={styles.promptButtonText}>Join Nota</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('MarkdownGuide')}
                style={[styles.promptButton, { backgroundColor: '#181818', borderWidth: 1, borderColor: '#33FD0A' }]}
              >
                <Text style={[styles.promptButtonText, { color: '#33FD0A' }]}>What is Markdown?</Text>
              </TouchableOpacity>
            </View>
            <Text style={[styles.body, { textAlign: 'center' }]}>Find out more!</Text>
            <Animated.Image source={require('../assets/CaretDoubleDown.png')} style={[styles.image, animatedStyle]} />
          </View>
          <View style={[styles.subcontainer, { gap: 100 }]}>
            {contentCards.map((card, index) => (
              <ContentCard key={index} title={card.title} content={card.content} isLeft={card.isLeft} />
            ))}
          </View>
          <Footer />
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView horizontal={false} showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false} style={{ borderRightWidth: 1, borderLeftWidth: 1, borderColor: '#33FD0A', flex: 1 }}>

          <View style={[styles.subcontainer, { paddingHorizontal: 45 }]}>
            <Text style={[styles.h1Text, { textAlign: 'left' }]}>Welcome Back,{"\n"}{username} 💚</Text>
            <Text style={[styles.subtitleText, { textAlign: 'left' }]}>Ready when you are.</Text>
          </View>
          <View style={styles.subcontainer}>
            <Card title="My Notes" page="Notes" navigation={navigation} isLeft={true} />
            <Card title="Take a Quiz" page="Quizes" navigation={navigation} isLeft={false} />
            <Card title="Markdown Help" page="MarkdownGuide" navigation={navigation} isLeft={true} />
          </View>
          <Footer />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  subcontainer: {
    flexDirection: 'column',
    flex: 1,
    gap: 15,
    marginTop: 50,
  },
  h1Text: {
    fontSize: getFontSize(27),
    fontWeight: 'bold',
    color: 'white',
    paddingLeft: 10,
    fontFamily: 'Raleway-SemiBold',
  },
  subtitleText: {
    fontSize: getFontSize(18),
    fontWeight: 'bold',
    color: 'white',
    paddingLeft: 10,
    fontFamily: 'Raleway-Regular',
  },
  body: {
    fontSize: getFontSize(14),
    color: 'white',
    marginBottom: 16,
    fontFamily: 'Raleway-Regular',
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 16,
  },
  promptButton: {
    backgroundColor: '#33FD0A',
    padding: 8,
    borderRadius: 5,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  promptButtonText: {
    fontSize: getFontSize(14),
    color: 'black',
    fontFamily: 'Raleway-SemiBold',
  },
});

export default HomePage;