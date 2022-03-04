<template>
  <div
    ref="scrollArea"
    class="scrollarea-container"
    :class="`scroll-${size}`"
    :style="propStyle"
    @click="$emit('click', $event)">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'ScrollArea',
  props: {
    backgroundColor: {
      type: String,
      default: 'transparent',
    },
    height: {
      type: [String, Number],
      default: '100%',
    },
    scrollTop: {
      type: Number,
      default: 0,
    },
    size: {
      type: String,
      default: 'sm',
    },
  },
  computed: {
    propStyle() {
      return {
        height: typeof this.height === 'string' ? this.height : `${this.height}px`,
        backgroundColor: this.backgroundColor,
      };
    },
  },
  watch: {
    scrollTop(value) {
      if (value) this.$refs.scrollArea.scrollTop = value;
    },
  },
};
</script>
<style lang="scss" scoped>
$sizes: (
  'xl': 14px,
  'lg': 12px,
  'md': 10px,
  'sm': 8px,
  'xs': 6px,
);

.scrollarea-container {
  scroll-behavior: smooth;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;

  @each $name, $size in $sizes {
    &.scroll-#{$name} {
      &::-webkit-scrollbar-thumb,
      &::-webkit-scrollbar {
        width: $size;
      }
    }
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
  }

  &:hover::-webkit-scrollbar-thumb {
    background-color: lighten(grey, 30%);
    transition: background 0.5s ease;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: grey;
  }
}
</style>
