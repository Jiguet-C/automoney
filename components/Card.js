import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CommonStyles } from '../styles/AllStyles';

const Card = ({ children }) => (
  <View style={ CommonStyles.card }>
    {children}
  </View>
);

export default Card;
