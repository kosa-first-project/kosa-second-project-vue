<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
<!--   
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="sun did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header> -->
  <div id="app">
    <div class="main-container">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>


/* 브라우저 기본 스타일 초기화 */
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

/* 부모 요소가 반드시 100% 높이를 차지하도록 설정 */
#app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 화면 전체를 항상 차지하게 설정 */
  width: 100vw; /* 화면 전체 넓이를 항상 차지하도록 설정 */
}

/* 자식 요소 중앙 정렬 */
.main-container {
  display: flex;
  justify-content: center; /* 가로 중앙 */
  align-items: center; /* 세로 중앙 */
  text-align: center;
  min-width: 300px; /* 최소 넓이 설정 */
  min-height: 200px; /* 최소 높이 설정 */
  padding: 20px;
  box-sizing: border-box;
  background-color: #f8f9fa; /* 배경색 추가 */
}


/* 
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
} */
</style>
