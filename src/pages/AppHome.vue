<script>
export default {
  name: 'AppHome'
}



</script>

<template>
  <div id="jumbotron">

    <div class="mb-4 rounded-3">
      <div class="container position-relative">
        <h1 class="display-5 fw-bold text-light">Cerca il tuo dottore</h1>
        <div class="jumbo-img position-absolute">
          <img class="h-100" src="../../public/doc1.png" alt="">
        </div>
        <span class="fs-4 d-block mb-5">Cerca tra 200 000 Specialisti e Medici di Medicina Generale.</span>
        <div class="input-group input-group-lg">
          <span class="input-group-text" id="inputGroup-sizing-lg"><i class="fa-solid fa-magnifying-glass"></i></span>
          <input type="text" class="form-control" aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-lg" placeholder="es. Cardiologo">
          <button id="search-btn" class="btn btn-lg" type="button">Cerca</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../styles/partials/_variables.scss';

#jumbotron {
  background-color: $primary-color;
  padding: 350px 0 70px;
}

#search-btn {
  background-color: $secondary-color;
  color: white;
}

.jumbo-img {
  height: 500px;
  bottom: 0;
  right: 0;
}
</style>
