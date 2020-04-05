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
        <v-btn color="error" outlined @click="run()">Run</v-btn>
        <v-btn color="error" outlined class="ml-2" @click="test()">Test</v-btn>
      </v-row>

    </v-app-bar>

    <v-content>
      <v-container class="fill-height" fluid>
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-footer app>
      <span>
        Content is taken from the book <a href="https://eloquentjavascript.net/" target="_blank">Eloquent JavaScript</a>
        and it's <a href="https://eloquent-javascript.karmazzin.ru/" target="_blank">russian translation</a>
      </span>
    </v-footer>
  </v-app>
</template>

<script>
import Menu from './components/Menu';
import store from "./store";

export default {
  name: 'App',

  components: {
    Menu,
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