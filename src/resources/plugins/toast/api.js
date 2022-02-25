import ToastComponent from './ToastComponent.vue'

const Api = (Vue, globalOptions = {}) => {
  return {
    open(options) {
      let message;
      if (typeof options === 'string') message = options;

      const defaultOptions = {
        message
      };

      const propsData = Object.assign({}, defaultOptions, globalOptions, options);

      return new (Vue.extend(ToastComponent))({
        el: document.createElement('div'),
        propsData
      })
    },
    clear() {
      // event bus clear
    },
    positive(message, options = {}) {
      return this.open(Object.assign({}, {
        message,
        type: 'positive'
      }, options))
    },
    negative(message, options = {}) {
      return this.open(Object.assign({}, {
        message,
        type: 'negative'
      }, options))
    },
    info(message, options = {}) {
      return this.open(Object.assign({}, {
        message,
        type: 'info'
      }, options))
    },
    warning(message, options = {}) {
      return this.open(Object.assign({}, {
        message,
        type: 'warning'
      }, options))
    },
    default(message, options = {}) {
      return this.open(Object.assign({}, {
        message,
        type: 'default'
      }, options))
    }
  }
};

export default Api;