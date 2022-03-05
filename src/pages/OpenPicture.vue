<template>
  <div class="page flex align-center">
    <div class="container">
      <color-palette class="color-palette" @color="selectedColor = $event" />
      <div class="row">
        <div class="col">
          <img-settings
            ref="imgSettings"
            :title="name"
            :is-locked="true"
            :editable="false"
            @image="setImage">
            <div class="point-layout">
              <ul>
                <li
                  v-for="(point, index) of points"
                  :key="index"
                  class="point"
                  :class="{ 'active-point': selectedPoint === points[index] }"
                  :style="{
                    top: point.offsetY + 'px',
                    left: point.offsetX + 'px',
                    backgroundColor: `rgba(${selectedColor}, 0.4)`,
                  }"
                  v-tooltip="point.description">
                  <div class="point-dot" :style="{ backgroundColor: `rgb(${selectedColor})` }"></div>
                </li>
              </ul>
            </div>
          </img-settings>
          <div class="row justify-end gral-options">
              <router-link class="btn" to="/">Salir</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ColorPalette from '@/components/ColorPalette.vue';
import database from '@/database';
import ImgSettings from '@/components/ImgSettings.vue';
export default {
  components: { ColorPalette, ImgSettings },
  data() {
    return {
      coor: {
        offsetX: 0,
        offsetY: 0,
      },
      name: '',
      pic: {
        src: '',
        position: {},
      },
      points: [],
      selectedPoint: {},
      selectedColor: null,
    };
  },
  mounted() {
    const id = this.$route.params.id;
    if (id) this.openPicture(id);
  },
  methods: {
    openPicture(id) {
      this.$loading(true);
      database
        .find('pictures', id)
        .then((data) => {
          this.name = data.name;
          this.points = data.points;
          this.setImage(data.picture);
          this.$refs.imgSettings.setImage(data.picture);
        })
        .finally(() => this.$loading(false));
    },
    setImage(picture) {
      this.pic = picture;
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
}
.color-palette {
  position: absolute;
  right: 24px;
  top: 16px;
}
.point-layout {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  cursor: pointer;
}
.point {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 100%;
  transform: translate(-16px, -16px);
  transition: all 0.5s ease;
}
.point:hover {
  width: 40px;
  height: 40px;
  transform: translate(-20px, -20px);
}
.point .point-dot {
  position: relative;
  width: 8px;
  height: 8px;
  border-radius: 16px;
}
.point-description {
  font-size: 14px;
  margin: 4px 16px;
  width: 765px !important;
}
.gral-options {
  margin: 8px 16px;
  padding-bottom: 16px;
}
</style>
