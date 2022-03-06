<template>
  <div>
    <header-menu />
    <div class="page wrapper">
      <div class="row justify-end">
        <input
          type="text"
          class="form-input search-input"
          v-model="terms"
          placeholder="Buscar ..."
          @keyup="search($event.target.value)" />
        <custom-table :loading="loading" :data="pictures" :columns="columns" @click="openPicture" />
      </div>
    </div>
  </div>
</template>

<script>
import database from '@/database';
import HeaderMenu from '@/components/HeaderMenu.vue';
import CustomTable from '@/components/CustomTable.vue';
import BasicPicture from '@/models/basic-picture';

let debounce = null;
export default {
  components: {
    HeaderMenu,
    CustomTable,
  },
  data() {
    return {
      terms: '',
      pictures: [],
      loading: true,
      columns: [
        {
          name: 'Nombre',
          field: 'name',
        },
        {
          name: 'Referencias',
          field: 'points',
        },
      ],
    };
  },
  methods: {
    openPicture(row) {
      this.$router.push(`/picture/${row.id}`);
    },
    search(terms) {
      clearTimeout(debounce);
      debounce = setTimeout(() => {
        this.loading = true;
        const opts = {
          orderByField: 'name',
        };
        if (terms) {
          opts.search = {
            terms,
            field: 'name',
          };
        }
        database
          .get('pictures', opts)
          .then((response) => {
            this.pictures = response.data.filter((picture) => picture.name).map((picture) => new BasicPicture(picture));
          })
          .finally(() => (this.loading = false));
      }, 800);
    },
  },
  async mounted() {
    this.search();
  },
};
</script>

<style scoped>
.search-input {
  margin-bottom: 8px;
  width: 300px;
}
</style>