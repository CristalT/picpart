import Vue from 'vue';
import VueRouter from 'vue-router';
import Toast from './plugins/toast';
import Loading from './plugins/loading';
import ConfirmDialog from './plugins/confirm-dialog'

import router from './router'
import App from './App.vue';

import '@/assets/style.css';

Vue.use(VueRouter);
Vue.use(Toast);
Vue.use(Loading);
Vue.use(ConfirmDialog);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
