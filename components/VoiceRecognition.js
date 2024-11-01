// Mapping des nombres en mots et chiffres
const numberMapping = {
  // Nombres composés en premier pour éviter les correspondances partielles
  'quatre-vingt-dix': 90,
  'soixante-dix': 70,
  'quatre-vingt': 80,
  'soixante': 60,
  'cinquante': 50,
  'quarante': 40,
  'trente': 30,
  'vingt': 20,
  'dix-neuf': 19,
  'dix-huit': 18,
  'dix-sept': 17,
  'seize': 16,
  'quinze': 15,
  'quatorze': 14,
  'treize': 13,
  'douze': 12,
  'onze': 11,
  'dix': 10,
  'neuf': 9,
  'huit': 8,
  'sept': 7,
  'six': 6,
  'cinq': 5,
  'quatre': 4,
  'trois': 3,
  'deux': 2,
  'de': 2,
  'un': 1,
  'une': 1,
  'zéro': 0,

  // Ajout des nombres écrits numériquement (de "0" à "99")
  ...Object.fromEntries(Array.from({ length: 100 }, (_, i) => [i.toString(), i]))
};

// Nettoie l'entrée (suppression de la ponctuation, mise en minuscules)
const cleanInput = (input) => {
  const cleaned = input.replace(/[.]/g, '').toLowerCase();
  console.log(`Cleaned Input: "${cleaned}"`);  // Log pour débogage
  return cleaned;
};

// Fonction pour extraire les billets et pièces
const extractBilletsEtPieces = (input) => {
  const billetPieceRegex = new RegExp(`\\b(${Object.keys(numberMapping).join('|')})\\s*(de\\s*)?(billet|pièce)s?\\b`, 'i');
  const match = input.match(billetPieceRegex);
  console.log(`Extracting billets et pièces from: "${input}"`);  // Log pour débogage
  console.log(`Billet/Pièce Match: ${match}`);  // Log pour débogage
  const value = match ? numberMapping[match[1].toLowerCase()] : null;
  console.log(`Billet/Pièce Value Extracted: ${value}`);  // Log pour débogage
  return value;
};

// Fonction pour extraire les billets et pièces
const extractEurosEtCentimes = (input) => {
  let euros = 0, centimes = 0;

  const euroRegex = new RegExp(`\\b(${Object.keys(numberMapping).join('|')})\\s*(euros?|€)\\b`, 'i');
  const centRegex = new RegExp(`\\b(${Object.keys(numberMapping).join('|')})\\s*(centimes?|¢)\\b`, 'i');
  const euroAndCentRegex = new RegExp(`\\b(${Object.keys(numberMapping).join('|')})\\s*(euros?|€)\\s*(et)?\\s*(${Object.keys(numberMapping).join('|')})?\\s*(centimes?|¢)?\\b`, 'i');

  const euroMatch = input.match(euroRegex);
  const centMatch = input.match(centRegex);
  const combinedMatch = input.match(euroAndCentRegex);

  // Traite les montants combinés (ex : "un euro et vingt centimes")
  if (combinedMatch) {
    euros = numberMapping[combinedMatch[1].toLowerCase()] || 0;
    if (combinedMatch[4]) {
      centimes = numberMapping[combinedMatch[4].toLowerCase()] || 0;
    }
  } else {
    // Traite uniquement les euros
    if (euroMatch) {
      euros = numberMapping[euroMatch[1].toLowerCase()] || 0;
    }
    // Traite uniquement les centimes
    if (centMatch) {
      centimes = numberMapping[centMatch[1].toLowerCase()] || 0;
    }
  }

  // Assurez-vous de retourner le montant en euros avec centimes
  return euros + (centimes / 100);
};

// Fonction pour extraire les nombres de billets
const extractBilletsNumbers = (input) => {
  console.log(`Extracting billets from input: "${input}"`);  // Log pour débogage
  const cleanedInput = cleanInput(input);
  const detectedNumbers = [];

  const billetPieceValue = extractBilletsEtPieces(cleanedInput);
  if (billetPieceValue !== null) {
    detectedNumbers.push(billetPieceValue);
  }

  const finalValue = detectedNumbers.length > 0 ? detectedNumbers.join('.') : input; // Changer le critère ici
  console.log(`Final Extracted Billet Value: ${finalValue}`);  // Log pour débogage
  return finalValue;
};

// Fonction pour extraire les nombres d'euros
const extractEurosNumbers = (input) => {
  console.log(`Extracting euros from input: "${input}"`);  // Log pour débogage
  const cleanedInput = cleanInput(input);
  const detectedNumbers = [];

  const euroCentValue = extractEurosEtCentimes(cleanedInput);
  if (euroCentValue !== 0) {
    detectedNumbers.push(euroCentValue);
  }

  const finalValue = detectedNumbers.length > 1 ? detectedNumbers.join(',') : input; // Changer le critère ici
  console.log(`Final Extracted Euro Value: ${finalValue}`);  // Log pour débogage
  return (finalValue);
};

// Exporter les fonctions
export { extractBilletsNumbers, extractEurosNumbers };
