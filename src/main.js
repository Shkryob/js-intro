import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import vuetify from './plugins/vuetify';
import Main from "./components/Main";

const routes = [
  { path: '/', component: Main },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

Vue.use(VueRouter);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  vuetify,
  router
}).$mount('#app');
