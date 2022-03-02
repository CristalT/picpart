<template>
  <div>
    <ul class="palette">
      <li
        v-for="(color, index) of palette"
        :key="index"
        :class="{ 'color-active': selectedColor === color }"
        @click="selectColor(color)">
        <div :style="{ backgroundColor: `rgb(${color})` }"></div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ColorPalette',
  data() {
    return {
      palette: ['255, 0, 204', '255, 115, 0', '0, 0, 255', '0, 255, 55', '217, 255, 0', '120, 0, 255'],
      selectedColor: null,
    };
  },
  mounted() {
    this.selectColor(this.palette[0]);
  },
  methods: {
    selectColor(colorValue) {
      this.selectedColor = colorValue;
      this.$emit('color', colorValue);
    },
  },
};
</script>

<style scoped>
.color-active {
  border: 1px solid #555 !important;
  box-shadow: 1px 1px 3px rgb(119, 0, 255);
}
.palette li {
  overflow: hidden;
  width: 25px;
  height: 25px;
  display: inline-table;
  margin: 2px;
  border-radius: 3px;
  border: 1px solid white;
}
.palette li div {
  height: 100%;
  width: 100%;
  cursor: pointer;
}
</style>
