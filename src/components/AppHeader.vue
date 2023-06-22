<script>
    export default {
        name: "AppHeader",
        data() {
            return {
                linksMenu: [
                {
                    label: 'Login',
                    routeName: 'login'
                }]
            }
        }
    }    
</script>
<template>
    <nav class="my-color navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">BDoctors</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="my_collapse collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mb-2 mb-lg-0 w-100 d-flex justify-content-between">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item" v-for="link in linksMenu">
            <a href="" class="nav-link active">{{link.label}}</a>
        </li>
        
      </ul>
    </div>
  </div>
</nav>
</template>

<style lang="scss" scoped>
    .my-color {
        height: 70px;
        position: fixed;
        width: 100%;
    }

</style>
