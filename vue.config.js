module.exports = {
  // 配置反向代理
  devServer: {
    proxy: {
      '/api': {
        target: 'http://172.31.120.158:8080/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  }
}
