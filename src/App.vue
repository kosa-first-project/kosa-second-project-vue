<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="main-container" id="app">
    <RouterView />
    <!-- <router-view /> -->
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {
  #app {
      display: grid;
      grid-template-columns: auto;
  }
}
</style>

export default {
  name: "App",
};
