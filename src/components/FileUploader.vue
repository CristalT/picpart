<template>
  <div class="btn file-uploader" @click="openBrowser">
    <span>Seleccionar imagen</span>
    <input type="file" ref="inputFile" @change="readImage" />
  </div>
</template>

<script>
export default {
  name: 'FileUploader',
  methods: {
    openBrowser() {
      this.$refs.inputFile.click();
    },
    readImage(evt) {
      const file = evt.target.files[0];

      const fileReader = new FileReader(file);
      fileReader.onload = (evt) => {
        this.$emit('change', evt.target.result);
      };
      fileReader.readAsDataURL(file);
    },
  }
}
</script>

<style scoped>
.file-uploader input {
  display: none;
}
</style>