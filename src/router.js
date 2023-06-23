import { createRouter, createWebHistory } from "vue-router";
import AppHome from './pages/AppHome.vue';
import AppDoctorList from './pages/AppDoctorList.vue';
import AppDoctorShow from './pages/AppDoctorShow.vue';
import AppNotFound from './pages/AppNotFound.vue';

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
        {
            path: '/doctors/:slug',
            name: 'doctor_page',
            component: AppDoctorShow
        },
        {
            path: '/:pathMatch(.)',
            name: 'not-found',
            component: AppNotFound
        }

    ]
});

export { router };