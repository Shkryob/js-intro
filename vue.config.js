module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],

  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(md|txt)$/i,
          use: 'raw-loader',
        },
      ],
    },
  },

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  }
};
