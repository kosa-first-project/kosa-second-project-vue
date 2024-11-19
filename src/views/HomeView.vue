<template>
  <div id="app" style="margin: none; padding: none;">
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
