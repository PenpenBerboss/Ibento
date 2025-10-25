// Disable native screens to avoid native-side type mismatches in this dev setup.
// This forces the JS implementation of screens which is more tolerant during dev.
try {
	const { enableScreens } = require('react-native-screens');
	if (enableScreens) enableScreens(false);
} catch (e) {
	// ignore if react-native-screens not available
}
// Polyfill Node's Buffer for libraries that import "buffer" (ex: react-native-svg, lucide-react-native)
try {
	const { Buffer } = require('buffer');
	if (global && !global.Buffer) {
		global.Buffer = Buffer;
	}
} catch (e) {
	// ignore if buffer not available
}

// Import Reanimated configuration
require('./reanimated-setup');

require('expo-router/entry');