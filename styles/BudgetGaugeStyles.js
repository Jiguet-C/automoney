import { StyleSheet } from 'react-native';
import CommonStyles from './CommonStyles';

const BudgetGaugeStyles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative', // Important pour positionner l'icône
    marginTop: 20,
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
  input: {
    flexGrow: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    textAlign: 'center',
  },
  iconContainer: {
    position: 'absolute',
    right: 10, // Ajuste l'icône à droite de la zone de saisie
  },
  saveButton: {
		...CommonStyles.button,
		backgroundColor: '#4CAF50',
  },
  saveButtonText: {
    ...CommonStyles.buttonText,
    color: 'white',
  },
  cancelButton: {
		...CommonStyles.button,
		backgroundColor: '#f44336',
  },
  cancelButtonText: {
    ...CommonStyles.buttonText,
    color: 'white',
  },
});

export default BudgetGaugeStyles;
