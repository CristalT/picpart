<template>
  <div class="spinner-wrapper">
    <div class="loader">Loading ...</div>
  </div>
</template>

<script>
export default {
  name: 'LoadingSpinner',
};
</script>
<style scoped>
.spinner-wrapper {
  display: flex;
  width: 100%;
  justify-content: center;
  height: 100px;
}
.loader,
.loader:before,
.loader:after {
  background: rgb(26, 156, 128);
  -webkit-animation: load1 1s infinite ease-in-out;
  animation: load1 1s infinite ease-in-out;
  width: 1em;
  height: 2em;
}
.loader {
  color: rgb(26, 156, 128);
  text-indent: -9999em;
  margin: 44px auto;
  position: relative;
  font-size: 11px;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}
.loader:before,
.loader:after {
  position: absolute;
  top: 0;
  content: '';
}
.loader:before {
  left: -1.5em;
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}
.loader:after {
  left: 1.5em;
}
@-webkit-keyframes load1 {
  0%,
  80%,
  100% {
    box-shadow: 0 0;
    height: 2em;
  }
  40% {
    box-shadow: 0 -2em;
    height: 3em;
  }
}
@keyframes load1 {
  0%,
  80%,
  100% {
    box-shadow: 0 0;
    height: 2em;
  }
  40% {
    box-shadow: 0 -2em;
    height: 3em;
  }
}
</style>