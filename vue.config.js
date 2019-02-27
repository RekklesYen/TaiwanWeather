module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/TaiwanWeather/' : '/',
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
