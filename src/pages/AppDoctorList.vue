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
            let url = `${this.store.baseUrl}/doctors?specializations=${this.store.inputSpecialization}`;
            axios.get(url)
                .then(response => {
                    this.store.doctors = response.data.results.data;
                    console.log(response.data.results.data);
                })
        }
    },
    mounted() {
        this.getDoctors();
    }
}





</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col-3" v-for="doctor in this.store.doctors">
                <div class="card" style="width: 18rem;">
                    <img src="..." class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">{{ doctor.user.name }}</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                            card's
                            content.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '../styles/partials/_variables.scss';
</style>
