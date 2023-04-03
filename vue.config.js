module.exports = {
  pages: {
    index: {
      entry: 'src/main.js'
    }
  },
  lintOnSave: false,
  devServer: {
      proxy: {
          '/api': {
              target: 'https://c.m.163.com',
              pathRewrite:{'^/api':'/ug/api'},
              // ws: true, //用于支持websocket,默认值为true
              // changeOrigin: true //用于控制请求头中的host值,默认值为true
          },
          '/api2': {
              target: 'http://localhost:5001',
              pathRewrite:{'^/api2':''},
          }
      }
  }
}
