// Configuration initiale pour les screens natifs et le buffer
const setupEnvironment = () => {
  // Configurer react-native-screens
  try {
    const { enableScreens } = require('react-native-screens');
    // Désactiver les screens natifs en dev pour éviter les problèmes de type
    enableScreens(false);
  } catch (e) {
    console.warn('react-native-screens non disponible:', e.message);
  }

  // Configurer le polyfill Buffer
  try {
    const { Buffer } = require('buffer');
    if (typeof global !== 'undefined' && !global.Buffer) {
      global.Buffer = Buffer;
    }
  } catch (e) {
    console.warn('buffer polyfill non disponible:', e.message);
  }

  // Assurer que Reanimated est configuré en premier
  try {
    require('./reanimated-setup');
  } catch (e) {
    console.warn('erreur de configuration reanimated:', e.message);
  }
};

// Exécuter la configuration
setupEnvironment();

// Démarrer l'application
require('expo-router/entry');