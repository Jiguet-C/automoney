import {
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc,
  query,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

// Fonction générique pour enregistrer une action dans l'historique de Firestore
export const logAction = async (actionType, details) => {
  const userId = auth.currentUser.uid;
  try {
    const actionRef = await addDoc(collection(db, "users", userId, "history"), {
      actionType,
      details,
      timestamp: Timestamp.now(),
    });

    const totalWallet = await calculateTotal();

    details.totalWallet = totalWallet.toFixed(2);

    await setDoc(actionRef, { details }, { merge: true });

    console.log("Historique sauvegardé:", { actionType, details, totalWallet });
    return totalWallet;
  } catch (error) {
    console.error("Erreur lors de la sauvegarde de l'historique :", error);
    return null;
  }
};

// Sauvegarder le budget
export const saveBudget = async (budget) => {
  const userId = auth.currentUser.uid;
  try {
    await setDoc(doc(db, "users", userId), { budget }, { merge: true });
  } catch (error) {
    console.error(
      "Erreur lors de la sauvegarde du budget sur Firestore:",
      error
    );
  }
};

// Charger le budget depuis Firestore
export const loadBudget = async () => {
  const userId = auth.currentUser.uid;
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() && docSnap.data().budget
      ? docSnap.data().budget
      : 0;
  } catch (error) {
    console.error(
      "Erreur lors du chargement du budget depuis Firestore:",
      error
    );
    return 0;
  }
};

// Sauvegarder les données du portefeuille
export const saveWalletData = async (walletData) => {
  const userId = auth.currentUser.uid;
  try {
    await setDoc(
      doc(db, "users", userId),
      { wallet: walletData },
      { merge: true }
    );
  } catch (error) {
    console.error(
      "Erreur lors de la sauvegarde des données du portefeuille sur Firestore:",
      error
    );
  }
};

// Charger les données du portefeuille depuis Firestore
export const loadWalletData = async () => {
  const userId = auth.currentUser.uid;
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() && docSnap.data().wallet
      ? docSnap.data().wallet
      : {};
  } catch (error) {
    console.error(
      "Erreur lors du chargement des données du portefeuille depuis Firestore:",
      error
    );
    return {};
  }
};

// Enregistrer l'ajout d'argent
export const logAddToWallet = async (addedToWallet, denomination, quantity) => {
  return await logAction("Ajout", {
    addedToWallet,
    walletChanges: { [denomination]: quantity },
  });
};

// Enregistrer le retrait d'argent
export const logWithdrawFromWallet = async (
  withdrawnFromWallet,
  denomination,
  quantity
) => {
  return await logAction("Retrait", {
    withdrawnFromWallet,
    walletChanges: { [denomination]: quantity },
  });
};

// Enregistrer un paiement
export const logPayment = async (paymentAmount) => {
  return await logAction("Paiement", {
    paymentAmount,
  });
};

// Enregistrer le change rendu
export const logChangeGiven = async (
  changeAmount,
  denomination,
  quantity,
  totalAfterChange
) => {
  return await logAction("Change rendu", {
    changeAmount,
    walletChanges: { [denomination]: quantity },
    totalAfterChange,
  });
};

// Calculer le montant total du portefeuille
export const calculateTotal = async () => {
  const wallet = await loadWalletData();
  return Object.keys(wallet).reduce(
    (acc, key) => acc + (wallet[key] || 0) * parseFloat(key),
    0
  );
};

// Charger l'historique des modifications du portefeuille
export const loadWalletHistory = async (userId) => {
  try {
    const q = query(collection(db, "users", userId, "history"));
    const querySnapshot = await getDocs(q);
    const history = [];
    querySnapshot.forEach((doc) => {
      history.push({ id: doc.id, ...doc.data() });
    });
    return history;
  } catch (error) {
    console.error("Erreur lors du chargement de l'historique:", error);
    return [];
  }
};

// Mettre à jour les données du portefeuille
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
