const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration without Watchman - FORCE Node crawler only
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  resolver: {
    unstable_enableSymlinks: false,
  },
  fileMap: {
    watchman: false,
  },
  watchFolders: [],
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
