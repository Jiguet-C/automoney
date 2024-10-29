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
    backgroundColor: '#4CAF50',
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
  errorText: {
    color: 'red',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
});

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

const BudgetGaugeStyles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
		flex: 0,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    marginTop: 20,
  },
  modalContainer: {
    ...CommonStyles.modalContainer,
  },
  modalView: {
    ...CommonStyles.modalView,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 15,
  },
  input: {
    ...CommonStyles.input,
    flexGrow: 1,
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
  },
  saveButton: {
    ...CommonStyles.button,
  },
  saveButtonText: {
    ...CommonStyles.buttonText,
  },
  cancelButton: {
    ...CommonStyles.button,
    backgroundColor: '#f44336',
  },
  cancelButtonText: {
    ...CommonStyles.buttonText,
  },
});

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
    ...CommonStyles.container,
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
    ...CommonStyles.modalContainer,
  },
  modalView: {
    ...CommonStyles.modalView,
  },
  modalTitle: {
    ...CommonStyles.title,
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
	summaryContainer: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#EFEFEF',
    borderRadius: 5,
    marginVertical: 10,
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

const PayScreenStyles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
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
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    ...CommonStyles.button,
    backgroundColor: '#2196F3',
  },
  backButton: {
    ...CommonStyles.button,
    backgroundColor: 'orange',
  },
  validateButton: {
    ...CommonStyles.button,
    backgroundColor: 'green',
  },
  calculateButton: {
    ...CommonStyles.button,
    marginTop: 20,
    alignSelf: 'center',
  },
  solutionContainer: {
    ...CommonStyles.container,
  },
  errorText: {
    ...CommonStyles.errorText,
  },
});

const ChangeScreenStyles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
    padding: 20,
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
    marginTop: 20,
  },
  denominationImage: {
    width: 70,
    height: 70,
    margin: 10,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  denominationText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginTop: 5,
  },
  changeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  resetButton: {
    ...CommonStyles.button,
    backgroundColor: '#dc3545',
  },
  validateButton: {
    ...CommonStyles.button,
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
    borderColor: 'blue',
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
