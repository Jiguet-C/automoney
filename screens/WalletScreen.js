import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { saveWalletData, loadWalletData } from '../components/DataStorage';
import DenominationItem, { denominations } from '../components/DenominationVisuals';
import VoiceInput from '../components/VoiceInput';
import styles from '../styles/WalletScreenStyles';

export default function WalletScreen() {
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
    <View style={styles.container}>
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Mon porte-monnaie</Text>
        <Text style={styles.totalAmount}>
          {(Object.keys(wallet).reduce((acc, key) => acc + (wallet[key] || 0) * parseFloat(key), 0)).toFixed(2)} €
        </Text>
      </View>

      <FlatList
        data={denominations.map((denomination) => ({ denomination }))}
        renderItem={renderWalletItem}
        keyExtractor={(item) => item.denomination.toString()}
        numColumns={3}
        contentContainerStyle={styles.walletContainer}
      />

      <TouchableOpacity style={styles.resetButton} onPress={resetWallet}>
        <Text style={styles.resetButtonText}>Réinitialiser le portefeuille</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView
          style={styles.modalContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Modifier {selectedDenomination} €</Text>
            <DenominationItem denomination={selectedDenomination} count={newAmount || 0} />
            <VoiceInput
              value={newAmount}
              onChangeText={setNewAmount}
              placeholder={`Entrez le montant pour ${selectedDenomination} €`}
            />
            <TouchableOpacity style={styles.saveButton} onPress={saveAmount}>
              <Text style={styles.saveButtonText}>Enregistrer</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}
