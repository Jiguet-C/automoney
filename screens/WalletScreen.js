import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { saveWalletData, loadWalletData } from '../components/DataStorage';
import DenominationItem, { denominations } from '../components/DenominationVisuals';
import VoiceInput from '../components/VoiceInput';
import { CommonStyles, WalletScreenStyles } from '../styles/AllStyles';
import Button from '../components/Button';

export function WalletScreen() {
  const [wallet, setWallet] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDenomination, setSelectedDenomination] = useState(null);
  const [newAmount, setNewAmount] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      const loadData = async () => {
        const walletData = await loadWalletData();
        setWallet(walletData);
      };
      loadData();
    }, [])
  );

  const handleItemPress = (denomination) => {
    setSelectedDenomination(denomination);
    setModalVisible(true);
    setNewAmount('');
  };

  const saveAmount = () => {
    const amount = newAmount === '' || isNaN(parseInt(newAmount)) || parseInt(newAmount) < 0 ? 0 : parseInt(newAmount);

    const newWallet = { ...wallet, [selectedDenomination]: amount };
    setWallet(newWallet);
    saveWalletData(newWallet);
    console.log(`Updated wallet: ${JSON.stringify(newWallet)}`);
    setModalVisible(false);
  };

  const resetWallet = () => {
    Alert.alert(
      'Réinitialiser le portefeuille',
      'Êtes-vous sûr de vouloir réinitialiser le portefeuille à zéro ?',
      [
        {
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: 'Réinitialiser',
          onPress: () => {
            const newWallet = denominations.reduce((acc, denomination) => {
              acc[denomination] = 0;
              return acc;
            }, {});
            setWallet(newWallet);
            saveWalletData(newWallet);
            console.log(`Wallet reset: ${JSON.stringify(newWallet)}`);
          },
        },
      ],
      { cancelable: false }
    );
  };

  const renderWalletItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleItemPress(item.denomination)}>
      <DenominationItem denomination={item.denomination} count={wallet[item.denomination] || 0} />
    </TouchableOpacity>
  );

  return (
    <View style={CommonStyles.container}>
      <Text style={WalletScreenStyles.totalText}>Mon porte-monnaie</Text>
        <Text style={WalletScreenStyles.totalAmount}>
          {(Object.keys(wallet).reduce((acc, key) => acc + (wallet[key] || 0) * parseFloat(key), 0)).toFixed(2)} €
      </Text>

      <FlatList
        data={denominations.map((denomination) => ({ denomination }))}
        renderItem={renderWalletItem}
        keyExtractor={(item) => item.denomination.toString()}
        numColumns={3}
        contentContainerStyle={WalletScreenStyles.walletContainer}
      />

      <Button title="Réinitialiser le portefeuille" onPress={resetWallet} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView
          style={WalletScreenStyles.modalContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={WalletScreenStyles.modalView}>
            <Text style={CommonStyles.modalTitle}>Entrez la quantité de {selectedDenomination} €</Text>
            <Text style={CommonStyles.modalExemple}>Dites : "deux billets" ou "deux pièces"</Text>
            <DenominationItem denomination={selectedDenomination} count={newAmount || 0} />
            <VoiceInput
              value={newAmount}
              onChangeText={setNewAmount}
              placeholder="Appuyer sur l'icone pour la reconnaissance vocale"
            />
            <Button title="Enregistrer" onPress={saveAmount} />
            <Button title="Fermer" onPress={() => setModalVisible(false)} />
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

export default WalletScreen;
