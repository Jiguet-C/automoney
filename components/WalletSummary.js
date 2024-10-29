// components/WalletSummary.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WalletScreenStyles } from '../styles/AllStyles';

const WalletSummary = ({ total }) => (
  <View style={WalletScreenStyles.summaryContainer}>
    <Text style={WalletScreenStyles.totalText}>Total : {total.toFixed(2)} €</Text>
  </View>
);

export default WalletSummary;
