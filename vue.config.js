const { defineConfig } = require('@vue/cli-service');
const path = require('path');

module.exports = defineConfig({
  transpileDependencies: true,
  pages: {
    index: {
      entry: path.join(__dirname, './src/resources/main.js'),
    },
  },
  pluginOptions: {
    electronBuilder: {
      preload: 'src/preload.js',
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.join(__dirname, './src/resources/'),
      }
    }
  }
});
