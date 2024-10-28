import { StyleSheet } from 'react-native';
import CommonStyles from './CommonStyles';

const HomeScreenStyles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
  },
  walletButton: {
    ...CommonStyles.button,
  },
  payButton: {
    ...CommonStyles.button,
  },
  buttonText: {
    ...CommonStyles.buttonText,
    fontSize: 20,
  },
  amountText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10,
  },
  budgetText: {
    fontSize: 20,
    textAlign: 'center',
  },
});

export default HomeScreenStyles;
