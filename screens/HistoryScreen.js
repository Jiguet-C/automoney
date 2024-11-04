import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { loadWalletHistory } from '../components/DataStorage';
import { auth } from '../firebaseConfig';

const HistoryScreen = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const userId = auth.currentUser.uid;
      const walletHistory = await loadWalletHistory(userId);

    // Trier l'historique par date (plus récent au plus ancien)
    const sortedHistory = walletHistory.sort((a, b) => {
    	const dateA = a.timestamp && a.timestamp.toDate ? a.timestamp.toDate() : new Date(a.timestamp);
      const dateB = b.timestamp && b.timestamp.toDate ? b.timestamp.toDate() : new Date(b.timestamp);
      return dateB - dateA; // Tri par ordre décroissant
    });

      setHistory(sortedHistory);
    };

    fetchHistory();
  }, []);

  const renderHistoryItem = (item) => {
		const { actionType, timestamp, details } = item;
		const date = timestamp && timestamp.toDate ? timestamp.toDate() : new Date(timestamp);

		return (
			<View style={{ marginBottom: 10, padding: 10, borderColor: '#ccc', borderWidth: 1 }}>
				<Text>Date: {date.toLocaleString()}</Text>
				<Text>Action: {actionType}</Text>

				{/* Afficher les détails spécifiques selon le type d'action */}
				{actionType === "Ajout" && (
					<>
					<Text>Ajouté au portefeuille: {JSON.stringify(details.walletChanges)}</Text>
					<Text>Total Wallet: {details.totalWallet} €</Text>
					</>
				)}
				{actionType === "Retrait" && (
					<>
					<Text>Retiré du portefeuille: {JSON.stringify(details.walletChanges)}</Text>
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
					<Text>Monnaie rendue: {JSON.stringify(details.walletChanges)}</Text>
					<Text>Total Wallet: {details.totalAfterChange} €</Text>
					</>
				)}
			</View>
		);
	};

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Historique des modifications</Text>
      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => renderHistoryItem(item)}
      />
    </View>
  );
};

export default HistoryScreen;
