import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';

import HomePage from './pages/Homepage';
import MarkdownGuide from './pages/MarkdownGuide';
import Quiz from './pages/Quiz';
import Notes from './pages/Notes';
import NavBar from './components/NavBar';
import LoggedInNavBar from './components/LoggedInNavBar';
import NoteNavBar from './components/NoteNavBar';
import Footer from './components/Footer';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import NoteEditor from './pages/NoteEditor';
import AccountSettings from './pages/AccountSettings';
import styles from './styles';

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        {user ? <LoggedInNavBar /> : <NavBar />}
        <Stack.Navigator screenOptions={styles.nav}>
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen name="MarkdownGuide" component={MarkdownGuide} />
          <Stack.Screen name="Notes" component={Notes} />
          <Stack.Screen name="Quiz" component={Quiz} />
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

