<script>
import { store } from '../store.js';
import axios from 'axios';

export default {
    name: 'AppDoctorList',
    data() {
        return {
            store,
            doctor: null,
            name: '',
            email: '',
            message: '',
            success: false,
            sending: false,
            errors: {},
        }
    },
    methods: {
        sendForm() {
            this.success = false;
            this.sending = true;
            this.errors = {};

            let splitslug = this.doctor.slug.split('-');
            const payload = {
                name: this.name,
                email: this.email,
                message: this.message,
                date: luxon.DateTime.now().toFormat("yyyy-MM-dd"),
                doctor_id: splitslug[splitslug.length - 1]
            }

            axios.post(`${this.store.baseUrl}/api/messages`, payload)
                .then(response => { //200

                    console.log(payload);
                    if (response.data.success) {
                        //resetto il form
                        this.name = '';
                        this.email = '';
                        this.message = '';
                        this.success = true;
                    } else {
                        this.errors = response.data.errors;
                        console.log(this.errors);
                    }

                    this.sending = false;

                }).catch(error => { //>=400
                    this.sending = false;
                });

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
                        <img v-if="doctor.photo" :src="`${store.baseUrlnoApi}/storage/${doctor.photo}`" class="card-img-top"
                            :alt="`immagine-profilo-di${doctor.user.name}`">
                        <img v-else src="https://www.diamedica.it/wp-content/uploads/2018/12/dottore-1024x1024.jpg"
                            :alt="`immagine-profilo-di${doctor.user.name}`">
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
        <div v-if="success" class="alert alert-success" role="alert">
            Grazie di avermi contattato, ti risponderò entro 48 ore lavorative!
        </div>

        <form @submit.prevent="sendForm()">
            <div class="mb-3">
                <label for="email" class="form-label">La tua email</label>
                <input type="email" class="form-control" :class="{ 'is-invalid': errors.email }" id="email" v-model="email">
                <div class="invalid-feedback" v-for="error in errors.email">
                    {{ error }}
                </div>
            </div>
            <div class="mb-3">
                <label for="name" class="form-label">Il tuo nome</label>
                <input type="text" class="form-control" :class="{ 'is-invalid': errors.name }" id="name" v-model="name">
                <div class="invalid-feedback" v-for="error in errors.name">
                    {{ error }}
                </div>
            </div>
            <div class="mb-3">
                <label for="message">Il tuo messaggio</label>
                <textarea class="form-control" :class="{ 'is-invalid': errors.message }" id="message"
                    v-model="message"></textarea>
                <div class="invalid-feedback" v-for="error in errors.message">
                    {{ error }}
                </div>
            </div>
            <button type="submit" class="btn btn-primary" :disabled="sending">
                {{ sending ? 'Invio in corso...' : 'Invia messaggio' }}
            </button>
        </form>
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