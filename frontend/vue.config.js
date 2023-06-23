module.exports = {
  lintOnSave: false,
  productionSourceMap: true,
  devServer:{
    port:3000,
    proxy:{
      '/api':{
        target:"http://localhost:8081",
        ws: true,
        changeOrigin:true
      }
    }
  },
  chainWebpack: (config) => {config.module.rules.delete("svg");},
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.svg$/,
          loader: "vue-svg-loader",
        },
      ],
    },
  }
}