import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { loadWalletData, saveWalletData } from '../components/DataStorage';
import { DenominationItem, DenominationData } from '../components/DenominationVisuals';
import Button from '../components/Button';
import { CommonStyles, ChangeScreenStyles } from '../styles/AllStyles';

export function ChangeScreen({ route, navigation }) {
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

    const denominationValue = parseFloat(denomination.value) * 100;
    const newRemainingChange = remainingChange - denominationValue;

    if (newRemainingChange >= 0) {
      console.log("Selecting denomination:", denomination.value, "New remaining change:", newRemainingChange);
      setRemainingChange(newRemainingChange);
      setChangeSelection((prevSelection) => ({
        ...prevSelection,
        [denomination.value]: (prevSelection[denomination.value] || 0) + 1,
      }));
    } else {
      console.log("Insufficient remaining change for denomination:", denomination.value);
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
    <View style={ChangeScreenStyles.container}>
      <Text style={ChangeScreenStyles.label}>Montant de rendu : {(remainingChange / 100).toFixed(2)} €</Text>

      <View style={ChangeScreenStyles.denominationContainer}>
        {DenominationData.map((denomination) => (
          <TouchableOpacity key={denomination.value} onPress={() => handleDenominationPress(denomination)}>
            <DenominationItem denomination={denomination} count={changeSelection[denomination.value] || 0} />
          </TouchableOpacity>
        ))}
      </View>

      {remainingChange === 0 && (<Button title="Valider" style={ ChangeScreenStyles.greenButton } onPress={handleValidation} />)}
      <Button title="Réinitialiser" onPress={resetSelections} />
    </View>
  );
};

export default ChangeScreen;
