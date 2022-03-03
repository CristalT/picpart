<template>
  <div class="modal-wrapper">
    <div class="modal">
      <div class="message">
        {{ message }}
      </div>
      <div class="row gap-xs justify-end">
        <button class="btn" @click="onCancel">Cancel!</button>
        <button class="btn btn-default" @click="onOk">Dale!</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isVisible: false,
    };
  },
  mounted() {
    this.isVisible = true;
  },
  methods: {
    onOk() {
      this.$emit('ok');
      this.leave();
    },
    onCancel() {
      this.$emit('cancel');
      this.leave();
    },
    leave: function () {
      this.isVisible = false;
      this.$destroy();
      this.$el.parentNode.removeChild(this.$el);
    },
  },
};
</script>

<style scoped>
.modal-wrapper {
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-wrapper .modal {
  background-color: #fff;
  padding: 20px;
  box-shadow: 2px 2px 10px rgba(0,0,0,0.5);
  border-radius: 5px;
  width: 400px;
}

.modal .message {
  margin-bottom: 20px;
}
</style>
