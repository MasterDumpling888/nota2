import React, { useEffect, useState, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import HomePage from './pages/Homepage';
import MarkdownGuide from './pages/MarkdownGuide';
import Quizes from './pages/Quizes';
import QuizDetail from './pages/QuizDetail';
import Notes from './pages/Notes';
import NavBar from './components/NavBar';
import LoggedInNavBar from './components/LoggedInNavBar';
import NoteNavBar from './components/NoteNavBar';
import Footer from './components/Footer';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import NoteEditor from './pages/NoteEditor';
import AccountSettings from './pages/AccountSettings';

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'Raleway-Regular': require('./assets/fonts/Raleway-Regular.ttf'),
        'Raleway-Bold': require('./assets/fonts/Raleway-Bold.ttf'),
        'Raleway-SemiBold': require('./assets/fonts/Raleway-SemiBold.ttf'),
        'Raleway-Light': require('./assets/fonts/Raleway-Light.ttf'),
        'Raleway-Italic': require('./assets/fonts/Raleway-Italic.ttf')
      });
      setFontsLoaded(true);
      SplashScreen.hideAsync();
    };

    SplashScreen.preventAutoHideAsync();
    loadFonts();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
<<<<<<< Updated upstream
    <SafeAreaView style={{ flex: 1, backgroundColor: '#181818' }}>
      <NavigationContainer >
=======
    <SafeAreaView style={{ flex: 1, backgroundColor: '#181818' }} onLayout={onLayoutRootView}>
      <StatusBar style="light" />
      <NavigationContainer>
>>>>>>> Stashed changes
        {user ? <LoggedInNavBar /> : <NavBar />}
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen name="MarkdownGuide" component={MarkdownGuide} />
          <Stack.Screen name="Notes" component={Notes} />
          <Stack.Screen name="Quizes" component={Quizes} />
          <Stack.Screen name="QuizDetail" component={QuizDetail} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="NoteEditor" component={NoteEditor} options={{ header: (props) => <NoteNavBar {...props} /> }} />
          <Stack.Screen name="AccountSettings" component={AccountSettings} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

