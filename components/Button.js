import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { CommonStyles } from "../styles/AllStyles";

const Button = ({ title, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[CommonStyles.button, style]}>
    <Text style={CommonStyles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

export default Button;
