import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Image } from "react-native";
import { auth } from "./firebaseConfig";
import HomeScreen from "./screens/HomeScreen";
import WalletScreen from "./screens/WalletScreen";
import PayScreen from "./screens/PayScreen";
import ChangeScreen from "./screens/ChangeScreen";
import LoginScreen from "./screens/LoginScreen";
import SettingsScreen from "./screens/SettingsScreen";
import HistoryScreen from "./screens/HistoryScreen";

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authenticatedUser) => {
      setUser(authenticatedUser);
    });
    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTitle: () => (
            <Image
              source={require("./assets/icon.jpeg")}
              style={{ height: 30, resizeMode: "contain" }}
            />
          ),
          headerBackTitleVisible: false,
          headerStyle: { height: 100, backgroundColor: "#323a42" },
          headerTitleAlign: "center",
          headerTintColor: "white",
        }}
      >
        {user ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Wallet" component={WalletScreen} />
            <Stack.Screen name="Pay" component={PayScreen} />
            <Stack.Screen name="Change" component={ChangeScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="History" component={HistoryScreen} />
          </>
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
