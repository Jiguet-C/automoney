import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import * as Google from "expo-auth-session/providers/google";
import { auth } from "../firebaseConfig";
import Button from "../components/Button";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { LoginScreenStyles } from "../styles/AllStyles";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);

  // Email Sign-In
  const handleEmailSignIn = () => {
    if (!email || !password) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs.");
      return;
    }

    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        Alert.alert(
          "Connexion réussie",
          `Bienvenue, ${userCredential.user.email}`,
          [{ text: "OK" }]
        );
      })
      .catch((error) => {
        Alert.alert("Erreur", error.message);
      })
      .finally(() => setLoading(false));
  };

  // Register with Email
  const handleRegister = () => {
    if (!email || !password) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs.");
      return;
    }

    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        Alert.alert(
          "Inscription réussie",
          `Compte créé pour ${userCredential.user.email}`,
          [{ text: "OK" }]
        );
      })
      .catch((error) => {
        Alert.alert("Erreur", error.message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <View style={LoginScreenStyles.container}>
      <Text style={LoginScreenStyles.title}>
        {isRegistering ? "Inscription" : "Connexion"}
      </Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={LoginScreenStyles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        accessibilityLabel="Email"
      />
      <TextInput
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        style={LoginScreenStyles.input}
        secureTextEntry
        accessibilityLabel="Mot de passe"
      />

      {loading ? (
        <ActivityIndicator size="large" color="#597cff" />
      ) : (
        <>
          {isRegistering ? (
            <Button
              title="S'inscrire"
              style={LoginScreenStyles.blueButton}
              onPress={handleRegister}
            />
          ) : (
            <Button
              title="Connexion"
              style={LoginScreenStyles.blueButton}
              onPress={handleEmailSignIn}
            />
          )}

          <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)}>
            <Text style={LoginScreenStyles.denominationText}>
              {isRegistering
                ? "Déjà un compte ? Connectez-vous"
                : "Pas de compte ? Inscrivez-vous"}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
