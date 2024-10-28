import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import WalletScreen from './screens/WalletScreen';
import PayScreen from './screens/PayScreen';
import ChangeScreen from './screens/ChangeScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Wallet" component={WalletScreen} />
        <Stack.Screen name="Pay" component={PayScreen} />
				<Stack.Screen name="Change" component={ChangeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
