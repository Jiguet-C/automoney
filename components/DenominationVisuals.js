import React from 'react';
import { View, Text, Image } from 'react-native';
import { WalletScreenStyles } from '../styles/AllStyles';

// Images des dénominations
const denominationImages = {
  '50.00': require('../assets/50euros.png'),
  '20.00': require('../assets/20euros.png'),
  '10.00': require('../assets/10euros.png'),
  '5.00': require('../assets/5euros.png'),
  '2.00': require('../assets/2euros.png'),
  '1.00': require('../assets/1euro.png'),
  '0.50': require('../assets/50cents.png'),
  '0.20': require('../assets/20cents.png'),
  '0.10': require('../assets/10cents.png'),
  '0.05': require('../assets/5cents.png'),
  '0.02': require('../assets/2cents.png'),
  '0.01': require('../assets/1cent.png'),
};

// Liste des dénominations à utiliser
const denominations = ['50.00', '20.00', '10.00', '5.00', '2.00', '1.00', '0.50', '0.20', '0.10', '0.05', '0.02', '0.01'];

const DenominationItem = ({ denomination, count }) => (
  <View style={WalletScreenStyles.itemContainer}>
    <Image source={denominationImages[denomination]} style={WalletScreenStyles.image} />
    <Text style={WalletScreenStyles.text}>
      {count} × {denomination} €
    </Text>
  </View>
);

export const renderDenominationImage = (denomination) => {
  const imageSource = denominationImages[denomination];
  if (!imageSource) {
    return <Text>Image introuvable pour {denomination} €</Text>;
  }
  return <Image source={imageSource} style={{ width: 50, height: 50 }} />;
};

export { denominations };
export {denominationImages};
export default DenominationItem;
