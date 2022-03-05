<template>
  <div class="page flex align-center">
    <div class="container">
      <color-palette class="color-palette" @color="selectedColor = $event" />
      <div class="row">
        <div class="col">
          <img-settings
            ref="imgSettings"
            :title="name"
            :is-locked="imgFixed"
            :editable="!$route.params.id"
            @image="setImage"
            @lock="imgFixed = $event">
            <div class="point-layout" v-if="imgFixed" @mousemove="watchPointCoordinates" @click="catchPointCoordinates">
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
                  @click="openPoint(index)">
                  <div class="point-dot" :style="{ backgroundColor: `rgb(${selectedColor})` }"></div>
                </li>
              </ul>
            </div>
          </img-settings>

          <input
            :disabled="!selectedPoint.offsetX || !selectedPoint.offsetY"
            ref="descriptionTextarea"
            v-model="selectedPoint.description"
            class="form-input point-description"
            placeholder="Ingrese descripción de la referencia" />
          <div class="row justify-between gral-options">
            <div>
              <button class="btn mr-sm" @click="reset" v-if="!$route.params.id">Reiniciar</button>
              <router-link class="btn" to="/">Salir</router-link>
            </div>
            <div>
              <button class="btn btn-default" @click="save" v-if="!$route.params.id">
                Guardar
              </button>
            </div>
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
        dimension: {},
      },
      points: [],
      selectedPoint: {},
      selectedColor: null,
      movable: null,
      imgFixed: false,
      isEditing: false,
    };
  },
  mounted() {
    window.app.$on('pic', (val) => {
      this.pic.src = val.src,
      this.pic.position = { left: val.left, top: val.top }
      this.pic.dimension = { width: val.width }
    })
  },
  methods: {
    setImage({ dataURL, movableElement }) {
      this.movable = movableElement;
      this.pic.src = dataURL;
    },
    async save() {
      const name = prompt('Nombre de archivo:');
      if (!name) return;
      this.$loading(true, { text: 'Guardando ...' });
      const data = {
        name,
        picture: this.pic,
        points: this.points,
      };
      try {
        await database.store('pictures', data);
        this.$toast.positive('Referencia guardada correctamente.');
      } catch (error) {
        this.$toast.negative('Ocurrió un error al guardar la referencia.');
      } finally {
        this.$loading(false);
        this.$router.push('/');
      }
    },
    watchPointCoordinates(evt) {
      const { offsetX, offsetY } = evt;
      this.coor = { offsetX, offsetY };
    },
    catchPointCoordinates() {
      if (!this.selectedColor || this.isEditing || this.$route.params.id) return;
      this.selectedPoint = { description: '', ...this.coor };
      this.points.push(this.selectedPoint);
      this.$refs.descriptionTextarea.focus();
    },
    openPoint(index) {
      this.isEditing = true;
      this.selectedPoint = this.points[index];
      this.$refs.descriptionTextarea.focus();
    },
    reset() {
      if (confirm('Se perderán los cambios, ¿desea continuar?')) {
        this.points = [];
      }
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
