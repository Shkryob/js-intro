<template>
  <v-app id="app">
    <v-navigation-drawer v-model="drawer" app clipped>
      <Menu></Menu>
    </v-navigation-drawer>

    <v-app-bar app
               clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>JS Intro</v-toolbar-title>
      <v-row>
        <v-spacer />
        <v-btn color="primary" outlined @click="run()">Run</v-btn>
        <v-btn color="primary" outlined class="ml-2" @click="test()">Test</v-btn>
      </v-row>

    </v-app-bar>

    <v-content>
      <v-container class="fill-height" fluid>
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-footer app>
      <span v-html="$t('credits')"></span>
      <v-spacer />
      <LocaleChanger></LocaleChanger>

      <v-btn class="ma-2" text icon href="https://github.com/Shkryob/js-intro" target="_blank">
        <v-icon dark>mdi-github</v-icon>
      </v-btn>
    </v-footer>
  </v-app>
</template>

<script>
import LocaleChanger from "./components/LocaleChanger";
import Menu from './components/Menu';
import store from "./store";

export default {
  name: 'App',

  components: {
    Menu,
    LocaleChanger,
  },

  data: () => ({
    drawer: null,
  }),

  created () {
    this.$vuetify.theme.dark = true
  },

  methods: {
    run() {
      store.triggerRunCode();
    },

    test() {
      store.triggerTestCode();
    },
  }
};
</script>

<style lang="scss">
  main {
    height: 100vh;

    .container.fill-height {
      padding: 0 0 0 12px;
    }

    > .v-content__wrap,
    > .v-content__wrap > .container,
    > .v-content__wrap > .container > .row,
    > .v-content__wrap > .container > .row > div {
      height: 100%;
    }
  }
</style>