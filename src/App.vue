<script>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import { store } from './store';
import axios from 'axios';

export default {
  components: {
    AppHeader,
    AppFooter
  },
  data() {
    return {
      store
    }
  },
  methods: {
    getSpecializations() {
      let url = `${this.store.baseUrl}/specializations`;
      axios.get(url)
        .then(response => {
          this.store.specializations = response.data.results;
          console.log(this.store.specializations);
        })
    }
  },
  mounted() {
    this.getSpecializations();
  }
}
</script>

<template>
  <AppHeader />
  <main>
    <router-view></router-view>
  </main>
  <AppFooter />
</template>

<style lang="scss" scoped>
@import './styles/general.scss';
</style>
