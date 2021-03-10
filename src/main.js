import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';

import './assets/styles/index.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';

Vue.config.productionTip = true;

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    // { path: '/page', component: App },
  ],
});

new Vue({
  render: h => h(App),
  router
}).$mount('#app');