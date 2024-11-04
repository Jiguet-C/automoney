import { calculateTotal } from "./DataStorage";

export const findBestSolution = (remainingAmount, coins, walletInCents) => {
  let bestSolution = null;
  let closestAmount = Infinity;

  const findCombinations = (currentSolution, currentAmount, index) => {
    if (currentAmount >= remainingAmount && currentAmount < closestAmount) {
    bestSolution = { ...currentSolution };
    closestAmount = currentAmount;
    }

    for (let i = index; i < coins.length; i++) {
    const coinValue = coins[i];
    let countAvailable = walletInCents[coinValue];

    if (countAvailable > 0) {
      walletInCents[coinValue]--;
      currentSolution[coinValue] = (currentSolution[coinValue] || 0) + 1;
      findCombinations(currentSolution, currentAmount + coinValue, i);
      walletInCents[coinValue]++;
      currentSolution[coinValue]--;
    }
  	}
	};

	// Tri des valeurs des billets/pièces en ordre décroissant
	const sortedCoins = coins.sort((a, b) => b - a);
  findCombinations({}, 0, 0);
  return bestSolution;
};

export const calculatePayment = (amountToPay, wallet) => {
  const totalWallet = calculateTotal(wallet);
  let amount = parseFloat(amountToPay.replace(',', '.').replace(/^(\d+\.?\d{0,2}).*$/, '$1'));

  if (isNaN(amount) || amount <= 0) {
    return { error: 'Montant invalide : Le montant doit être supérieur à zéro', solution: null };
  }

  if (amount > totalWallet) {
    return { error: 'Erreur : Montant supérieur à ce que contient votre porte-monnaie', solution: null };
  }

  let remainingAmount = Math.round(amount * 100);
  const walletInCents = {};

  Object.keys(wallet).forEach(key => {
    walletInCents[Math.round(parseFloat(key) * 100)] = wallet[key];
  });

  // Appliquer le tri décroissant
  const walletValues = Object.keys(walletInCents)
    .map(key => parseInt(key))
    .sort((a, b) => b - a); // Tri décroissant

  const bestSolution = findBestSolution(remainingAmount, walletValues, walletInCents);

  if (bestSolution) {
    const filteredSolution = Object.entries(bestSolution)
    .filter(([key, value]) => value > 0)
    .reduce((acc, [key, value]) => {
      acc[(key / 100).toFixed(2)] = value;
      return acc;
    }, {});

    return { solution: filteredSolution, remainingAmount };
  } else {
    return { error: 'Erreur : Impossible de régler ce montant avec les pièces/billets disponibles', solution: null };
  }
};
