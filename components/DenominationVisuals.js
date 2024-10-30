import React from 'react';
import { View, Text, Image, PixelRatio } from 'react-native';
import { CommonStyles } from '../styles/AllStyles';

// Fonction de conversion mm en pixels
const mmToPx = (mm) => {
  const pixels = mm * (160 / 25.4);
  return (pixels * (3 / PixelRatio.get()));
};


// Tableau des pièces et billets avec dimensions en mm
const DenominationData = [
  { value: '50.00', image: require('../assets/50euros.png'), width: mmToPx(35), height: mmToPx(19) },
  { value: '20.00', image: require('../assets/20euros.png'), width: mmToPx(35), height: mmToPx(19) },
  { value: '10.00', image: require('../assets/10euros.png'), width: mmToPx(35), height: mmToPx(19) },
  { value: '5.00', image: require('../assets/5euros.png'), width: mmToPx(35), height: mmToPx(19) },
  { value: '2.00', image: require('../assets/2euros.png'), width: mmToPx(25.75), height: mmToPx(25.75) },
  { value: '1.00', image: require('../assets/1euro.png'), width: mmToPx(23.25), height: mmToPx(23.25) },
  { value: '0.50', image: require('../assets/50cents.png'), width: mmToPx(24.25), height: mmToPx(24.25) },
  { value: '0.20', image: require('../assets/20cents.png'), width: mmToPx(22.25), height: mmToPx(22.25) },
  { value: '0.10', image: require('../assets/10cents.png'), width: mmToPx(19.75), height: mmToPx(19.75) },
  { value: '0.05', image: require('../assets/5cents.png'), width: mmToPx(21.25), height: mmToPx(21.25) },
  { value: '0.02', image: require('../assets/2cents.png'), width: mmToPx(18.75), height: mmToPx(18.75) },
  { value: '0.01', image: require('../assets/1cent.png'), width: mmToPx(16.25), height: mmToPx(16.25) },
];

// Composant pour chaque dénomination
const DenominationItem = ({ denomination, count }) => {
  return (
    <View style={CommonStyles.denominationContainer}>
      <Image
        source={denomination.image}
        style={{ width: (denomination.width / 1.5), height: (denomination.height / 1.5) }}
      />
      <Text style={CommonStyles.denominationText}>
        {count} × {denomination.value} €
      </Text>
    </View>
  );
};


export { DenominationData, DenominationItem };
