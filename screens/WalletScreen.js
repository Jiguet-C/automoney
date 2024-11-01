import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Image, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { saveWalletData, loadWalletData } from '../components/DataStorage';
import { DenominationItem, DenominationData } from '../components/DenominationVisuals';
import VoiceInput from '../components/VoiceInput';
import { CommonStyles, WalletScreenStyles } from '../styles/AllStyles';
import Button from '../components/Button';
import { extractBilletsNumbers } from '../components/VoiceRecognition';

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
    console.log("Selected Denomination:", denomination); // Vérifiez ce qui est sélectionné
    setModalVisible(true);
    setNewAmount('');
  };

  const saveAmount = () => {
    const amount = newAmount === '' || isNaN(parseInt(newAmount)) || parseInt(newAmount) < 0 ? 0 : parseInt(newAmount);

    const newWallet = { ...wallet, [selectedDenomination.value]: amount }; // Utilisez selectedDenomination.value pour la clé
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
            const newWallet = DenominationData.reduce((acc, denomination) => {
              acc[denomination.value] = 0; // Utilisez denomination.value pour la clé
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

  return (
    <View style={WalletScreenStyles.container}>
      <Text style={WalletScreenStyles.totalText}>Mon porte-monnaie</Text>
      <Text style={WalletScreenStyles.totalAmount}>
        {(Object.keys(wallet).reduce((acc, key) => acc + (wallet[key] || 0) * parseFloat(key), 0)).toFixed(2)} €
      </Text>

      <View style={WalletScreenStyles.denominationContainer}>
        {DenominationData.map((denomination) => (
          <TouchableOpacity key={denomination.value} onPress={() => handleItemPress(denomination)}>
            <DenominationItem denomination={denomination} count={wallet[denomination.value] || 0} />
          </TouchableOpacity>
        ))}
      </View>

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
            <Text style={WalletScreenStyles.modalTitle}>Entrez la quantité de {selectedDenomination?.value} €</Text>
            <Text style={WalletScreenStyles.modalExemple}>Dites : "deux billets" ou "deux pièces"</Text>
            {selectedDenomination && (
              <Image
                source={selectedDenomination.image}
                style={WalletScreenStyles.modalImage}
              />
            )}
            <VoiceInput
              value={newAmount}
              onChangeText={setNewAmount}
              extractFunction={extractBilletsNumbers}
              placeholder="Appuyer sur l'icone pour la reconnaissance vocale"
            />
            <Button title="Enregistrer" style={ WalletScreenStyles.greenButton } onPress={saveAmount} />
            <Button title="Fermer" style={ WalletScreenStyles.redButton } onPress={() => setModalVisible(false)} />
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

export default WalletScreen;
