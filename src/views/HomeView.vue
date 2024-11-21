<template>
  <div id="app" style="margin: none; padding: none;">
    <BannerSection />
    <GuideSection />
  </div>
</template>

<script>
import BannerSection from '../components/BannerSection.vue';
import GuideSection from '../components/GuideSection.vue';

export default {
  components: {
    BannerSection,
    GuideSection,
  },
};
</script>
