import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import extractNumbers from './VoiceRecognition';
import { VoiceInputStyles } from '../styles/AllStyles';

const VoiceInput = ({ value, onChangeText, placeholder }) => {
  const [keyboardType, setKeyboardType] = useState('numeric');
  const [isMicroActive, setIsMicroActive] = useState(false);

  const toggleKeyboardType = () => {
    setKeyboardType((prevType) => (prevType === 'numeric' ? 'default' : 'numeric'));
    setIsMicroActive((prevState) => !prevState);
  };

  const handleVoiceInput = (input) => {
    const numericInput = extractNumbers(input); // Utiliser la reconnaissance vocale
    onChangeText(numericInput); // Mettre à jour le texte avec le nombre extrait
  };

  const handleTextChange = (text) => {
    // Si le clavier est numérique, juste passer le texte
    if (keyboardType === 'numeric') {
      // Vérifier et formater le texte pour avoir jusqu'à 2 chiffres après la virgule
      const formattedText = text.replace(',', '.').replace(/^(\d+\.?\d{0,2}).*$/, '$1');
      console.log(`Text input (numeric): ${formattedText}`);
      onChangeText(formattedText);
    } else {
      // Sinon, traiter le texte comme entrée vocale
      handleVoiceInput(text);
    }
  };

  return (
    <View style={VoiceInputStyles.inputContainer}>
      <TextInput
        style={VoiceInputStyles.input}
        keyboardType={keyboardType}
        value={value}
        onChangeText={handleTextChange} // Utiliser la nouvelle fonction
        placeholder={placeholder}
        placeholderTextColor='gray'
      />
      <TouchableOpacity style={VoiceInputStyles.iconContainer} onPress={toggleKeyboardType}>
        <MaterialIcons
          name={isMicroActive ? 'mic-off' : 'mic'}
          size={24}
          color="black"
        />
      </TouchableOpacity>
    </View>
  );
};

export default VoiceInput;
