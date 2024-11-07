import { StyleSheet } from "react-native";

const CommonStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  label: {
    fontSize: 18,
    marginVertical: 8,
    textAlign: "center",
  },
  input: {
    width: "80%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#323a42",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 5,
    shadowColor: "#323a42",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonContainer: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    width: "80%",
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#323a42",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    width: 300,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 5,
    fontStyle: "bold",
    textAlign: "center",
  },
  modalExemple: {
    fontSize: 16,
    marginBottom: 15,
    color: "grey",
    fontStyle: "italic",
    textAlign: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
  denominationContainer: {
    margin: 5,
  },
  denominationText: {
    fontStyle: "italic",
    textAlign: "center",
  },
});

const HomeScreenStyles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
  },
  blueButton: {
    ...CommonStyles.button,
    backgroundColor: "#597cff",
    width: "90%",
    padding: 16,
    borderRadius: 8,
  },
  purpleButton: {
    ...CommonStyles.button,
    backgroundColor: "#985ed2",
    width: "80%",
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#323a42",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  greyButton: {
    ...CommonStyles.button,
    backgroundColor: "#323a42",
    width: "80%",
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#323a42",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  violetButton: {
    ...CommonStyles.button,
    backgroundColor: "#816de9",
    width: "80%",
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#323a42",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginTop: 10,
    textAlign: "center",
  },
});

const BudgetGaugeStyles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
    flex: 0,
  },
  greenButton: {
    ...CommonStyles.button,
    backgroundColor: "#22a663",
  },
  redButton: {
    ...CommonStyles.button,
    backgroundColor: "#f15930",
  },
  buttonContainer: {
    ...CommonStyles.buttonContainer,
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
    backgroundColor: "#22a663",
  },
  redButton: {
    ...CommonStyles.button,
    backgroundColor: "#f15930",
  },
  buttonContainer: {
    ...CommonStyles.buttonContainer,
  },
  totalText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  totalAmount: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
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
    height: 100,
    resizeMode: "contain",
    marginBottom: 5,
  },
  denominationContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "flex-end",
  },
});

const PayScreenStyles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
  },
  blueButton: {
    ...CommonStyles.button,
    backgroundColor: "#597cff",
  },
  greenButton: {
    ...CommonStyles.button,
    backgroundColor: "#22a663",
  },
  redButton: {
    ...CommonStyles.button,
    backgroundColor: "#f15930",
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
  label: {
    ...CommonStyles.label,
    fontWeight: "bold",
  },
  denominationContainer: {
    marginVertical: 20,
    alignItems: "center",
  },
  denominationImage: {
    resizeMode: "contain",
  },
  buttonContainer: {
    ...CommonStyles.buttonContainer,
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
    backgroundColor: "#22a663",
  },
  redButton: {
    ...CommonStyles.button,
    backgroundColor: "#f15930",
  },
  buttonContainer: {
    ...CommonStyles.buttonContainer,
  },
  label: {
    ...CommonStyles.label,
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  denominationContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "flex-end",
  },
});

const VoiceInputStyles = StyleSheet.create({
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    fontSize: 16,
    paddingLeft: 10,
    color: "black",
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 10,
    height: 40,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    width: "100%",
  },
  switchIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
  },
  switchIcon: {
    fontSize: 24,
    color: "grey",
  },
  switch: {
    marginHorizontal: 10,
  },
});

const SettingsScreenStyles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
  },
  greenButton: {
    ...CommonStyles.button,
    backgroundColor: "#22a663",
  },
  redButton: {
    ...CommonStyles.button,
    backgroundColor: "#f15930",
  },
});

const LoginScreenStyles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
  },
  title: {
    ...CommonStyles.title,
  },
  input: {
    ...CommonStyles.input,
    textAlign: "left",
    marginBottom: 10,
  },
  blueButton: {
    ...CommonStyles.button,
    backgroundColor: "#597cff",
    marginBottom: 20,
  },
  denominationText: {
    ...CommonStyles.denominationText,
    color: "#597cff",
  },
});

const HistoryScreenStyles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
  },
  title: {
    ...CommonStyles.title,
    fontSize: 20,
    marginTop: 20,
  },
  card: {
    ...CommonStyles.card,
    width: "100%",
    alignItems: "left",
  },
});

export {
  CommonStyles,
  HomeScreenStyles,
  BudgetGaugeStyles,
  WalletScreenStyles,
  PayScreenStyles,
  ChangeScreenStyles,
  VoiceInputStyles,
  SettingsScreenStyles,
  LoginScreenStyles,
  HistoryScreenStyles,
};
