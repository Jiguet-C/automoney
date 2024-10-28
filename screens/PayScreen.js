import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { loadWalletData, saveWalletData } from '../components/DataStorage';
import VoiceInput from '../components/VoiceInput';
import { calculatePayment } from '../components/PaymentCalculator';
import { denominationImages } from '../components/DenominationVisuals';
import styles from '../styles/PayScreenStyles';

export default function PayScreen({ navigation }) {
  const [amountToPay, setAmountToPay] = useState('');
  const [wallet, setWallet] = useState({});
  const [solution, setSolution] = useState(null);
  const [currentDenominationIndex, setCurrentDenominationIndex] = useState(0);
  const [currentDenominationCount, setCurrentDenominationCount] = useState(0);
  const [remainingAmount, setRemainingAmount] = useState(0);
  const [error, setError] = useState('');
  const [validatedDenominations, setValidatedDenominations] = useState([]);

  // Charger les données du portefeuille
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

  useFocusEffect(
    React.useCallback(() => {
      loadWallet();
    }, [])
  );

  const handleVoiceInput = (input) => {
    setAmountToPay(input.replace(',', '.'));
    console.log("Voice input set to:", input.replace(',', '.'));
  };

  const calculatePaymentHandler = () => {
    console.log("Calculating payment for amount:", amountToPay);
    const { error, solution, remainingAmount } = calculatePayment(amountToPay, wallet);

    if (error) {
      setError(error);
      setSolution(null);
      console.log("Error while calculating payment:", error);
      return;
    }

    setSolution(solution);
    setRemainingAmount(remainingAmount);
    setError('');
    setCurrentDenominationIndex(0);
    setCurrentDenominationCount(1);
    setValidatedDenominations([]);

    console.log("Payment calculated. Solution:", solution);
    console.log("Remaining amount after calculation:", remainingAmount);
  };

  const validatePayment = async () => {
    const currentDenomination = Object.keys(solution || {})[currentDenominationIndex];
    const denominationValue = parseFloat(currentDenomination).toFixed(2);
    const countToValidate = solution[currentDenomination];

    console.log("Current denomination:", currentDenomination);
    console.log("Current denomination count:", currentDenominationCount);
    console.log("Count to validate:", countToValidate);

    if (currentDenominationCount >= countToValidate) {
      setValidatedDenominations((prev) => [...prev, { denomination: currentDenomination, count: currentDenominationCount }]);
      console.log("Denomination validated:", currentDenomination);

      setCurrentDenominationIndex(currentDenominationIndex + 1);
      setCurrentDenominationCount(1);
    } else {
      setCurrentDenominationCount(currentDenominationCount + 1);
    }

    const valueToDeduct = Math.round(denominationValue * 100);
    setRemainingAmount(prev => prev - valueToDeduct);
    console.log("Remaining amount after deduction:", remainingAmount);

    if (currentDenominationIndex === Object.keys(solution).length - 1 && currentDenominationCount >= countToValidate) {
      const updatedWallet = { ...wallet };
      validatedDenominations.forEach(item => {
        const denominationValue = parseFloat(item.denomination).toFixed(2);
        updatedWallet[denominationValue] = (updatedWallet[denominationValue] || 0) - item.count;
      });
      updatedWallet[currentDenomination] = (updatedWallet[currentDenomination] || 0) - currentDenominationCount; // Dernière dénomination validée

      setWallet(updatedWallet);
      await saveWalletData(updatedWallet);
      console.log("Wallet updated and saved:", updatedWallet);

      // Vérifiez si le montant restant est nul ou positif
      if (remainingAmount - valueToDeduct === 0) {
        console.log("Returning to Home screen with exact payment.");
        navigation.navigate('Home');
      } else {
        const changeToGive = -(remainingAmount - valueToDeduct);
        console.log("Navigating to Change screen with change amount:", changeToGive);
        navigation.navigate('Change', { changeAmount: changeToGive });
      }
    }
  };

  const currentDenomination = solution && Object.keys(solution).length > 0
    ? Object.keys(solution)[currentDenominationIndex]
    : null;
  console.log("Current denomination:", currentDenomination);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {solution ? (
        <View style={styles.solutionContainer}>
          <Text style={styles.label}>Montant à payer : {(remainingAmount / 100).toFixed(2)} €</Text>
          {currentDenomination && (
            <View style={styles.denominationContainer}>
              <Image
                source={denominationImages[currentDenomination]}
                style={styles.denominationImage}
                onError={() => console.error(`Image non trouvée pour la dénomination: ${currentDenomination}`)}
              />
              {denominationImages[currentDenomination] ? null : (
                <Text style={styles.errorText}>Image introuvable pour {currentDenomination} €</Text>
              )}
            </View>
          )}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.backButton]} onPress={() => navigation.goBack()}>
              <Text style={styles.buttonText}>Retour</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.validateButton]} onPress={validatePayment}>
              <Text style={styles.buttonText}>Valider</Text>
            </TouchableOpacity>
          </View>
          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
      ) : (
        <View>
          <Text style={styles.label}>Montant à payer (en €) :</Text>
          <VoiceInput
            value={amountToPay}
            onChangeText={handleVoiceInput}
            placeholder="Entrez le montant à payer"
          />
          <TouchableOpacity style={styles.calculateButton} onPress={calculatePaymentHandler}>
            <Text style={styles.buttonText}>Calculer</Text>
          </TouchableOpacity>
          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
      )}
    </KeyboardAvoidingView>
  );
}
