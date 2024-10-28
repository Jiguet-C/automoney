import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  WALLET: 'wallet',
  BUDGET: 'budget',
};

// Sauvegarder le budget
export const saveBudget = async (budget) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.BUDGET, budget.toString());
  } catch (error) {
    console.error('Error saving budget:', error);
  }
};

// Charger le budget
export const loadBudget = async () => {
  try {
    const savedBudget = await AsyncStorage.getItem(STORAGE_KEYS.BUDGET);
    return savedBudget ? parseFloat(savedBudget) : 0;
  } catch (error) {
    console.error('Error loading budget:', error);
    return 0;
  }
};

export const loadWalletData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEYS.WALLET);
    return jsonValue != null ? JSON.parse(jsonValue) : {};
  } catch (e) {
    console.error('Error loading wallet data:', e);
    return {};
  }
};

export const saveWalletData = async (walletData) => {
  try {
    const jsonValue = JSON.stringify(walletData);
    await AsyncStorage.setItem(STORAGE_KEYS.WALLET, jsonValue);
  } catch (e) {
    console.error('Error saving wallet data:', e);
  }
};

// Calculer le montant total du portefeuille
export const calculateTotal = (wallet) => {
  return Object.keys(wallet).reduce((acc, key) => acc + (wallet[key] || 0) * parseFloat(key).toFixed(2), 0);
};

// Mettre à jour les données du portefeuille et le total
export const updateWalletData = async (wallet, setWallet) => {
  await saveWalletData(wallet);
  setWallet(wallet);
};

// Mettre à jour le budget et le portefeuille en même temps
export const updateBudgetAndWallet = async (budget, wallet, setWallet) => {
  await saveBudget(budget);
  await updateWalletData(wallet, setWallet);
};
