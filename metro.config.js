const { getDefaultConfig } = require('@expo/metro-config');
const path = require('path');

const defaultConfig = getDefaultConfig(__dirname);

// Add 'cjs' to the list of source extensions
defaultConfig.resolver.sourceExts.push('cjs');

// Add a custom resolver for assets in /app/assets
defaultConfig.resolver.extraNodeModules = {
  assets: path.resolve(__dirname, 'app/assets'),
};

// Enable asset plugins for Expo
defaultConfig.transformer.assetPlugins = ['expo-asset/tools/hashAssetFiles'];

module.exports = defaultConfig;