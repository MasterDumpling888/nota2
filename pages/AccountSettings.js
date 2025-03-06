import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PageBox from '../components/PageBox';
import { auth, db } from '../firebaseConfig';
import { updateProfile, deleteUser } from 'firebase/auth';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons';
import { getFontSize } from '../responsiveFont';

function AccountSettings({ navigation }) {
  const [username, setUsername] = useState('');
  const [newUsername, setNewUsername] = useState('');

  useEffect(() => {
    const loadUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUsername(userDoc.data().username);
        }
      }
    };

    loadUserData();
  }, []);

  const handleUpdateUsername = async () => {
    const user = auth.currentUser;
    if (user && newUsername) {
      try {
        await updateProfile(user, { displayName: newUsername });
        await updateDoc(doc(db, 'users', user.uid), { username: newUsername });
        setUsername(newUsername);
        setNewUsername('');
        Alert.alert('Success', 'Username updated successfully');
      } catch (error) {
        console.error('Failed to update username', error);
        Alert.alert('Error', 'Failed to update username');
      }
    }
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigation.navigate('Login');
    } catch (error) {
      console.error('Failed to sign out', error);
      Alert.alert('Error', 'Failed to sign out');
    }
  };

  const handleDeleteAccount = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        await deleteUser(user);
        await deleteDoc(doc(db, 'users', user.uid));
        navigation.navigate('SignUp');
      } catch (error) {
        console.error('Failed to delete account', error);
        Alert.alert('Error', 'Failed to delete account');
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); handleUpdateUsername(); }}>
      <SafeAreaView style={{ flex: 1 }}>
        <PageBox title="Account Settings" onClose={() => navigation.goBack()}>
          <View style={styles.container}>
            <View style={styles.userContainer}>
              <Icon name="person-circle-outline" size={56} color="white" />
              <TextInput
                style={styles.input}
                value={newUsername || username}
                onChangeText={setNewUsername}
                onBlur={handleUpdateUsername}
              />
              <Icon name="pencil" size={30} color="white" />
            </View>
            <View style={styles.subContainer}>
              <Icon name="heart-outline" size={30} color="#33FD0A" />
              <Text style={styles.subText}>My Space</Text>
            </View>
            <View style={styles.sectionContainer}>
              <TouchableOpacity style={styles.sectionRow} onPress={() => navigation.navigate('Notes')}>
                <Icon name="document-text-outline" size={24} color="#33FD0A" />
                <Text style={styles.sectionText}>Notes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sectionRow} onPress={() => navigation.navigate('Quizes')}>
                <Icon name="book-outline" size={24} color="#33FD0A" />
                <Text style={styles.sectionText}>Quizes</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.subContainer}>
              <Icon name="cog" size={30} color="#33FD0A" />
              <Text style={styles.subText}>Settings</Text>
            </View>
            <View style={styles.sectionContainer}>
              <TouchableOpacity style={styles.sectionRow} onPress={handleSignOut}>
                <Icon name="log-out-outline" size={24} color="#33FD0A" />
                <Text style={styles.sectionText}>Sign Out</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sectionRow} onPress={handleDeleteAccount}>
                <Icon name="trash-outline" size={24} color="red" />
                <Text style={[styles.sectionText, { color: 'red' }]}>Delete Account</Text>
              </TouchableOpacity>
            </View>
          </View>
        </PageBox>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  text: {
    fontSize: getFontSize(24),
    fontWeight: 'bold',
  },
  subText: {
    fontSize: getFontSize(16),
    color: 'white',
    fontFamily: 'Raleway-SemiBold',
  },
  input: {
    flex: 1,
    fontSize: getFontSize(24),
    color: 'white',
    fontFamily: 'Raleway-Bold',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 10
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10
  },
  sectionContainer: {
    borderWidth: 1,
    borderColor: '#33FD0A',
    borderRadius: 5,
    marginBottom: 16,
  },
  sectionRow: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#33FD0A',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  sectionText: {
    fontSize: getFontSize(14),
    color: 'white',
    fontFamily: 'Raleway-SemiBold',
  },
});

export default AccountSettings;
