<template>
  <div class="page">
    <div class="row">
      <file-uploader @change="setImage" />
      <button class="btn" @click="reset">Reiniciar</button>
      <button class="btn" @click="save">Guardar</button>
      <router-link class="btn" to="/">Salir</router-link>
    </div>
    <div class="row">
      <div class="col">
        <input type="text" class="form-input" v-model="pic.name" placeholder="Nombre del despiece" />
        <div id="img-container" class="img-crop">
          <button class="btn fix-img" @click="imgFixed = !imgFixed">
            {{ imgFixed ? 'Mover Imagen' : 'Fijar Imagen' }}
          </button>
          <div class="point-layout" v-if="imgFixed" @mousemove="watchCoordinates" @click="catchCoordinates">
            <ul>
              <li
                v-for="(point, index) of points"
                :key="index"
                class="point"
                :class="{ 'active-point': selectedPoint === points[index] }"
                :style="{
                  top: point.offsetY + 'px',
                  left: point.offsetX + 'px',
                }"
                @click="openPoint(index)"
              >
                <div class="point-dot"></div>
              </li>
            </ul>
          </div>
        </div>
        <textarea
          ref="descriptionTextarea"
          v-model="selectedPoint.description"
          class="form-input"
          placeholder="Ingrese descripción"
        ></textarea>
      </div>
      <div class="col">
        <studio-toolbar @select="selectedTool = $event" />
      </div>
    </div>
  </div>
</template>

<script>
import FileUploader from '@/components/FileUploader.vue';
import StudioToolbar from '@/components/StudioToolbar.vue';
import MovableElement from '@/models/movable-element';

import { add } from '@/firebase.js';
export default {
  components: { StudioToolbar, FileUploader },
  data() {
    return {
      coor: {
        offsetX: 0,
        offsetY: 0,
      },
      pic: {
        img: '',
        name: '',
        position: {},
      },
      points: [],
      selectedPoint: {},
      selectedTool: 'add',
      movable: null,
      imgFixed: false,
    };
  },
  watch: {
    'movable.elementPosition': function (values) {
      this.pic.position = { ...values };
    },
  },
  methods: {
    setImage(dataURL) {
      const img = document.createElement('img');
      const imgContainer = document.getElementById('img-container');
      img.src = dataURL;
      this.movable = new MovableElement(img);
      imgContainer.appendChild(img);
    },
    async save() {
      this.$loading(true);
      const data = {
        ...this.pic,
        ...this.points,
      };
      try {
        await add('pictures', data);
        this.$toast.positive('Referencia guardada correctamente.');
      } catch (error) {
        this.$toast.negative('Ocurrió un error al guardar la referencia.');
      } finally {
        this.$loading(false);
      }
    },
    watchCoordinates(evt) {
      const { offsetX, offsetY } = evt;
      this.coor = { offsetX, offsetY };
    },
    catchCoordinates() {
      if (this.selectedTool !== 'add') return;
      this.selectedPoint = { description: '', ...this.coor };
      this.points.push(this.selectedPoint);
      this.$refs.descriptionTextarea.focus();
    },
    openPoint(index) {
      if (this.selectedTool !== 'edit') return;
      this.selectedPoint = this.points[index];
      this.$refs.descriptionTextarea.focus();
    },
    reset() {
      if(confirm('Se perderán los cambios, ¿desea continuar?')) {
        this.points = [];
      }
    }
  },
};
</script>

<style scoped>
ul {
  list-style: none;
}
.studio {
  display: flex;
}
.img-crop {
  margin: 5px 0 5px 0;
  position: relative;
  height: 600px;
  width: 800px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: #eee;
  border-radius: 6px;
  z-index: 0;
}
.img-crop img {
  width: 100%;
}
.point-layout {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.point {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background-color: rgba(216, 15, 176, 0.44);
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
  background-color: rgb(255, 0, 204);
}
.fix-img {
  z-index: 2;
  position: absolute;
  top: 5px;
  right: 5px;
}
</style>
