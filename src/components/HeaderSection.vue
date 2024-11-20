<template>
  <header class="main_menu">
    <div class="main_menu_iner">
      <div class="container">
        <nav
          class="navbar navbar-expand-lg navbar-light justify-content-between"
        >
          <a class="navbar-brand" href="/home">
            <img src="@/assets/img/logo.png" alt="logo" />
          </a>
          <button class="navbar-toggler" @click="toggleMenu" type="button">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div :class="{ 'collapse navbar-collapse': true, show: isMenuOpen }">
            <ul class="navbar-nav">
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  role="button"
                  data-toggle="dropdown"
                  >여행 계획</a
                >
                <div class="dropdown-menu">
                  <span class="dropdown-item" @click="goToSchedule">
                      <RouterLink to="/schedule">여행 계획 리스트 보기</RouterLink></span>
                </div>
              </li>
              <li class="nav-item">
                <span class="dropdown-item">
                  <RouterLink to="/Guide">가이드</RouterLink></span>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  role="button"
                  data-toggle="dropdown"
                  >마이페이지</a
                >
                <div class="dropdown-menu">
                  <span class="dropdown-item">
                    <RouterLink to="/mypageguide">가이드 등록하기</RouterLink></span>
                </div>
              </li>
              <li class="nav-item">
                <span class="nav-link">
                  <RouterLink to="/board">후기</RouterLink>
                </span>
              </li>
            </ul>
            <button
              class="btn btn-primary create-plan-btn"
              @click="createSchedule" href="/create"
            >
              새 여행계획 생성하기
            </button>
            <div
              id="headerLogin"
              class="d-flex"
              v-html="headerLoginContent"
            ></div>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router= useRouter(); // Use Vue Router composable

// Reactive state
const isMenuOpen = ref(false);
const headerLoginContent = ref("");

// Toggle menu visibility
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

// Navigate to /schedule
const goToSchedule = () => {
  console.log("Navigated to schedule");
  router.push("/schedule")
};

const createSchedule = () => {
  console.log("Navigated to create");
  router.push("/create")
};
</script>
