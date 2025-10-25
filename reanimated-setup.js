// Assurer que react-native-reanimated est chargé avant le reste de l'app.
// Utiliser require() ici pour rester compatible avec l'entrée CommonJS (index.js).
try {
	// eslint-disable-next-line global-require
	require('react-native-reanimated');
} catch (e) {
	// Ignore: lors des builds ou environnements où la dépendance n'est pas disponible,
	// on ne veut pas casser le démarrage (nous gardons le comportement tolérant).
	// Si vous voyez une erreur ici en production, assurez-vous que
	// react-native-reanimated est installé et inclus dans la build.
}
