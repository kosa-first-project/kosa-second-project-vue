<script setup>
import { RouterLink, RouterView, useRoute } from "vue-router";
import Navbar from "@/components/HeaderSection.vue";
import Footer from "@/components/FooterSection.vue";

// 현재 경로 정보를 가져오기 위한 Vue Router composable
const route = useRoute();

// 헤더와 푸터를 숨길 라우트 이름 배열
const noHeaderFooterRoutes = ["GuideDetail", "GuideForm"];
</script>

<template>
  <div class="main-container">
    <!-- Navbar와 Footer를 특정 경로에서 제외 -->
    <Navbar v-if="!noHeaderFooterRoutes.includes(route.name)" />
    <RouterView />
    <Footer v-if="!noHeaderFooterRoutes.includes(route.name)" />
  </div>
</template>
