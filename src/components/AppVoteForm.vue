<script>
    import { store } from '../store.js';
    import axios from 'axios';
    
    export default {
        name: 'AppReviewForm',
        props: ['doctor'],
        data() {
            return {
                store,
                score: "",
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
                score: this.score,
                date: luxon.DateTime.now().toFormat("yyyy-MM-dd"),
                doctor_id: splitslug[splitslug.length - 1]
            }

            axios.post(`${this.store.baseUrl}/api/votes`, payload)
                .then(response => { //200

                    console.log(payload);
                    if (response.data.success) {
                        //resetto il form
                        this.score = '';
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
    <div v-if="success" class="alert alert-success" role="alert">
            Grazie del voto!
        </div>

        <form @submit.prevent="sendForm()">
            <div class="mb-3">
                <label for="score" class="form-label">Inserisci Voto</label>
                <input type="score" class="form-control" :class="{ 'is-invalid': errors.score }" id="score" v-model="score">
                <div class="invalid-feedback" v-for="error in errors.score">
                    {{ error }}
                </div>
            </div>
            <button type="submit" class="btn btn-primary" :disabled="sending">
                {{ sending ? 'Invio in corso...' : 'Invia recensione' }}
            </button>
        </form>
</template>

<style lang="scss" scoped>

</style>