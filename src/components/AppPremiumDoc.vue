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
        <div v-if="this.store.sponsoredDoctors.length > 0" class="d-flex flex-wrap ms-gap">

            <div class="ms-col d-flex align-items-stretch " v-for=" doctor  in  this.store.sponsoredDoctors ">
                <div class="card my_height border border-4">
                    <span class="ms_badge text-bg-success position-absolute top-0 end-0 p-2">In
                        evidenza <i class="fa-solid fa-star text-warning"></i></span>
                    <img v-if="doctor.photo" :src="`${store.baseUrlnoApi}/storage/${doctor.photo}`"
                        class="card-img-top my_image" :alt="`immagine-profilo-di-${doctor.user.name}`">
                    <img v-else class="card-img-top my_image"
                        src="https://www.diamedica.it/wp-content/uploads/2018/12/dottore-1024x1024.jpg"
                        :alt="`immagine-profilo-di-${doctor.user.name}`">
                    <div class="card-body position-relative">
                        <h3 class="card-title">{{ doctor.user.name }} {{ doctor.user.surname }}</h3>
                        <div class="badge rounded-pill text-bg-success fs-6 me-2 my-2 d-inline-block"
                            v-for="specialization in doctor.specializations">{{ specialization.name }}</div>
                        <div>
                            <span class="card-title" v-if="doctor.review_count != 0">N. recensioni: {{
                                doctor.review_count
                            }}
                            </span>
                            <span class="card-title d-block" v-else>Nessuna recensione</span>
                        </div>
                        <div v-if="doctor.average_stars != 0">
                            <span class="card-title">Media Voti:</span>
                            <div class="btn-outline-dark">
                                <i class="fa-solid fa-star text-warning" v-for=" littlestar  in  doctor.average_stars"></i>
                                <i class="fa-regular fa-star text-warning"
                                    v-for=" littlestar  in  (5 - doctor.average_stars)"></i>
                            </div>
                        </div>
                        <span class="card-title d-block" v-else>Nessuna votazione</span>
                        <p class="card-text mb-5">Indirizzo: {{ doctor.address }}</p>
                        <router-link :to="{ name: 'doctor_page', params: { slug: doctor.slug } }"
                            class="btn ms-bg-primary position-absolute my_position">Vedi dettaglio Dottore</router-link>
                    </div>
                </div>
            </div>
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

.my_height {
    width: 100%;
}

.ms_badge {
    border-bottom-left-radius: 12px;
    border-top-right-radius: 6px;
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
                height: 514px;
            }
        }
    }



}
</style>