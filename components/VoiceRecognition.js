const numberMapping = {
  'un': '1',
  'une': '1',
  'deux': '2',
  'trois': '3',
  'quatre': '4',
  'cinq': '5',
  'six': '6',
  'sept': '7',
  'huit': '8',
  'neuf': '9',
  'dix': '10',
  'zéro': '0',
};

// Fonction pour extraire tous les nombres d'une chaîne
const extractNumbers = (input) => {
  const lowerInput = input.toLowerCase();
  const detectedNumbers = [];

  // Vérifier les cas simples directement
  for (const [word, number] of Object.entries(numberMapping)) {
    const regex = new RegExp(`\\b${word}\\b`);
    if (regex.test(lowerInput)) {
      detectedNumbers.push(number);
      console.log(`Detected word: ${word} -> number: ${number}`);
    }
  }

  // Vérifier les chiffres numériques dans l'entrée
  const numericMatches = lowerInput.match(/\b\d+(\.\d{1,2})?\b/g);
  if (numericMatches) {
    detectedNumbers.push(...numericMatches);
    console.log(`Detected numeric matches: ${numericMatches}`);
  }

  // Si des nombres sont détectés, les retourner, sinon l'entrée originale
  return detectedNumbers.length > 0 ? detectedNumbers.join(', ') : input;
};

export default extractNumbers;
