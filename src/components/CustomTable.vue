<template>
  <table class="custom__table">
    <thead>
      <tr v-if="columns.length">
        <td v-for="col of columns" :key="col.field">{{ col.name }}</td>
      </tr>
    </thead>
    <tbody v-if="!loading">
      <tr v-for="(row, index) of rows" :key="index" @click="emitClick(row)">
        <td v-for="(cel, index) in row" :key="index">{{ cel }}</td>
      </tr>
    </tbody>
    <tbody v-else>
      <tr>
        <td :colspan="columns.length">
          <loading-spinner />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import LoadingSpinner from '@/components/LoadingSpinner.vue';

export default {
  components: { LoadingSpinner },
  props: {
    data: {
      type: Array,
      required: true,
    },
    columns: Array,
    loading: Boolean,
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
      const selectedRow = this.data.find((item) =>
        Object.values(row).every((val) => Object.values(item).includes(val))
      );
      this.$emit('click', selectedRow);
    },
  },
};
</script>

<style scoped>
.custom__table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
}

.custom__table thead {
  border-left: 1px solid rgb(26, 156, 128);
  border-right: 1px solid rgb(26, 156, 128);
  background-color: rgb(26, 156, 128);
}
.custom__table thead tr td {
  color: #fff;
  padding: 8px;
  font-size: 13px;
  font-weight: bold;
}
.custom__table tbody tr td {
  border-bottom: 1px solid #ccc;
  padding: 10px 14px;
  cursor: pointer;
}
.custom__table tbody tr {
  transition: all 0.3s ease;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
}
.custom__table tbody tr:hover {
  background-color: #eee;
}
</style>
