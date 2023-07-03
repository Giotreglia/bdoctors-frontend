<script>
import { store } from '../store.js';
import axios from 'axios';

export default {
    name: 'AppVoteForm',
    props: ['doctor'],
    data() {
        return {
            store,
            star: null,
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
                star_id: this.star,
                date: luxon.DateTime.now().toFormat("yyyy-MM-dd"),
                doctor_id: this.doctor.id
            }

            axios.post(`${this.store.baseUrl}/doctors/${this.doctor.id}/stars`, payload)
                .then(response => { //200

                    console.log(payload);
                    if (response.data.success) {
                        //resetto il form
                        this.star = null;
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
        <div class="mb-3 d-flex gap-1">
            <div id="stars" v-for="(star, i) in  5 ">
                <input v-model="this.star" type="radio" class="btn-check" name="btnstar" :id="`btnstar${i + 1}`"
                    autocomplete="off" :value="`${i + 1}`" :class="{ 'is-invalid': errors.star }">
                <label class=" btn btn-outline-dark" :for="`btnstar${i + 1}`"><i class="fa-solid fa-star text-warning"
                        v-for=" littlestar  in  (i + 1) "></i></label>
            </div>
            <div class="invalid-feedback" v-for="error in errors.star">
                {{ error }}
            </div>
        </div>
        <button type="submit" class="btn btn-primary" :disabled="star ? false : true">
            {{ sending ? 'Invio in corso...' : 'Invia voto' }}
        </button>
    </form>
</template>

<style lang="scss" scoped></style>