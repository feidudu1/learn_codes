const path = require('path');
const { name } = require('./package');

function resolve(dir) {
  return path.join(__dirname, dir);
}

const port = 9004;

module.exports = {
  outputDir: 'dist',
  assetsDir: 'static',
  filenameHashing: true, // 打包出来的文件，会带有hash信息
  publicPath: 'http://localhost:9004',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    hot: true,
    disableHostCheck: true,
    port,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  // 自定义webpack配置
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
      },
    },
    output: {
      // 把子应用打包成 umd 库格式,commonjs浏览器，node环境都可以用
      // TODO: important!
      libraryTarget: 'umd',
      filename: 'vue2.js',
      library: 'vue2', // 在其服务后，浏览器的全局环境可以获取到 window.vue2
      jsonpFunction: `webpackJsonp_${name}`,
    },
  },
};
