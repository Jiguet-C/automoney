import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { loadWalletData, calculateTotal } from '../components/DataStorage';
import BudgetGauge from '../components/BudgetGauge';
import WalletSummary from '../components/WalletSummary';
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
    <View style={CommonStyles.container}>
      <Card>
        <BudgetGauge walletTotal={total} />
      </Card>

      <Card>
        <Button title="Mon porte-monnaie" total={total} onPress={() => navigation.navigate('Wallet')} />
        <WalletSummary total={total} />
      </Card>

      <Card>
        <Button title="Payer" onPress={() => navigation.navigate('Pay')} />
      </Card>
    </View>
  );
};

export default HomeScreen;
