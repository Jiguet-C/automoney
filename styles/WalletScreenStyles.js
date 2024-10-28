import { StyleSheet } from 'react-native';
import CommonStyles from './CommonStyles';

const WalletScreenStyles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
  },
  totalContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  totalText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  totalAmount: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
  },
  walletContainer: {
    justifyContent: 'center',
    marginBottom: 20,
  },
  itemContainer: {
    alignItems: 'center',
    margin: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: 300,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    ...CommonStyles.title,
    marginBottom: 20,
  },
  modalImage: {
    width: 200,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  input: {
    ...CommonStyles.input,
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
	button: {
		...CommonStyles.button,
		maxWidth: '50%',
	},
	buttonText: {
    ...CommonStyles.buttonText,
  },
});

export default WalletScreenStyles;
