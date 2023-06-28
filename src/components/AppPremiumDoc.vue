<script>
    import { store } from '../store.js';
    import axios from 'axios';

    export default {
    name: 'AppPremiumDoc',
    props: ['doctor'],
    data() {
        return {
            store,
            success: false,
            sending: false,
            errors: {},
        }
    }
    }
</script>

<template>
    <div class="row">
            <h2>Dottori in evidenza</h2>
            <div v-if="this.store.sponsoredDoctors.length > 0" class="d-flex flex-wrap justify-content-between ms-gap">
                
                <div class="col-3" v-for=" doctor  in  this.store.sponsoredDoctors ">
                    <div class="card">
                        <img v-if="doctor.photo" :src="`${store.baseUrlnoApi}/storage/${doctor.photo}`" class="card-img-top"
                            :alt="`immagine-profilo-di-${doctor.user.name}`">
                        <img v-else src="https://www.diamedica.it/wp-content/uploads/2018/12/dottore-1024x1024.jpg"
                            :alt="`immagine-profilo-di-${doctor.user.name}`">
                        <div class="card-body">
                            <h5 class="card-title">{{ doctor.user.name }} {{ doctor.user.surname }}</h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk
                                of
                                the
                                card's
                                content.</p>
                            <router-link :to="{ name: 'doctor_page', params: { slug: doctor.slug } }"
                                class="btn ms-bg-primary">Vedi dettaglio Dottore</router-link>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <h1>Non ci sono dottori sponsorizzati</h1>
            </div>
        </div>
</template>

<style lang="scss" scoped>

</style>