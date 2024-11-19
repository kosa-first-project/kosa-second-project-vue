<<<<<<< HEAD
<script setup>
import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template>
=======
<template>
  <div id="app">
    <HeaderSection />
    <BannerSection />
    <GuideSection />
    <FooterSection />
  </div>
</template>

<script>
import HeaderSection from '../components/HeaderSection.vue';
import BannerSection from '../components/BannerSection.vue';
import GuideSection from '../components/GuideSection.vue';
import FooterSection from '../components/FooterSection.vue';

export default {
  components: {
    HeaderSection,
    BannerSection,
    GuideSection,
    FooterSection,
  },
};
</script>
>>>>>>> youngjae3
