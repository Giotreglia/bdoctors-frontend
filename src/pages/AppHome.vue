<script>
import { store } from '../store.js';
import AppPremiumDoc from '../components/AppPremiumDoc.vue';
import axios from 'axios';

export default {
  name: 'AppHome',
  data() {
    return {
      store,
      doctor: null,
    }
  },
  components: {
    AppPremiumDoc
  },
  methods: {
    getInputSpec(specialization) {
      this.store.inputSpecialization = specialization;
    },
    getSponsoredDoc() {
      let url = `${this.store.baseUrl}/doctors?specializations=&min_stars=0&min_reviews=0&only_sponsored=1`;
      axios.get(url)
        .then(response => {
          this.store.sponsoredDoctors = response.data.results.data;
        }
        )
    },
  },
  mounted() {
    this.getSponsoredDoc();

  }
}

</script>

<template>
  <div id="jumbotron">

    <div class="mb-4 rounded-3">
      <div class="container position-relative">
        <h1 id="titolo-jumbo" class="display-5 fw-bold text-light">Cerca il tuo dottore</h1>
        <span class="fs-4 d-block mb-5">Cerca tra 200 000 Specialisti e Medici di Medicina Generale.</span>
        <div class="jumbo-img position-absolute">
          <img class="h-100" src="/doc1.png" alt="">
        </div>
        <div class="d-flex">
          <div class="input-group input-group-lg" data-bs-toggle="dropdown" aria-expanded="false">
            <span class="input-group-text" id="inputGroup-sizing-lg"><i class="fa-solid fa-magnifying-glass"></i></span>
            <input type="text" class="form-control" aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-lg" placeholder="es. Cardiologo"
              v-model="this.store.inputSpecialization">
            <div class="dropdown w-100">
              <ul class="dropdown-menu w-100">
                <li v-for="( specialization, i ) in  this.store.specializations "><a class="dropdown-item" href="#"
                    @click="this.getInputSpec(specialization.name)">{{
                      specialization.name }}</a></li>
              </ul>
            </div>
          </div>
          <router-link :to="{ name: 'doctor_list' }" id="search-btn" class="btn btn-lg z-3"
            type="button">Cerca</router-link>
        </div>
      </div>
    </div>
  </div>

  <div class="container">
    <AppPremiumDoc :sponsoredDoctors="sponsoredDoctors">

    </AppPremiumDoc>
  </div>
</template>

<style lang="scss" scoped>
@import '../styles/partials/_variables.scss';

#jumbotron {
  background-color: $primary-color;
  padding: 275px 0 70px;
}

#search-btn {
  background-color: $secondary-color;
  color: white;
  border-radius: 0 12px 12px 0;
}

.jumbo-img {
  height: 500px;
  bottom: 0;
  right: 0;
}

@media all and (max-width: 1200px) {
  .jumbo-img {
    height: 400px;
  }
}

@media all and (max-width: 992px) {
  .jumbo-img {
    display: none;
  }

  #jumbotron {
    padding: 150px 0 70px;
  }

  #titolo-jumbo {
    font-size: 60px;
  }
}

@media all and (max-width: 500px) {
  #titolo-jumbo {
    font-size: 60px;
  }

  #jumbotron {
    padding: 150px 0 70px;
  }
}
</style>
