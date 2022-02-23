<template>
  <div class="page">
    <div class="row">
      <file-uploader @change="pic.img = $event" />
      <button class="btn" @click="save">Guardar</button>
      <router-link class="btn" to="/">Salir</router-link>
    </div>
    <div class="row">
      <div class="col">
        <input type="text" class="form-input" v-model="pic.name" placeholder="Nombre del despiece">
        <div
          class="img-crop"
          @mousemove="watchCoordinates"
          @click="catchCoordinates"
        >
          <img v-if="pic.img" :src="pic.img" />
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
      },
      points: [],
      selectedPoint: {},
      selectedTool: 'add',
    };
  },
  methods: {
    save() {
      const payload = {
        ...this.pic,
        ...this.points,
      }
      alert(JSON.stringify(payload));
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
  transition: all .5s ease;
}
.point:hover {
  width: 40px;
  height: 40px;
  transform: translate(-20px, -20px)
}
.point .point-dot {
  position: relative;
  width: 8px;
  height: 8px;
  border-radius: 16px;
  background-color: rgb(255, 0, 204);
}
</style>
