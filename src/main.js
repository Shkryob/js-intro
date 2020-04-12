import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import vuetify from './plugins/vuetify';
import Main from "./components/Main";
import i18n from './i18n'

const routes = [
  { path: '/:book?/:chapter?/:task?', component: Main },
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
  i18n,
  router
}).$mount('#app');
