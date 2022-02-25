<template>
  <div class="page">
    <router-link to="picture">Nueva imagen</router-link>
  </div>
</template>

<script>
export default {
  mounted() {
    window.api.storePicture()
    const pictures = window.api.getPictures()
    console.log(pictures);
  }
}
</script>