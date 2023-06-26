<script>
export default {
    name: "AppHeader",
    data() {
        return {
            linksMenu: [
                {
                    label: 'Registrati',
                    routeName: 'http://127.0.0.1:8000/register'
                },
                {
                    label: "Accedi all'area personale",
                    routeName: 'http://127.0.0.1:8000/login'
                }
            ],

        }
    }
}    
</script>
<template>
    <nav class="my-color navbar fixed-top">
        <div class="container-fluid my-color d-flex justify-content-between align-items-center px-4">
            <router-link :to="{ name: 'home' }" class="navbar-brand">BDoctors</router-link>

            <div class="dropdown">
                <button id="area-personale" class="btn btn-success dropdown-toggle" type="button" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    Sei un professionista sanitario?
                </button>
                <ul class="dropdown-menu">
                    <li v-for="link in  linksMenu "><a class="dropdown-item" :href="link.routeName">{{ link.label }}</a>
                    </li>

                </ul>
            </div>
        </div>
    </nav>
</template>

<style lang="scss" scoped>
@import '../styles/partials/_variables.scss';

.my-color {
    height: 70px;
    width: 100%;
    background-color: white;
}

@media all and (max-width: 500px) {
    #area-personale {
        width: 200px;
    }
}
</style>
