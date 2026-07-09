const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

const { resolver } = config;

resolver.sourceExts = [...resolver.sourceExts, 'cjs'];
// Ces options sont souvent nécessaires pour la compatibilité de certains packages ESM dans Metro sur Windows
resolver.unstable_enablePackageExports = true;
resolver.unstable_conditionNames = ['require', 'default', 'browser'];

module.exports = config;