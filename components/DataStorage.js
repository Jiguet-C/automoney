import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from '../firebaseConfig';

const STORAGE_KEYS = {
  WALLET: 'wallet',
  BUDGET: 'budget',
};

// Sauvegarder le budget sur Firestore
export const saveBudget = async (budget) => {
  const userId = auth.currentUser.uid; // Récupère l'ID de l'utilisateur actuel
  try {
    await setDoc(doc(db, 'users', userId), { budget: budget }, { merge: true });
  } catch (error) {
    console.error('Erreur lors de la sauvegarde du budget sur Firestore:', error);
  }
};

// Charger le budget depuis Firestore
export const loadBudget = async () => {
  const userId = auth.currentUser.uid; // Récupère l'ID de l'utilisateur actuel
  try {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() && docSnap.data().budget ? docSnap.data().budget : 0;
  } catch (error) {
    console.error('Erreur lors du chargement du budget depuis Firestore:', error);
    return 0;
  }
};

// Sauvegarder les données du portefeuille sur Firestore
export const saveWalletData = async (walletData) => {
  const userId = auth.currentUser.uid; // Récupère l'ID de l'utilisateur actuel
  try {
    await setDoc(doc(db, 'users', userId), { wallet: walletData }, { merge: true });
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des données du portefeuille sur Firestore:', error);
  }
};

// Charger les données du portefeuille depuis Firestore
export const loadWalletData = async () => {
  const userId = auth.currentUser.uid; // Récupère l'ID de l'utilisateur actuel
  try {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() && docSnap.data().wallet ? docSnap.data().wallet : {};
  } catch (error) {
    console.error('Erreur lors du chargement des données du portefeuille depuis Firestore:', error);
    return {};
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

// Charger les données au démarrage
export const loadData = async (setWallet, setBudget) => {
  const budget = await loadBudget();
  const wallet = await loadWalletData();
  setBudget(budget);
  setWallet(wallet);
};
