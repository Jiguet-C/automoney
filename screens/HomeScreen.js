import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { loadWalletData, calculateTotal } from '../components/DataStorage';
import BudgetGauge from '../components/BudgetGauge';
import Card from '../components/Card';
import Button from '../components/Button';
import { CommonStyles, HomeScreenStyles } from '../styles/AllStyles';

const HomeScreen = ({ navigation }) => {
  const [total, setTotal] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      const loadData = async () => {
        const walletData = await loadWalletData();
        const walletTotal = calculateTotal(walletData);
        setTotal(walletTotal);
      };

      loadData();
    }, [])
  );

  return (
    <View style={HomeScreenStyles.container}>
      <Card>
        <BudgetGauge walletTotal={total} />
      </Card>

      <Card>
        <Button title="Mon porte-monnaie" style={ [HomeScreenStyles.greenButton, HomeScreenStyles.buttonText] } onPress={() => navigation.navigate('Wallet')} />
        <View>
          <Text style={HomeScreenStyles.totalAmount}>Total : {total.toFixed(2)} €</Text>
        </View>
      </Card>

      <Card>
        <Button title="Payer" style={ HomeScreenStyles.redButton } onPress={() => navigation.navigate('Pay')} />
      </Card>
      <Button title="Paramètres" onPress={() => navigation.navigate('Settings')} />
    </View>
  );
};

export default HomeScreen;
