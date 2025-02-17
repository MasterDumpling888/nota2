import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PageBox from '../components/PageBox';

function AccountSettings({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageBox title="Account Settings" onClose={() => navigation.goBack()}>
        <View style={styles.container}>
          <Text style={styles.text}>Account settings content goes here.</Text>
          <Button title="Change Password" onPress={() => { /* Implement change password functionality */ }} />
          <Button title="Update Email" onPress={() => { /* Implement update email functionality */ }} />
        </View>
      </PageBox>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  text: {
    fontSize: 16,
    marginBottom: 16,
  },
});

export default AccountSettings;
