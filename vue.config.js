// 导入compression-webpack-plugin
const CompressionWebpackPlugin = require('compression-webpack-plugin')
// 定义压缩文件类型
const productionGzipExtensions = ['js', 'css']

module.exports = {
  // 配置反向代理
  devServer: {
    proxy: {
      '/api': {
        target: 'https://172.31.120.111:8080/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    // 开启https 访问时使用https://172.31.120.61:8081
    // https://localhost:8081 也可以访问，不过自带info请求会报错 不清楚具体原因
    https: true,
    port: 8081
  },
  configureWebpack: {
    plugins: [
      new CompressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      })
    ]
  }
}
