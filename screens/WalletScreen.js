import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import {
  saveWalletData,
  loadWalletData,
  logAction,
  calculateTotal,
} from "../components/DataStorage";
import {
  DenominationItem,
  DenominationData,
} from "../components/DenominationVisuals";
import VoiceInput from "../components/VoiceInput";
import { CommonStyles, WalletScreenStyles } from "../styles/AllStyles";
import Button from "../components/Button";
import { extractBilletsNumbers } from "../components/VoiceRecognition";

export function WalletScreen() {
  const [wallet, setWallet] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDenomination, setSelectedDenomination] = useState(null);
  const [newAmount, setNewAmount] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      const loadData = async () => {
        try {
          const walletData = await loadWalletData();
          setWallet(walletData);
        } catch (error) {
          console.error(
            "Erreur lors du chargement des données du portefeuille :",
            error
          );
        }
      };
      loadData();
    }, [])
  );

  const handleItemPress = (denomination) => {
    setSelectedDenomination(denomination);
    setModalVisible(true);
    setNewAmount("");
  };

  const saveAmount = async () => {
    try {
      const amount =
        newAmount === "" ||
        isNaN(parseInt(newAmount)) ||
        parseInt(newAmount) < 0
          ? 0
          : parseInt(newAmount);
      const oldAmount = wallet[selectedDenomination.value] || 0;
      const changeInAmount = amount - oldAmount;
      const newWallet = { ...wallet, [selectedDenomination.value]: amount };
      setWallet(newWallet);
      await saveWalletData(newWallet);

      // Enregistrer l'historique pour l'action de mise à jour
      await logAction(changeInAmount > 0 ? "Ajout" : "Retrait", {
        totalWallet: await calculateTotal(), // Assurez-vous d'appeler la fonction correctement
        walletChanges: { [selectedDenomination.value]: changeInAmount },
      });
    } catch (error) {
      console.error("Erreur lors de la sauvegarde de la quantité :", error);
    } finally {
      setModalVisible(false);
    }
  };

  const resetWallet = () => {
    Alert.alert(
      "Réinitialiser le portefeuille",
      "Êtes-vous sûr de vouloir réinitialiser le portefeuille à zéro ?",
      [
        {
          text: "Annuler",
          style: "cancel",
        },
        {
          text: "Réinitialiser",
          onPress: async () => {
            try {
              const newWallet = DenominationData.reduce((acc, denomination) => {
                acc[denomination.value] = 0;
                return acc;
              }, {});
              setWallet(newWallet);
              await saveWalletData(newWallet);

              // Enregistrer l'historique pour l'action de réinitialisation
              await logAction("Reset", {
                totalWallet: await calculateTotal(),
                walletChanges: {},
              });

              console.log(`Wallet reset: ${JSON.stringify(newWallet)}`);
            } catch (error) {
              console.error(
                "Erreur lors de la réinitialisation du portefeuille :",
                error
              );
            }
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
        {Object.keys(wallet)
          .reduce((acc, key) => acc + (wallet[key] || 0) * parseFloat(key), 0)
          .toFixed(2)}{" "}
        €
      </Text>

      <View style={WalletScreenStyles.denominationContainer}>
        {DenominationData.map((denomination) => (
          <TouchableOpacity
            key={denomination.value}
            onPress={() => handleItemPress(denomination)}
          >
            <DenominationItem
              denomination={denomination}
              count={wallet[denomination.value] || 0}
            />
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
          behavior={Platform.OS === "ios" ? "padding" : "padding"}
        >
          <View style={WalletScreenStyles.modalView}>
            <Text style={WalletScreenStyles.modalTitle}>
              Quantité de {selectedDenomination?.value} €
            </Text>
            <Text style={WalletScreenStyles.modalExemple}>
              Dites : "deux billets" ou "deux pièces"
            </Text>
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
              placeholder="Entrer la quantité"
            />
            <View style={WalletScreenStyles.buttonContainer}>
              <Button
                title="Annuler"
                style={WalletScreenStyles.redButton}
                onPress={() => setModalVisible(false)}
              />
              <Button
                title="Valider"
                style={WalletScreenStyles.greenButton}
                onPress={saveAmount}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

export default WalletScreen;
