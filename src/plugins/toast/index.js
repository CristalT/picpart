import ToastComponent from './ToastComponent.vue';
import Api from './api.js';

const Plugin = (Vue, options = {}) => {
  let methods = Api(Vue, options);
  Vue.$toast = methods;
  Vue.prototype.$toast = methods;
};

ToastComponent.install = Plugin;

export default ToastComponent;
export { ToastComponent }