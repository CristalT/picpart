<template>
<div>
  <header-menu />
  <div class="page wrapper">
    <div class="row">
      <custom-table :data="pictures" :columns="columns" @click="openPicture" />
    </div>
  </div>
</div>
</template>

<script>
import database from '@/database';
import HeaderMenu from '@/components/HeaderMenu.vue';
import CustomTable from '@/components/CustomTable.vue';
import BasicPicture from '@/models/basic-picture';

export default {
  components: {
    HeaderMenu,
    CustomTable,
  },
  data() {
    return {
      pictures: [],
      columns: [
        {
          name: 'Nombre',
          field: 'name',
        },
        {
          name: 'Referencias',
          field: 'points'
        }
      ],
    };
  },
  methods: {
    openPicture(row) {
      this.$router.push(`/picture/${row.id}`);
    },
  },
  async mounted() {
    this.$loading(true);
    database.get('pictures').then((response) => {
      this.pictures = response.data.filter((picture) => picture.name).map((picture) => new BasicPicture(picture));
    }).finally(() => this.$loading(false));
  },
};
</script>
