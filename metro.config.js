const { getDefaultConfig } = require('@expo/metro-config');

// Export the default Expo Metro config. Some versions of nativewind don't
// provide a 'nativewind/metro' helper; NativeWind works via the Babel plugin
// (see babel.config.js). Keeping a simple default config avoids the runtime
// error when trying to require a missing helper.
const config = getDefaultConfig(__dirname);
// If you later install a nativewind version that exposes a metro helper,
// you can re-enable it here. For now just export the default config.
module.exports = config;