import React from "react";
import { View } from "react-native";
import { auth } from "../firebaseConfig";
import Button from "../components/Button";
import { SettingsScreenStyles } from "../styles/AllStyles";

const SettingsScreen = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigation.navigate("Login");
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  return (
    <View style={SettingsScreenStyles.container}>
      <Button
        title="Déconnexion"
        style={SettingsScreenStyles.redButton}
        onPress={handleLogout}
      />
    </View>
  );
};

export default SettingsScreen;
