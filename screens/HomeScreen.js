import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { loadWalletData, calculateTotal } from '../components/DataStorage';
import BudgetGauge from '../components/BudgetGauge';
import styles from '../styles/HomeScreenStyles';

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
    <View style={styles.container}>
      <BudgetGauge walletTotal={total} />

      <TouchableOpacity
        style={styles.walletButton}
        onPress={() => navigation.navigate('Wallet')}
      >
        <Text style={styles.buttonText}>Mon porte-monnaie</Text>
        <Text style={styles.amountText}>{total.toFixed(2)} €</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.payButton}
        onPress={() => navigation.navigate('Pay')}
      >
        <Text style={styles.buttonText}>Payer</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
