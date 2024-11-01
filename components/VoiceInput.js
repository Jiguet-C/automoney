import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { VoiceInputStyles } from '../styles/AllStyles';

const VoiceInput = ({ value, onChangeText, placeholder, extractFunction }) => {
  const [keyboardType, setKeyboardType] = useState('numeric');
  const [isMicroActive, setIsMicroActive] = useState(false);

  const toggleKeyboardType = () => {
    setKeyboardType((prevType) => (prevType === 'numeric' ? 'default' : 'numeric'));
    setIsMicroActive((prevState) => !prevState);
  };

  const handleVoiceInput = (input) => {
    const numericInput = extractFunction(input); // Utiliser la fonction d'extraction passée
    onChangeText(numericInput); // Mettre à jour le texte avec le nombre extrait
  };

  const handleTextChange = (text) => {
    // Si le clavier est numérique, juste passer le texte
    if (keyboardType === 'numeric') {
      onChangeText(text);
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
        onChangeText={handleTextChange}
        placeholder={placeholder}
        placeholderTextColor='gray'
      />
      <TouchableOpacity style={VoiceInputStyles.iconContainer} onPress={toggleKeyboardType}>
        <MaterialIcons
          name={isMicroActive ? 'mic-off' : 'mic'}
          size={24}
          color="grey"
        />
      </TouchableOpacity>
    </View>
  );
};

export default VoiceInput;
