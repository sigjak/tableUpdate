<template>
  <div id="app">
    <div class="hero">
      <div class="figure">
        <img src="./images/header_01.png" alt="IES" />
      </div>
    </div>
    <!-- <div id="nav">
      <router-link :to="{ name: 'update', params: { username: 'Siggi' } }"
        >Update</router-link
      >|
      <router-link :to="{ name: 'tables' }">Tables</router-link>
    </div>-->

    <router-view />
    <!-- <div v-if="updateNow">
      <Update></Update>
    </div>

    <Tables />-->
  </div>
</template>
<script>
export default {}
</script>

<style lang="scss">
//@import '~bulma/css/bulma.css';

//@import '~bulma/bulma.sass';
@import '~bulma/sass/utilities/_all.sass';
@import '~bulma/sass/grid/columns.sass';
@import '~bulma/sass/elements/button.sass';
@import '~bulma/sass/elements/box.sass';
@import '~bulma/sass/elements/title.sass';
@import '~bulma/sass/elements/container.sass';
@import '~bulma/sass/form/_all.sass';
@import '~bulma/sass/base/_all.sass';
@import '~bulma/sass/components/_all.sass';
body {
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url('./images/kfjsm.jpg');
}
// #app {
//   font-family: 'Avenir', Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }
</style>
