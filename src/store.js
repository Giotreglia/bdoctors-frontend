import { reactive } from 'vue';

export const store = reactive(
    {
        baseUrl: 'http://127.0.0.1:8000/api',
        baseUrlnoApi: 'http://127.0.0.1:8000',
        specializations: [],
        inputSpecialization: '',
        doctors: [],
        sponsoredDoctors: [],
        stars: 0,
        reviews: 0,
    }
);