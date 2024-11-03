import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { auth } from '../firebaseConfig';

const SettingsScreen = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigation.navigate('Login');
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Déconnexion" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
});

export default SettingsScreen;
