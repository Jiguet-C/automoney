import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Svg, { Path, Line, Circle } from "react-native-svg";
import { loadBudget, saveBudget } from "./DataStorage";
import { CommonStyles, BudgetGaugeStyles } from "../styles/AllStyles";
import VoiceInput from "./VoiceInput";
import Button from "../components/Button";
import { extractEurosNumbers } from "./VoiceRecognition";

const BudgetGauge = ({ walletTotal, onBudgetChange }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [budget, setBudget] = useState(0);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const loadBudgetData = async () => {
      const savedBudget = await loadBudget();
      if (savedBudget) {
        setBudget(savedBudget);
      }
    };
    loadBudgetData();
  }, []);

  const calculatePercentage = () => {
    if (budget <= 0) return 0;
    return Math.min(100, Math.max(0, (walletTotal / budget) * 100));
  };

  const percentage = calculatePercentage();
  const rotationAngle = 180 - (percentage / 100) * 180;

  const calculateArrowCoordinates = (angle) => {
    const radians = (Math.PI * angle) / 180;
    const x = 100 + 90 * Math.cos(radians);
    const y = 100 - 90 * Math.sin(radians);
    return { x: isNaN(x) ? 100 : x, y: isNaN(y) ? 100 : y };
  };

  const { x, y } = calculateArrowCoordinates(rotationAngle);

  const saveBudgetData = async (newBudget) => {
    if (isNaN(newBudget) || newBudget < 0) {
      alert("Veuillez entrer un budget valide supérieur à 0.");
      return;
    }
    await saveBudget(newBudget);
    setBudget(newBudget);
    if (onBudgetChange) onBudgetChange(newBudget);
    setModalVisible(false);
  };

  const handleBudgetInput = (input) => {
    // Remplacer la virgule par un point avant de parser
    const normalizedInput = input.replace(",", ".");
    return parseFloat(normalizedInput);
  };

  return (
    <View style={BudgetGaugeStyles.container}>
      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
          setInputValue("");
        }}
      >
        <Svg width="270" height="135" viewBox="0 0 200 100">
          <Path d="M 100 100 L 0 100 A 100 100 0 0 1 50 13 Z" fill="#f15930" />
          <Path d="M 100 100 L 50 13 A 100 100 0 0 1 150 13 Z" fill="#ffa700" />
          <Path
            d="M 100 100 L 150 13 A 100 100 0 0 1 200 100 Z"
            fill="#22a663"
          />
          <Line
            x1="100"
            y1="100"
            x2={x}
            y2={y}
            stroke="#323a42"
            strokeWidth="4"
          />
          <Circle cx="100" cy="100" r="10" fill="#323a42" />
        </Svg>
      </TouchableOpacity>
      <Text>Mon budget est de {budget.toFixed(2)} €</Text>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView
          style={BudgetGaugeStyles.modalContainer}
          behavior={Platform.OS === "ios" ? "padding" : "padding"}
        >
          <View style={BudgetGaugeStyles.modalView}>
            <Text style={BudgetGaugeStyles.modalTitle}>Mon budget (en €)</Text>
            <Text style={BudgetGaugeStyles.modalExemple}>
              Dites : "trente euros" ou "dix euros vingt" ou "quarante centimes"
            </Text>
            <VoiceInput
              value={inputValue}
              onChangeText={setInputValue}
              extractFunction={extractEurosNumbers}
              onSubmit={() => {
                const newBudget = handleBudgetInput(inputValue);
                saveBudgetData(newBudget);
              }}
              placeholder="Entrer le budget"
            />
            <View style={BudgetGaugeStyles.buttonContainer}>
              <Button
                title="Annuler"
                style={BudgetGaugeStyles.redButton}
                onPress={() => setModalVisible(false)}
              />
              <Button
                title="Valider"
                style={BudgetGaugeStyles.greenButton}
                onPress={() => {
                  const newBudget = handleBudgetInput(inputValue);
                  saveBudgetData(newBudget);
                }}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

export default BudgetGauge;
