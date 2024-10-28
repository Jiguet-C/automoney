import { StyleSheet } from 'react-native';
import CommonStyles from './CommonStyles';

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  denominationContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  denominationImage: {
    width: 100, // Taille de l'image (ajustez selon vos besoins)
    height: 100,
    resizeMode: 'contain', // S'assure que l'image garde ses proportions
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    backgroundColor: '#2196F3',
  },
  backButton: {
    backgroundColor: 'orange',
  },
  validateButton: {
    backgroundColor: 'green',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  calculateButton: {
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    backgroundColor: '#2196F3',
    alignSelf: 'center',
  },
  solutionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    marginTop: 20,
    textAlign: 'center',
  },
});

export default styles;

