<script>
import { store } from '../store.js';
import axios from 'axios';

export default {
    name: 'AppDoctorList',
    data() {
        return {
            store,
            stars: 0,
            reviews: 0,
        }
    },
    methods: {
        getDoctors() {
            let url = `${this.store.baseUrl}/doctors?specializations=${this.store.inputSpecialization}&min_stars=${this.stars}&min_reviews=${this.reviews}`;
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
            <router-link @click="this.getDoctors()" :to="{ name: 'doctor_list' }" id="search-btn" class="btn btn-lg z-3"
                type="button">Cerca</router-link>
        </div>
        <div class="row">
            <div v-if="this.store.doctors.length > 0">
                <div class="col-3" v-for="doctor in this.store.doctors">
                    <div class="card" style="width: 18rem;">
                        <img src="..." class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">{{ doctor.user.name }}</h5>
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
