import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { loadWalletHistory } from "../components/DataStorage";
import { auth } from "../firebaseConfig";
import { HistoryScreenStyles } from "../styles/AllStyles";

// Fonction utilitaire pour formater les changements de portefeuille
const formatWalletChanges = (walletChanges) => {
  return Object.entries(walletChanges)
    .map(
      ([denomination, quantity]) =>
        `${parseFloat(denomination).toFixed(2)} € x${quantity}`
    )
    .join(", ");
};

const HistoryScreen = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const userId = auth.currentUser.uid;
      const walletHistory = await loadWalletHistory(userId);

      // Trier l'historique par date (plus récent au plus ancien)
      const sortedHistory = walletHistory.sort((a, b) => {
        const dateA =
          a.timestamp && a.timestamp.toDate
            ? a.timestamp.toDate()
            : new Date(a.timestamp);
        const dateB =
          b.timestamp && b.timestamp.toDate
            ? b.timestamp.toDate()
            : new Date(b.timestamp);
        return dateB - dateA;
      });

      setHistory(sortedHistory);
    };

    fetchHistory();
  }, []);

  const renderHistoryItem = (item) => {
    const { actionType, timestamp, details } = item;
    const date =
      timestamp && timestamp.toDate ? timestamp.toDate() : new Date(timestamp);

    return (
      <View style={HistoryScreenStyles.card}>
        <Text>Date: {date.toLocaleString()}</Text>
        <Text>Action: {actionType}</Text>

        {actionType === "Ajout" && (
          <>
            <Text>
              Ajouté au portefeuille:{" "}
              {formatWalletChanges(details.walletChanges)}
            </Text>
            <Text>Total Wallet: {details.totalWallet} €</Text>
          </>
        )}
        {actionType === "Retrait" && (
          <>
            <Text>
              Retiré du portefeuille:{" "}
              {formatWalletChanges(details.walletChanges)}
            </Text>
            <Text>Total Wallet: {details.totalWallet} €</Text>
          </>
        )}
        {actionType === "Paiement" && (
          <>
            <Text>Montant du paiement: -{details.paymentAmount} €</Text>
            <Text>Total Wallet: {details.totalWallet} €</Text>
          </>
        )}
        {actionType === "Change rendu" && (
          <>
            <Text>Montant à rendre: {details.changeAmount} €</Text>
            <Text>
              Monnaie rendue: {formatWalletChanges(details.walletChanges)}
            </Text>
            <Text>Total Wallet: {details.totalAfterChange} €</Text>
          </>
        )}
      </View>
    );
  };

  return (
    <View style={HistoryScreenStyles.container}>
      <Text style={HistoryScreenStyles.title}>
        Historique des modifications
      </Text>
      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => renderHistoryItem(item)}
      />
    </View>
  );
};

export default HistoryScreen;
