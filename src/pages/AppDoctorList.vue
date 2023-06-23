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
                    this.store.doctors = response.data.results;
                    console.log(response.data.results);
                })
        }
    },
    mounted() {
        this.getDoctors();
    }
}





</script>

<template>
    <h2>ciao</h2>
</template>

<style lang="scss" scoped>
@import '../styles/partials/_variables.scss';
</style>
