import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);

  // Configure Google Auth Session
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: process.env.FIREBASE_ANDROID_CLIENT_ID,
    iosClientId: process.env.FIREBASE_IOS_CLIENT_ID,
    expoClientId: process.env.FIREBASE_EXPO_CLIENT_ID,
  });

  // Handle Google Sign-In
  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then(userCredential => {
          Alert.alert('Connexion réussie', `Bienvenue, ${userCredential.user.email}`, [
            { text: 'OK' }
          ]);
        })
        .catch(error => {
          Alert.alert('Erreur', error.message);
        });
    }
  }, [response]);

  // Email Sign-In
  const handleEmailSignIn = () => {
    if (!email || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }

    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        Alert.alert('Connexion réussie', `Bienvenue, ${userCredential.user.email}`, [
          { text: 'OK' }
        ]);
      })
      .catch(error => {
        Alert.alert('Erreur', error.message);
      })
      .finally(() => setLoading(false));
  };

  // Register with Email
  const handleRegister = () => {
    if (!email || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }

    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        Alert.alert('Inscription réussie', `Compte créé pour ${userCredential.user.email}`, [
          { text: 'OK' }
        ]);
      })
      .catch(error => {
        Alert.alert('Erreur', error.message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isRegistering ? 'Inscription' : 'Connexion'}</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        accessibilityLabel="Email"
      />
      <TextInput
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
        accessibilityLabel="Mot de passe"
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          {isRegistering ? (
            <Button title="S'inscrire" onPress={handleRegister} />
          ) : (
            <>
              <Button title="Connexion avec Email" onPress={handleEmailSignIn} />
              <TouchableOpacity style={styles.googleButton} onPress={() => promptAsync()}>
                <Text style={styles.googleButtonText}>Connexion avec Google</Text>
              </TouchableOpacity>
            </>
          )}

          <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)}>
            <Text style={styles.switchText}>
              {isRegistering ? 'Déjà un compte ? Connectez-vous' : 'Pas de compte ? Inscrivez-vous'}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  googleButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#4285F4',
    borderRadius: 5,
  },
  googleButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  switchText: {
    marginTop: 20,
    color: 'blue',
  },
});
