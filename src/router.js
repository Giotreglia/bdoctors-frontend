import { createRouter, createWebHistory } from "vue-router";
import AppHome from './pages/AppHome.vue';
import AppDoctorList from './pages/AppDoctorList.vue';
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: AppHome
        },
        {
            path: '/doctors',
            name: 'doctor_list',
            component: AppDoctorList
        },

    ]
});

export { router };