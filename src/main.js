import Vue from 'vue';
import VueRouter from 'vue-router';

import router from './router'
import App from './App.vue';

// Font awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlusSquare, faEdit } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add([faPlusSquare, faEdit]);

Vue.component('fa-icon', FontAwesomeIcon);

import '@/assets/style.css';


Vue.use(VueRouter);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
