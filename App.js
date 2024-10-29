import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Image } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import WalletScreen from './screens/WalletScreen';
import PayScreen from './screens/PayScreen';
import ChangeScreen from './screens/ChangeScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTitle: () => (
            <Image
              source={require('./assets/icon.png')}
              style={{width: 40, height: 40}}
            />
          ),
          headerBackTitleVisible: false,
          headerStyle : {height: 110, backgroundColor: "gray",},
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Wallet" component={WalletScreen} />
        <Stack.Screen name="Pay" component={PayScreen} />
        <Stack.Screen name="Change" component={ChangeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
