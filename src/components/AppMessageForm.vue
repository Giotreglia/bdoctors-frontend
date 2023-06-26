<script>
import { store } from '../store.js';
import axios from 'axios';

export default {
    name: 'AppMessageForm',
    props: ['doctor'],
    data() {
        return {
            store,
            name: '',
            surname: '',
            email: '',
            content: '',
            success: false,
            sending: false,
            errors: {},
        };
    },
    methods: {
        sendForm() {
            this.success = false;
            this.sending = true;
            this.errors = {};

            const payload = {
                name: this.name,
                surname: this.surname,
                email: this.email,
                content: this.content,
                date: luxon.DateTime.now().toFormat('yyyy-MM-dd'),
                doctor_id: this.doctor.id,
            };

            axios
                .post(`${this.store.baseUrl}/messages`, payload)
                .then(response => {
                    console.log(payload);
                    if (response.data.success) {
                        // Reset the form
                        this.name = '';
                        this.surname = '';
                        this.email = '';
                        this.content = '';
                        this.success = true;
                    } else {
                        this.errors = response.data.errors;
                        console.log(this.errors);
                    }

                    this.sending = false;
                })
                .catch(error => {
                    this.sending = false;
                    console.error('Error sending message:', error);
                });
        },
    },
};

</script>


<template>
    <h3>Contatta il dottore</h3>
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
            <label for="surname" class="form-label">Il tuo cognome</label>
            <input type="text" class="form-control" :class="{ 'is-invalid': errors.surname }" id="surname"
                v-model="surname">
            <div class="invalid-feedback" v-for="error in errors.surname">
                {{ error }}
            </div>
        </div>
        <div class="mb-3">
            <label for="content">Il tuo messaggio</label>
            <textarea class="form-control" :class="{ 'is-invalid': errors.content }" id="content"
                v-model="content"></textarea>
            <div class="invalid-feedback" v-for="error in errors.content">
                {{ error }}
            </div>
        </div>
        <button type="submit" class="btn btn-primary" :disabled="sending">
            {{ sending ? 'Invio in corso...' : 'Invia messaggio' }}
        </button>
    </form>
</template>