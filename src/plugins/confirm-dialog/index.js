import defer from './defer';
import ConfirmDialog from './ConfirmDialog.vue';

const install = (Vue) => {
  const ConfirmDialogComponent = Vue.extend(ConfirmDialog);

  const confirmView = (message) => {
    const dialog = new ConfirmDialogComponent({ propsData: { message } });

    const mount = document.createElement('div');
    mount.id = 'confirm-dialog-' + Date.now();
    document.body.appendChild(mount);

    dialog.$mount(mount);

    return dialog;
  };

  Vue.prototype.$confirm = (message) => {
    if (!message || typeof message !== 'string') {
      throw new Error('Confirmation dialog expected a message.')
    }
    const deferred = defer();
    confirmView(message).$on('ok', () => {
      deferred.resolve();
    }).$on('cancel', () => {
      deferred.reject();
    });
    return deferred.promise;
  };
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install);
}

export default install;
