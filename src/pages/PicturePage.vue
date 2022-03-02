<template>
  <div class="page">
    <div class="container">
      <color-palette class="color-palette" @color="selectedColor = $event" />
      <div class="row">
        <div class="col">
          <img-settings @image="setImage" @lock="imgFixed = $event">
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
                  @click="openPoint(index)"
                  @mouseover="isEditing = true"
                  @mouseout="isEditing = false">
                  <div class="point-dot" :style="{ backgroundColor: `rgb(${selectedColor})` }"></div>
                </li>
              </ul>
            </div>
          </img-settings>

          <input
            :disabled="!selectedPoint.coor"
            ref="descriptionTextarea"
            v-model="selectedPoint.description"
            class="form-input point-description"
            placeholder="Ingrese descripción de la referencia" />
          <div class="row justify-end gap-xs gral-options">
            <button class="btn" @click="reset">Reiniciar</button>
            <button class="btn" @click="save">Guardar</button>
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
      movable: null,
      imgFixed: false,
      isEditing: false,
    };
  },
  watch: {
    'movable.elementPosition': function (values) {
      this.pic.position = { ...values };
    },
  },
  mounted() {
    const id = this.$route.params.id;
    if (id) this.openPicture(id);
  },
  methods: {
    openPicture(id) {
      database.find('pictures', id).then((data) => {
        this.name = data.name;
        this.points = data.points;
        this.setImage(data.picture.src, data.picture.position);
        this.imgFixed = true;
      });
    },
    setImage({ dataURL, movableElement }) {
      this.movable = movableElement;
      this.pic.src = dataURL;
    },

    async save() {
      if (
        !or(
          this.pic.src,
          this.pic.name,
          this.points.every((point) => point.description)
        )
      ) {
        return this.$toast.negative('Faltan completar datos');
      }
      const imgName = prompt('Nombre de archivo:');
      if (!imgName) return;
      this.$loading(true, { text: 'Guardando ...' });
      const data = {
        name: this.name,
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
      }
    },
    watchPointCoordinates(evt) {
      const { offsetX, offsetY } = evt;
      this.coor = { offsetX, offsetY };
    },
    catchPointCoordinates() {
      if (!this.selectedColor || this.isEditing) return;
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
