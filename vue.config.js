'use strict'
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = 'vue-multiple-mock-dev'

const port = 9521

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: true,
  devServer: {
    port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    disableHostCheck: true,
    proxy: {
      '/wx/': {
        target: 'https://api.weixin.qq.com/',
        changeOrigin: true,
        pathRewrite: {
          '^/wx': ''
        }
      },
      '/node/': {
        target: 'http://nodetest.ngrok2.xiaomiqiu.cn',
        changeOrigin: true,
        pathRewrite: {
          '^/node': ''
        }
      }
    }
  },
  configureWebpack: {
    // html的title
    name,
    resolve: {
      alias: {
        '@': resolve('src'),
        'api': resolve('src/api/index.js')
      }
    }
  },
  chainWebpack(config) {
    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()
  }
}
