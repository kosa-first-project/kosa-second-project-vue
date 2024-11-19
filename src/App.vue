<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Navbar from '@/components/common/Navbar.vue';
import Footer from '@/components/common/PageFooter.vue';
</script>

<template>
  <div class="main-container">
    <Navbar /> <!-- 네비게이션 바 -->
    <!-- <router-view /> --> <!-- 페이지 이동이 표시될 곳 -->
    <RouterView />
    <Footer /> <!-- 푸터 컴포넌트 -->
  </div>
</template>

<!-- <style scoped>
@media (min-width: 1024px) {
  #app {
      display: grid;
      grid-template-columns: auto;
  }
}
</style>
<template>
  <div id="app">
    <router-view />
  </div>
</template> -->

<script>
export default {
  name: "App",
};
</script>

<!-- <style scoped>
@media (min-width: 1024px) {
  #app {
      display: grid;
      grid-template-columns: auto;
  }
}
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style> -->