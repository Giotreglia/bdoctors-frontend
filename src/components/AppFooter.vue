
<script>
export default {
    name: "AppFooter",
    data() {
        return {
            servicesLinks: ["Privacy e cookies", "Chi siamo", "Contatti", "Lavoro"],
            patientsLinks: ["Dottori", "Medici di base", "Chiedi al dottore", "Strutture"],
            doctorsLinks: ["Prezzi", "Area professionisti", "Risorse greatuite", "Assistenza"],
            socialIcons: ["facebook-f", "twitter", "linkedin-in", "pinterest"],
        }
    }
}  
</script>

<template>
    <footer class="mt-5">
        <div class="container up d-flex justify-content-between">
            <div class="side links">
                <ul>
                    <li>
                        <h5>Servizi</h5>
                    </li>
                    <li v-for="link in servicesLinks"><a href="#">{{ link }}</a></li>
                </ul>
            </div>

            <div class="side links">
                <ul>
                    <li>
                        <h5>Per i pazienti</h5>
                    </li>
                    <li v-for="link in patientsLinks"><a href="#">{{ link }}</a></li>
                </ul>
            </div>

            <div class="side links">
                <ul>
                    <li>
                        <h5>Per i professionisti sanitari</h5>
                    </li>
                    <li v-for="link in doctorsLinks"><a href="#">{{ link }}</a></li>
                </ul>
            </div>

            <div class="side info">
                <ul>
                    <li>
                        <h1>BDoctors</h1>
                    </li>
                    <li>BDoctors x Boolean</li>
                    <div>
                        <a href="#" class="d-inline-block border-icon rounded-circle" v-for="social in socialIcons">
                            <i :class="`fa-brands fa-${social}`"></i> </a>
                    </div>
                </ul>
            </div>
        </div>

        <div class="container down text-center">
            <div class="pt-2">Italia</div>
            <div class="text text-secondary py-2">bdoctors 2023 &copy; Prenota la tua visita online!</div>
        </div>
    </footer>
</template>

<style lang="scss" scoped>
.container.up {
    border-bottom: 1px solid lightgrey;

    li {
        list-style: none;
    }

    a {
        text-decoration: none;
        color: grey;

        &:hover {
            text-decoration: underline;
        }
    }

    .border-icon {
        width: 28px;
        height: 28px;
        border: 1px solid #d0d0d0;
        margin: 3px;
        position: relative;
        background-color: #d0d0d0;

        &:hover {
            background-color: grey;
        }

        i {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: white;
            font-size: 1rem;
        }
    }

}

.container.down {
    .text {
        font-size: 14px;
    }
}


@media screen and (max-width: 768px) {
    .container.up {
        display: block;

        .side {
            width: 50%;
            text-align: center;
        }

        h5 {
            padding-top: 0.5rem;
        }

    }
}


@media screen and (max-width: 576px) {
    .container.up {
        flex-direction: column;

        .side {
            margin: auto;
            text-align: center;
        }

        h5 {
            padding-top: 0.5rem;
        }

    }
}
</style>