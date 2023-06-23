<script>
import { store } from '../store.js';
import axios from 'axios';

export default {
    name: 'AppDoctorList',
    data() {
        return {
            store,
        }
    },
    methods: {
        getDoctors() {
            let url = `${this.store.baseUrl}/doctors?specializations=${this.store.inputSpecialization}&min_stars=${this.store.stars}&min_reviews=${this.store.reviews}`;
            axios.get(url)
                .then(response => {
                    this.store.doctors = response.data.results.data;
                    console.log(response.data.results.data);
                })
        },
        getInputSpec(specialization) {
            this.store.inputSpecialization = specialization;
            console.log(specialization);
        }
    },
    mounted() {
        this.getDoctors();
    }
}





</script>

<template>
    <div class="container">
        <div class="d-flex flex-column gap-3 border border-secondary p-4 rounded mb-4">
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
            <div class="d-flex w-100 justify-content-between">
                <div class="btn-group col-5 d-flex flex-column" role="group" aria-label="Basic radio toggle button group">
                    <h4>Filtra numero recensioni</h4>
                    <div class="d-flex">
                        <div v-for="(vote, i) in 5">
                            <input v-model="store.reviews" type="radio" class="btn-check" name="btnradio"
                                :id="`btnradio${i + 1}`" autocomplete="off" :value="`${i + 1}`" checked>
                            <label class="btn btn-outline-dark" :for="`btnradio${i + 1}`">{{ i + 1 }}</label>
                        </div>
                        <input v-model="store.reviews" type="radio" class="btn-check" name="btnradio" id="btnradio"
                            autocomplete="off" value="0" checked>
                        <label class="btn btn-outline-dark" for="btnradio">All</label>
                    </div>
                </div>
                <div class="btn-group col-5 d-flex flex-column" role="group" aria-label="Basic radio toggle button group">
                    <h4>Filtra per media voto</h4>
                    <div class="d-flex">
                        <div v-for="(star, i) in  5 ">
                            <input v-model="store.stars" type="radio" class="btn-check" name="btnstar"
                                :id="`btnstar${i + 1}`" autocomplete="off" :value="`${i + 1}`" checked>
                            <label class=" btn btn-outline-dark" :for="`btnstar${i + 1}`"><i
                                    class="fa-solid fa-star text-warning" v-for=" littlestar  in  (i + 1) "></i></label>
                        </div>
                        <input v-model="store.stars" type="radio" class="btn-check" name="btnstar" id="btnstar"
                            autocomplete="off" value="0" checked>
                        <label class="btn btn-outline-dark" for="btnstar">All</label>
                    </div>
                </div>
            </div>
            <router-link @click="this.getDoctors()" :to="{ name: 'doctor_list' }" id="search-btn"
                class="btn btn-lg z-3 btn-success m-3" type="button">Cerca</router-link>
        </div>
        <div class="row">
            <div v-if="this.store.doctors.length > 0">
                <div class="col-3" v-for=" doctor  in  this.store.doctors ">
                    <div class="card" style="width: 18rem;">

                        <img v-if="doctor.photo" :src="`${store.baseUrlnoApi}/storage/${doctor.photo}`" class="card-img-top"
                            :alt="`immagine-profilo-di${doctor.user.name}`">
                        <img v-else src="https://www.diamedica.it/wp-content/uploads/2018/12/dottore-1024x1024.jpg"
                            :alt="`immagine-profilo-di${doctor.user.name}`">
                        <div class="card-body">
                            <h5 class="card-title">{{ doctor.user.name }} {{ doctor.user.surname }}</h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk
                                of
                                the
                                card's
                                content.</p>
                            <a href="#" class="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <h1>Non ci sono dottori specialisti</h1>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '../styles/partials/_variables.scss';
</style>
