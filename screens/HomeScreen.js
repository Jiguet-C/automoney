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
        try {
          const walletData = await loadWalletData();
          const walletTotal = await calculateTotal(walletData);
          setTotal(walletTotal);
        } catch (error) {
          console.error("Erreur lors du chargement des données du portefeuille :", error);
        }
      };

      loadData();
    }, [])
  );

  return (
    <View style={HomeScreenStyles.container}>
        <BudgetGauge walletTotal={total} />
      <Card>
        <Button
          title="Mon porte-monnaie"
          style={[HomeScreenStyles.greenButton, HomeScreenStyles.buttonText]}
          onPress={() => navigation.navigate('Wallet')}
        />
        <View>
          <Text style={HomeScreenStyles.totalAmount}>Total : {total.toFixed(2)} €</Text>
        </View>
      </Card>

      <Card>
        <Button
          title="Payer"
          style={HomeScreenStyles.redButton}
          onPress={() => navigation.navigate('Pay')}
        />
      </Card>
      <Button title="Paramètres" onPress={() => navigation.navigate('Settings')} />
      <Button title="Historique" onPress={() => navigation.navigate('History')} />
    </View>
  );
};

export default HomeScreen;
