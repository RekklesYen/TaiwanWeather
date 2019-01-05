module.exports = {
  baseUrl: '/',
  devServer: {
    // proxy: 'https://opendata.cwb.gov.tw/'
    proxy: {
      '/api': {
        target: 'https://opendata.cwb.gov.tw/',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
