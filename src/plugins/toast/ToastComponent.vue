<template>
  <transition name="fade">
    <div v-show="isActive" class="v-toast__item" :class="type" @click="dismiss">
      <div class="v-toast__icon"></div>
      <p class="v-toast__text" v-html="message"></p>
    </div>
  </transition>
</template>

<script>
import { removeElement } from './helpers'
export default {
  props: {
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'success',
    },
  },
  data() {
    return {
      isActive: false,
      parent: null,
    };
  },
  beforeMount() {
    this.setupContainer();
  },
  mounted() {
    this.showNotice();
  },
  methods: {
    setupContainer() {
      this.parent = document.querySelector('.v-toast.v-toast--top');
      // No need to create them, they already exists
      if (this.parent) return;

      this.parent = document.createElement('div');
      this.parent.className = 'v-toast v-toast--top';

      const container = document.body;
      container.appendChild(this.parent);
    },

    showNotice() {
      this.parent.insertAdjacentElement('afterbegin', this.$el);
      this.isActive = true;
      setTimeout(() => { this.dismiss() }, 3000);
    },

    dismiss() {
      this.isActive = false;
      // Timeout for the animation complete before destroying
      setTimeout(() => {
        this.$destroy();
        removeElement(this.$el);
      }, 150);
    },
  },
};
</script>

<style>
.v-toast__item {
  font-size: 12px;
  position: fixed;
  top: 5px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
  display: block;
  padding: 16px 20px;
  border-radius: 3px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  width: 250px;
}

.positive {
  background-color: rgb(1, 155, 89);
}

.negative {
  background-color: rgb(216, 77, 77);
}

.info {
  background-color: rgb(37, 102, 215);
}

.v-toast__text {
  color: #fff;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 150ms ease-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
