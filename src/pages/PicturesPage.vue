<template>
  <div class="page">
    <div class="row">
      <router-link class="btn" to="picture">Nueva imagen</router-link>
    </div>
    <div class="row">
      <custom-table :data="pictures" :columns="columns" @click="openPicture" />
    </div>
  </div>
</template>

<script>
import database from '@/database';
import CustomTable from '@/components/CustomTable.vue';
import BasicPicture from '@/models/basic-picture';

export default {
  components: {
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
    database.get('pictures').then((response) => {
      this.pictures = response.data.filter((picture) => picture.name).map((picture) => new BasicPicture(picture));
    });
  },
};
</script>
