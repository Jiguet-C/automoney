import { StyleSheet } from 'react-native';

const CommonStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  label: {
    fontSize: 18,
    marginVertical: 8,
    textAlign: 'center',
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#d3d3d3',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
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
    fontSize: 20,
    marginBottom: 15,
  },
  modalExemple: {
    fontSize: 20,
    marginBottom: 15,
    color: 'grey',
    fontStyle: 'italic',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
	denominationContainer: {
		margin: 5,
	},
	denominationText: {
		fontStyle: 'italic',
		textAlign: 'center',
	},
});

const HomeScreenStyles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
  },
  greenButton: {
    ...CommonStyles.button,
		backgroundColor: '#4CAF50',
  },
  redButton: {
    ...CommonStyles.button,
		backgroundColor: 'orange',
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10,
		textAlign: 'center',
  },
});

const BudgetGaugeStyles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
    flex: 0,
  },
	greenButton: {
    ...CommonStyles.button,
		backgroundColor: '#4CAF50',
  },
  redButton: {
    ...CommonStyles.button,
		backgroundColor: 'orange',
  },
  modalContainer: {
    ...CommonStyles.modalContainer,
  },
  modalView: {
    ...CommonStyles.modalView,
  },
  modalTitle: {
    ...CommonStyles.modalTitle,
  },
	modalExemple: {
		...CommonStyles.modalExemple,
	},
});

const WalletScreenStyles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
		padding: 10,
  },
	greenButton: {
    ...CommonStyles.button,
		backgroundColor: '#4CAF50',
  },
  redButton: {
    ...CommonStyles.button,
		backgroundColor: 'orange',
  },
  totalText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10,
  },
  totalAmount: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
  },
	walletContainer: {
    justifyContent: 'center',
    marginBottom: 20,
		alignItems: 'center',
  },
  modalContainer: {
    ...CommonStyles.modalContainer,
  },
  modalView: {
    ...CommonStyles.modalView,
  },
  modalTitle: {
    ...CommonStyles.modalTitle,
  },
	modalExemple: {
		...CommonStyles.modalExemple,
	},
  modalImage: {
    width: 200,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
	denominationContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
		alignItems: 'flex-end',
  },
});

const PayScreenStyles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
  },
	greenButton: {
    ...CommonStyles.button,
		backgroundColor: '#4CAF50',
  },
  redButton: {
    ...CommonStyles.button,
		backgroundColor: 'orange',
  },
  modalTitle: {
    ...CommonStyles.modalTitle,
	},
	modalExemple: {
		...CommonStyles.modalExemple,
	},
  label: {
    ...CommonStyles.label,
    fontWeight: 'bold',
  },
  denominationContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  denominationImage: {
    resizeMode: 'contain',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  errorText: {
    ...CommonStyles.errorText,
  },
});

const ChangeScreenStyles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
    padding: 10,
  },
	greenButton: {
    ...CommonStyles.button,
		backgroundColor: '#4CAF50',
  },
  redButton: {
    ...CommonStyles.button,
		backgroundColor: 'orange',
  },
  label: {
    ...CommonStyles.label,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
	denominationContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
		alignItems: 'flex-end',
  },
});

const VoiceInputStyles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderColor: 'grey',
    position: 'relative',
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 10,
    color: 'black',
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export { CommonStyles, HomeScreenStyles, BudgetGaugeStyles, WalletScreenStyles, PayScreenStyles, ChangeScreenStyles, VoiceInputStyles };
