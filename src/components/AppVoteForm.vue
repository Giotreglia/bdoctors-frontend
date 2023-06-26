<script>
import { store } from '../store.js';
import axios from 'axios';

export default {
    name: 'AppVoteForm',
    props: ['doctor'],
    data() {
        return {
            store,
            star: "",
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
                star: this.star,
                date: luxon.DateTime.now().toFormat("yyyy-MM-dd"),
                doctor_id: splitslug[splitslug.length - 1]
            }

            axios.post(`${this.store.baseUrl}/api/votes`, payload)
                .then(response => { //200

                    console.log(payload);
                    if (response.data.success) {
                        //resetto il form
                        this.star = '';
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
    <h3>Dai un voto al dottore</h3>
    <div v-if="success" class="alert alert-success" role="alert">
        Grazie del voto!
    </div>

    <form @submit.prevent="sendForm()">
        <div class="mb-3">
            <label for="star" class="form-label">Inserisci Voto</label>
            <input type="star" class="form-control" :class="{ 'is-invalid': errors.star }" id="star" v-model="star">
            <div class="invalid-feedback" v-for="error in errors.star">
                {{ error }}
            </div>
        </div>
        <button type="submit" class="btn btn-primary" :disabled="sending">
            {{ sending ? 'Invio in corso...' : 'Invia voto' }}
        </button>
    </form>
</template>

<style lang="scss" scoped></style>