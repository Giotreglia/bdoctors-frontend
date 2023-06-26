<script>
import { store } from '../store.js';
import axios from 'axios';

export default {
    name: 'AppReviewForm',
    props: ['doctor'],
    data() {
        return {
            store,
            name: '',
            title: '',
            content: '',
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

            const payload = {
                name: this.name,
                title: this.title,
                content: this.content,
                date: luxon.DateTime.now().toFormat("yyyy-MM-dd"),
                doctor_id: this.doctor.id
            }

            axios.post(`${this.store.baseUrlnoApi}/api/reviews`, payload)
                .then(response => { //200

                    console.log(payload);
                    if (response.data.success) {
                        //resetto il form
                        this.name = '';
                        this.title = '';
                        this.content = '';
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
    }
}

</script>

<template>
    <h3>Lascia una recensione</h3>
    <div v-if="success" class="alert alert-success" role="alert">
        Grazie del feedback!
    </div>

    <form @submit.prevent="sendForm()">
        <div class="mb-3">
            <label for="title" class="form-label">Inserisci titolo</label>
            <input type="title" class="form-control" :class="{ 'is-invalid': errors.title }" id="title" v-model="title">
            <div class="invalid-feedback" v-for="error in errors.title">
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
            <label for="content">La tua recensione</label>
            <textarea class="form-control" :class="{ 'is-invalid': errors.content }" id="content"
                v-model="content"></textarea>
            <div class="invalid-feedback" v-for="error in errors.content">
                {{ error }}
            </div>
        </div>
        <button type="submit" class="btn btn-primary" :disabled="sending">
            {{ sending ? 'Invio in corso...' : 'Invia recensione' }}
        </button>
    </form>
</template>

<style lang="scss" scoped></style>