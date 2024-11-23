<script setup>
import { useRoute, RouterView } from 'vue-router'
import Navbar from '@/components/HeaderSection.vue';
import Footer from '@/components/FooterSection.vue';

const route = useRoute();

const noHeaderFooterRoutes = ["GuideDetail", "GuideForm"];
</script>

<template>
  <div class="main-container" id="app">
    <Navbar v-if="!noHeaderFooterRoutes.includes(route.name)" />
    <RouterView />
    <Footer v-if="!noHeaderFooterRoutes.includes(route.name)" />
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
