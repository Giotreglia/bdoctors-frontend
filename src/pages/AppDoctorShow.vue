<script>
import { store } from '../store.js';
import axios from 'axios';
import AppReviewForm from '../components/AppReviewForm.vue';
import AppVoteForm from '../components/AppVoteForm.vue';
import AppMessageForm from '../components/AppMessageForm.vue'

export default {
    name: 'AppDoctorShow',

    data() {
        return {
            store,
            doctor: null,
            stats: null
        }
    },
    components: {
        AppReviewForm,
        AppVoteForm,
        AppMessageForm
    },
    mounted() {
        const slug = this.$route.params.slug;

        axios.get(`${this.store.baseUrl}/doctors/${slug}`)
            .then(response => {
                if (response.data.success == true) {
                    this.doctor = response.data.doctor;
                    this.stats = response.data;
                    console.log(this.stats.average_stars);


                } else {
                    this.$router.push({ name: 'not-found' });
                }
            })

    }
}

</script>

<template>
    <div class="container">
        <div class="row py-5">
            <div id="my-container" class="col-10 m-auto">
                <div class="">

                    <div v-if="doctor" class="card-body text-center card-single">
                        <img v-if="doctor.photo" :src="`${store.baseUrlnoApi}/storage/${doctor.photo}`" class="card-img-top"
                            :alt="`immagine-profilo-di${doctor.user.name}`">
                        <img v-else src="https://www.diamedica.it/wp-content/uploads/2018/12/dottore-1024x1024.jpg"
                            :alt="`immagine-profilo-di${doctor.user.name}`">
                        <h1 class="card-title mt-3 name-surname">Dr. {{ doctor.user.name }} {{ doctor.user.surname }}</h1>
                        <span class="badge rounded-pill text-bg-success fs-6 m-2 d-inline-block"
                            v-for="specialization in doctor.specializations">{{
                                specialization.name }}</span>

                        <div class="card-title text-center pt-2">
                            <h5 class="card-title py-2" v-if="stats.review_count != 0">N. recensioni: {{ stats.review_count
                            }}</h5>
                            <h5 class="card-title py-2" v-else>Nessuna recensione</h5>
                            <div class="py-2" v-if="stats.average_stars != 0">
                                <h5 class="card-title">Media Voti:</h5>
                                <div class="btn-outline-dark">
                                    <i class="fa-solid fa-star text-warning"
                                        v-for=" littlestar  in  stats.average_stars"></i>
                                    <i class="fa-regular fa-star text-warning"
                                        v-for=" littlestar  in  (5 - stats.average_stars)"></i>
                                </div>
                            </div>
                            <h5 class="card-title py-2" v-else>Nessuna votazione</h5>
                            <i class="fa-solid fa-location-dot"></i>
                            <h5 class="d-inline-block">Indirizzo:</h5> {{ doctor.address }}
                        </div>
                        <div class="card-title text-center pt-2">
                            <i class="fa-solid fa-envelope"></i>
                            <h5 class="d-inline-block">Email:</h5> {{ doctor.user.email }}
                        </div>
                        <div class="text-center py-2">
                            <i class="fa-solid fa-phone"></i>
                            <h5 class="d-inline-block">Telefono:</h5> {{ doctor.phone }}
                        </div>
                        <div class="text-center">
                            <i class="fa-solid fa-file-pdf"></i>
                            <h5 class="d-inline-block">Curriculum Vitae:</h5> <a
                                :href="`${store.baseUrlnoApi}/storage/${doctor.curriculum}`" target='_blank'>Vedi
                                curriculum</a>
                        </div>
                    </div>

                </div>

                <div class="py-5">
                    <AppMessageForm :doctor="doctor">
                    </AppMessageForm>
                </div>

                <div class="py-5">
                    <AppReviewForm :doctor="doctor">
                    </AppReviewForm>
                </div>

                <div>

                    <AppVoteForm :doctor="doctor">
                    </AppVoteForm>
                </div>
            </div>
        </div>

    </div>
</template>

<style lang="scss" scoped>
img {
    width: 250px;
    height: 250px;
    object-fit: cover;
    border-radius: 50%;
}

i {
    padding: 0.5rem;
}

#my-container {
    background-color: white;
    padding: 40px;
    border-radius: 12px;
}
</style>