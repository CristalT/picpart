<template>
  <table class="custom__table">
    <thead>
      <tr v-if="columns.length">
        <td v-for="col in columns" :key="col.field">{{ col.name }}</td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) of rows" :key="index" @click="emitClick(row)">
        <td v-for="(cel, index) in row" :key="index">{{ cel }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
    columns: Array,
  },
  computed: {
    rows() {
      return this.data.map((item) => {
        const obj = {};
        this.columns.forEach((col) => {
          obj[col.field] = item[col.field];
        });
        return obj;
      });
    },
  },
  methods: {
    emitClick(row) {
      const selectedRow = this.data.find((item) => Object.values(row).every((val) => Object.values(item).includes(val)));
      this.$emit('click', selectedRow);
    },
  },
};
</script>

<style scoped>
.custom__table {
  width: 100%;
  border-collapse: collapse;
}

.custom__table thead {
  border-bottom: 1px solid #555;
}
.custom__table thead tr td {
  padding: 8px;
  font-size: 14px;
  font-weight: bold;
}
.custom__table tbody tr td {
  border-bottom: 1px solid #ccc;
  padding: 10px 14px;
  cursor: pointer;
}
.custom__table tbody tr {
  transition: all 0.3s ease;
}
.custom__table tbody tr:hover {
  background-color: #eee;
}
</style>
