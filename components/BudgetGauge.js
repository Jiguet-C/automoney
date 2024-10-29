import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import Svg, { Path, Line, Circle } from 'react-native-svg';
import { loadBudget, saveBudget } from './DataStorage';
import { CommonStyles, BudgetGaugeStyles } from '../styles/AllStyles';
import VoiceInput from './VoiceInput';
import Button from '../components/Button';

const BudgetGauge = ({ walletTotal, onBudgetChange }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [budget, setBudget] = useState(0);
  const [inputValue, setInputValue] = useState('');

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
    await saveBudget(newBudget);
    setBudget(newBudget);
    if (onBudgetChange) onBudgetChange(newBudget);
    setModalVisible(false);
  };

  return (
    <View style={BudgetGaugeStyles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Svg width="200" height="100" viewBox="0 0 200 100">
          <Path d="M 100 100 L 0 100 A 100 100 0 0 1 50 13 Z" fill="red" />
          <Path d="M 100 100 L 50 13 A 100 100 0 0 1 150 13 Z" fill="orange" />
          <Path d="M 100 100 L 150 13 A 100 100 0 0 1 200 100 Z" fill="green" />
          <Line x1="100" y1="100" x2={x} y2={y} stroke="black" strokeWidth="4" />
          <Circle cx="100" cy="100" r="10" fill="black" />
        </Svg>
      </TouchableOpacity>
      <Text>Mon budget : {budget.toFixed(2)} €</Text>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <KeyboardAvoidingView
          style={BudgetGaugeStyles.modalContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={BudgetGaugeStyles.modalView}>
            <Text style={CommonStyles.modalTitle}>Entrez votre budget (en €)</Text>
            <Text style={CommonStyles.modalExemple}>Dites : "trente euros"</Text>
            <VoiceInput
              value={inputValue}
              onChangeText={setInputValue}
              onSubmit={() => saveBudgetData(parseFloat(inputValue))}
              keyboardType="numeric"
              placeholder="Appuyer sur l'icone pour la reconnaissance vocale"
            />
            <Button title="Enregistrer" onPress={() => saveBudgetData(parseFloat(inputValue))} />
            <Button title="Fermer" onPress={() => setModalVisible(false)} />
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

export default BudgetGauge;
