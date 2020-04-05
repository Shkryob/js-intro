module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.md$/i,
          use: 'raw-loader',
        },
      ],
    },
  }
};