
<script>
</script>

<template>
    <footer>
        <div class="container up d-flex justify-content-between">
            <div class="side-links" v-for="sides in 3">
                <ul>
                    <li>
                        <h5>title-link</h5>
                    </li>
                    <li><a href="#">link</a></li>
                    <li><a href="#">link</a></li>
                    <li><a href="#">link</a></li>
                    <li><a href="#">link</a></li>
                </ul>
            </div>

            <div class="side-info">
                <ul>
                    <li>
                        <h1>BDoctors</h1>
                    </li>
                    <li>info</li>
                    <li>info</li>
                    <li>info</li>
                    <div>
                        <span v-for="socials in 4"> social </span>
                    </div>
                </ul>
            </div>
        </div>

        <div class="container down text-center">
            <div class="p-3">info</div>
            <div class="text text-secondary">bdoctors 2023 &copy; Prenota la tua visita online!</div>
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

}

.container.down {
    .text {
        font-size: 14px;
    }
}
</style>