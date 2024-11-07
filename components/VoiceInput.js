import React, { useState, useRef, useEffect } from "react";
import { View, TextInput, Switch } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { VoiceInputStyles } from "../styles/AllStyles";

const VoiceInput = ({ value, onChangeText, placeholder, extractFunction }) => {
  const [keyboardType, setKeyboardType] = useState("numeric");
  const inputRef = useRef(null);
  const [isVoiceMode, setIsVoiceMode] = useState(false);

  const toggleKeyboardType = () => {
    const newKeyboardType = isVoiceMode ? "numeric" : "default";
    setKeyboardType(newKeyboardType);
    setIsVoiceMode((prev) => !prev);
    setTimeout(() => inputRef.current.focus(), 100);
  };

  const handleVoiceInput = (input) => {
    const numericInput = extractFunction(input);
    onChangeText(numericInput);
  };

  const handleTextChange = (text) => {
    // Si le clavier est numérique, juste passer le texte
    if (keyboardType === "numeric") {
      onChangeText(text);
    } else {
      // Sinon, traiter le texte comme entrée vocale
      handleVoiceInput(text);
    }
  };

  return (
    <View style={VoiceInputStyles.inputContainer}>
      <View style={VoiceInputStyles.switchContainer}>
        <View style={VoiceInputStyles.switchIconContainer}>
          <MaterialIcons
            name="keyboard"
            style={[
              VoiceInputStyles.switchIcon,
              { color: isVoiceMode ? "grey" : "#597cff" },
            ]}
          />
          <Switch
            value={isVoiceMode}
            onValueChange={toggleKeyboardType}
            style={VoiceInputStyles.switch}
            trackColor={{ false: "grey", true: "grey" }}
            thumbColor="#597cff"
          />
          <MaterialIcons
            name="mic"
            style={[
              VoiceInputStyles.switchIcon,
              { color: isVoiceMode ? "#597cff" : "grey" },
            ]}
          />
        </View>
      </View>
      <TextInput
        ref={inputRef}
        style={VoiceInputStyles.input}
        keyboardType={keyboardType}
        value={value}
        onChangeText={handleTextChange}
        placeholder={placeholder}
        placeholderTextColor="grey"
      />
    </View>
  );
};

export default VoiceInput;
