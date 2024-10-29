export const calculateChangeSolution = (amountToReturn, wallet) => {
  const remainingAmount = Math.round(amountToReturn * 100);
  const walletInCents = {};

  Object.keys(wallet).forEach(key => {
    walletInCents[Math.round(parseFloat(key) * 100)] = wallet[key];
  });

  const walletValues = Object.keys(walletInCents)
    .map(key => parseInt(key))
    .sort((a, b) => b - a); // Trier dans l'ordre décroissant pour rendre la monnaie efficacement

  const bestSolution = findBestSolution(remainingAmount, walletValues, walletInCents);

  return { solution: bestSolution };
  };

  const findBestSolution = (remainingAmount, coins, walletInCents) => {
  const solution = {};

  for (let i = 0; i < coins.length; i++) {
    const coin = coins[i];
    while (remainingAmount >= coin && walletInCents[coin] > 0) {
    remainingAmount -= coin;
    walletInCents[coin]--;
    solution[coin] = (solution[coin] || 0) + 1;
    }
  }

  return remainingAmount === 0 ? solution : null;
  };
