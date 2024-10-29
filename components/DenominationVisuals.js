import React from 'react';
import { View, Text, Image, PixelRatio } from 'react-native';
import { WalletScreenStyles } from '../styles/AllStyles';

// Taille des pièces et billets en mm
const denominationsData = [
  { value: '50.00', image: require('../assets/50euros.png'), widthMM: 25, heightMM: 25 },
  { value: '20.00', image: require('../assets/20euros.png'), widthMM: 25, heightMM: 25 },
  { value: '10.00', image: require('../assets/10euros.png'), widthMM: 25, heightMM: 25 },
  { value: '5.00', image: require('../assets/5euros.png'), widthMM: 25, heightMM: 25 },
  { value: '2.00', image: require('../assets/2euros.png'), widthMM: 25.75, heightMM: 25.75 },
  { value: '1.00', image: require('../assets/1euro.png'), widthMM: 23.25, heightMM: 23.25 },
  { value: '0.50', image: require('../assets/50cents.png'), widthMM: 24.25, heightMM: 24.25 },
  { value: '0.20', image: require('../assets/20cents.png'), widthMM: 22.25, heightMM: 22.25 },
  { value: '0.10', image: require('../assets/10cents.png'), widthMM: 19.75, heightMM: 19.75 },
  { value: '0.05', image: require('../assets/5cents.png'), widthMM: 21.25, heightMM: 21.25 },
  { value: '0.02', image: require('../assets/2cents.png'), widthMM: 18.75, heightMM: 18.75 },
  { value: '0.01', image: require('../assets/1cent.png'), widthMM: 16.25, heightMM: 16.25 },
];

// Densité de pixels pour les conversions
const dpi = PixelRatio.get() * 30;

// Fonction pour convertir mm en dp
const mmToDp = (mm) => mm * (dpi / 25.4);

// Composant pour chaque dénomination
const DenominationItem = ({ denomination, count }) => {
  const widthInDp = mmToDp(denomination.widthMM);
  const heightInDp = mmToDp(denomination.heightMM);

  return (
    <View style={WalletScreenStyles.itemContainer}>
      <Image source={denomination.image} style={{ width: widthInDp, height: heightInDp }} />
      <Text style={WalletScreenStyles.text}>
        {count} × {denomination.value} €
      </Text>
    </View>
  );
};

export { denominationsData };
export default DenominationItem;
