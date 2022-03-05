<template>
  <div>
    <div class="row gap-xs padding-sm" v-if="editable">
      <div class="col">
        <file-uploader :label="img ? 'Cambiar imagen' : 'Seleccionar imagen'" @change="loadImage" />
      </div>
      <div class="col">
        <div class="row gap-xs">
          <button class="btn" :class="{ active: !locked }" @click="lock" :disabled="!img">
            Mover ({{ locked ? 'off' : 'on' }})
          </button>
          <button class="btn" :disabled="locked" @click="zoomIn">Zoom +</button>
          <button class="btn" :disabled="locked" @click="zoomOut">Zoom -</button>
        </div>
      </div>
    </div>
    <div v-else class="title">
      <h1>{{ title }}</h1>
    </div>
    <div class="row">
      <div class="col">
        <div id="canvas" :class="{ 'cursor-move': !locked && img }">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import FileUploader from '@/components/FileUploader.vue';
import MovableElement from '@/models/movable-element';

export default {
  name: 'ImgSettings',
  components: {
    FileUploader,
  },
  props: {
    disabled: Boolean,
    isLocked: {
      type: Boolean,
      default: true,
    },
    editable: Boolean,
    title: String,
  },
  data() {
    return {
      locked: true,
      img: null,
      movable: null,
    };
  },
  watch: {
    isLocked(val) {
      this.locked = val;
    },
  },
  methods: {
    newImageElement(dataURL) {
      const existingPic = document.getElementById('picture');
      if (existingPic) {
        existingPic.parentNode.removeChild(existingPic);
      }

      const img = document.createElement('img');
      img.setAttribute('src', dataURL)
      img.setAttribute('id', 'picture');
      return img;
    },
    loadImage(dataURL) {
      this.img = this.newImageElement(dataURL)
      const imgContainer = document.getElementById('canvas');
      this.movable = new MovableElement(this.img);
      imgContainer.appendChild(this.img);
      this.locked = false;
      this.$emit('image', {
        src: dataURL,
        movable: this.movable,
      });
    },

    /**
     * This method is used on open a picture
     * it hasn't edition abilities.
     */
    setImage(picture) {
      const img = this.newImageElement(picture.src)
      const imgContainer = document.getElementById('canvas');

      img.style.left = picture.position.left;
      img.style.top = picture.position.top;
      img.width = picture.dimension.width;

      this.locked = true;

      imgContainer.appendChild(img);
    },

    lock() {
      this.locked = !this.locked;
      this.$emit('lock', this.locked);
    },
    zoomIn() {
      this.movable.zoom(30);
    },
    zoomOut() {
      this.movable.zoom(-30);
    },
  },
};
</script>

<style scoped>
#canvas {
  margin: 0 16px;
  position: relative;
  height: 600px;
  width: 800px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eee;
  border-radius: 6px;
  z-index: 0;
}
#canvas img {
  width: 100%;
}

.cursor-move {
  cursor: move;
}
.active {
  background-color: rgb(100, 102, 101);
  color: #fff;
}
.title h1 {
  padding: 12px 16px;
  font-size: 30px;
}
</style>
