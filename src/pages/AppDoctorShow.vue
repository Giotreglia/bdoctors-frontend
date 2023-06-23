<script>
    import { store } from '../store.js';
    import axios from 'axios';

    export default {
        name: 'AppDoctorList',
        data() {
            return {
                store,
            }
        },
        mounted() {
                const slug = this.$route.params.slug;
                
                axios.get(`${this.store.baseUrlnoApi}/api/doctors/${slug}`)
                    .then(response => {
                        console.log(response);
                        if(response.data.success == true) {
                            this.store.doctor = response.data.doctor;
                            console.log(this.store.doctor);
                            

                        }
                    })
        
        }
    }
    
</script>

<template>
    
</template>

<style lang="scss" scoped>

</style>