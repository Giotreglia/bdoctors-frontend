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
            <h2 class="py-3 text-success">Dottori in evidenza</h2>
            <div v-if="this.store.sponsoredDoctors.length > 0" class="d-flex flex-wrap ms-gap">
                
                <div class="ms-col d-flex align-items-stretch " v-for=" doctor  in  this.store.sponsoredDoctors ">
                    <div class="card my_height ">
                        <img v-if="doctor.photo" :src="`${store.baseUrlnoApi}/storage/${doctor.photo}`" class="card-img-top my_image"
                            :alt="`immagine-profilo-di-${doctor.user.name}`">
                        <img v-else src="https://www.diamedica.it/wp-content/uploads/2018/12/dottore-1024x1024.jpg"
                            :alt="`immagine-profilo-di-${doctor.user.name}`">
                        <div class="card-body position-relative">
                            <h3 class="card-title">{{ doctor.user.name }} {{ doctor.user.surname }}</h3>
                            <p class="card-text">Indirizzo: {{ doctor.address }}</p>
                            <div class="mb-5">

                                <span class="badge rounded-pill text-bg-success fs-6 me-2 my-2 d-inline-block" v-for="specialization in doctor.specializations">{{specialization.name }}</span>
                                    
                            </div>
                            <router-link :to="{ name: 'doctor_page', params: { slug: doctor.slug } }"
                                class="btn ms-bg-primary position-absolute my_position">Vedi dettaglio Dottore</router-link>
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
    @import '../styles/partials/_variables.scss';

    .ms-bg-primary {
        background-color: $primary-color;
    }
    .ms-bg-primary:hover {
        background-color: darkgoldenrod;
    }
    .ms-gap {
        gap: 12px;
    }

    .ms-col {
        width: calc((100% / 4) - 12px);
    }

    .my_position {
        bottom: 10px;
        left: 10px;
    }

    .my_image {
        height: 310px;
        object-fit: cover;
    }

    @media screen and (max-width: 1200px) {
    .ms-col {
        width: calc((100% / 2) - 12px);
        .my_height {
            width: 100%;
        }
        .my_image {
            width: 100%;
        }
    }

    @media screen and (max-width: 767px) {
    .ms-col {
        width: 100%;
        .my_height {
            width: 100%;
        }
        .my_image {
            width: 100%;
        }
    }
}


    
}
</style>