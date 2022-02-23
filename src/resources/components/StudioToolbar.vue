<template>
  <div>
    <ul class="toolbar">
      <li
        class="btn"
        v-for="tool of tools"
        :key="tool.name"
        :class="{ active: selectedTool === tool.name }"
        @click="select(tool.name)"
      >
        <fa-icon :icon="'fa-regular fa-' + tool.icon"></fa-icon>
        {{ tool.label }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'StudioToolbar',
  props: {
    defaultTool: {
      type: String,
      default: 'add',
    },
  },
  data() {
    return {
      selectedTool: '',
      tools: [
        { name: 'add', icon: 'plus-square', label: 'Agrerar' },
        { name: 'edit', icon: 'edit', label: 'Editar' },
      ],
    };
  },
  mounted() {
    this.selectedTool = Object.freeze(this.defaultTool);
  },
  methods: {
    select(toolName) {
      this.selectedTool = toolName;
      this.$emit('select', toolName);
    },
  },
};
</script>

<style scoped>
.toolbar li {
  margin-bottom: 3px;
  width: 100px;
}
.active {
  background-color: black !important;
  color: white !important;
}
</style>
