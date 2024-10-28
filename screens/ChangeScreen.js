import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { loadWalletData, saveWalletData } from '../components/DataStorage';
import { denominationImages } from '../components/DenominationVisuals';
import styles from '../styles/ChangeScreenStyles';

export default function ChangeScreen({ route, navigation }) {
  const [remainingChange, setRemainingChange] = useState(route.params.changeAmount);
  const [changeSelection, setChangeSelection] = useState({});
  const [wallet, setWallet] = useState({});

  const loadWallet = async () => {
    const walletData = await loadWalletData();
    const convertedWalletData = Object.fromEntries(
      Object.entries(walletData)
        .map(([key, value]) => [parseFloat(key).toFixed(2), value])
        .filter(([key, value]) => value !== null)
    );
    setWallet(convertedWalletData || {});
    console.log("Wallet loaded:", convertedWalletData);
  };

  useEffect(() => {
    loadWallet();
  }, []);

  const handleDenominationPress = (denomination) => {
    console.log("Denomination pressed:", denomination);

    if (remainingChange <= 0) {
      console.log("Remaining change is zero or negative, cannot select denomination.");
      return;
    }

    const denominationValue = parseFloat(denomination) * 100;
    const newRemainingChange = remainingChange - denominationValue;

    if (newRemainingChange >= 0) {
      console.log("Selecting denomination:", denomination, "New remaining change:", newRemainingChange);
      setRemainingChange(newRemainingChange);
      setChangeSelection((prevSelection) => ({
        ...prevSelection,
        [denomination]: (prevSelection[denomination] || 0) + 1,
      }));
    } else {
      console.log("Insufficient remaining change for denomination:", denomination);
    }
  };

  const updateWallet = async () => {
    console.log("Updating wallet with selections...");

    const updatedWallet = { ...wallet };

    // Ajouter chaque dénomination sélectionnée au portefeuille
    Object.entries(changeSelection).forEach(([denomination, count]) => {
      updatedWallet[denomination] = (updatedWallet[denomination] || 0) + count;
      console.log("Adding to wallet:", denomination, "Count:", count);
    });

    await saveWalletData(updatedWallet);
    console.log("Wallet updated and saved:", updatedWallet);
    navigation.navigate('Home');
  };

  // Fonction pour réinitialiser les sélections
  const resetSelections = () => {
    console.log("Resetting selections...");
    setRemainingChange(route.params.changeAmount);
    setChangeSelection({});
  };

  // Fonction de validation manuelle
  const handleValidation = () => {
    console.log("Validation pressed. Remaining change:", remainingChange);
    if (remainingChange === 0) {
      updateWallet();
    } else {
      console.log("Remaining change is not zero, cannot validate.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Montant de rendu : {(remainingChange / 100).toFixed(2)} €</Text>
      <View style={styles.changeContainer}>
        {Object.keys(wallet).map((denomination) => (
          <TouchableOpacity key={denomination} onPress={() => handleDenominationPress(denomination)}>
            <Image source={denominationImages[denomination]} style={styles.denominationImage} />
            <Text style={styles.denominationText}>
              {denomination} € : {changeSelection[denomination] || 0}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {remainingChange === 0 && (
        <TouchableOpacity style={styles.validateButton} onPress={handleValidation}>
          <Text style={styles.buttonText}>Valider</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.resetButton} onPress={resetSelections}>
        <Text style={styles.buttonText}>Réinitialiser</Text>
      </TouchableOpacity>
    </View>
  );
}
