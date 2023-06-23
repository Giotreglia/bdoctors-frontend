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
                        if(response.data.success == true) {
                            this.doctor = response.data.doctor;
                            console.log(this.doctor);
                            

                        } else {
                            this.$router.push({name: 'not-found'});
                        }
                    })
        
        }
    }
    
</script>

<template>

    <div v-if="doctor">
        <h3 >{{ doctor['address'] }} v</h3>
        <h3 >{{ doctor['slug'] }} v</h3>
        <h3 >{{ doctor['phone'] }} v</h3>
    </div>
    
</template>

<style lang="scss" scoped>

</style>