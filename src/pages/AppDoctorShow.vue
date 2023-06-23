<script>
import { store } from '../store.js';
import axios from 'axios';

export default {
    name: 'AppDoctorList',
    data() {
        return {
            store,
            doctor: null,
        }
    },
    mounted() {
        const slug = this.$route.params.slug;

        axios.get(`${this.store.baseUrl}/doctors/${slug}`)
            .then(response => {
                if (response.data.success == true) {
                    this.doctor = response.data.doctor;
                    console.log(this.doctor);


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
            <div class="col-10">
                <div class="card rounded-5 bg-info-subtle">

                    <div v-if="doctor" class="card-body text-center card-single">
                        <img v-if="doctor.photo" :src="`${store.baseUrlnoApi}/storage/${doctor.photo}`"
                            class="card-img-top" :alt="`immagine-profilo-di${doctor.user.name}`">
                        <img v-else src="https://www.diamedica.it/wp-content/uploads/2018/12/dottore-1024x1024.jpg" :alt="`immagine-profilo-di${doctor.user.name}`">
                        <h1 class="card-title mt-3">{{ doctor.user.name }} {{ doctor.user.surname }}</h1>
                        <h4 class="card-title text-center mb-3">Slug: {{ doctor.slug }}</h4>
                        <h4 class="card-title text-center mb-3">Indirizzo: {{ doctor.address }}</h4>
                        <h4 class="card-title text-center mb-3">Email: {{ doctor.user.email }}</h4>
                        <h4 class="text-center mb-4"> Telefono: {{ doctor.phone }}</h4>
                        <h4 class="text-center mb-4"> Curriculum: {{ doctor.curriculum }}</h4>
                    </div>

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
</style>