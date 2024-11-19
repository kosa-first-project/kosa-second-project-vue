<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <router-link class="navbar-brand" :to="{ name: 'Home' }"
          >Home</router-link>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'boardList' }"
                >게시판</router-link>
            </li>
          </ul>
        </div>
        </div>
    </nav>
    <Modal
      v-show="showModal"
      :message="showMessage"
      :modalId="'confirmModal'"
      @is-confirmed="onQuit"
    />
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';
  import Modal from '@/components/common/Modal.vue';
  
  const router = useRouter();
  const showModal = ref(false);
  const showMessage = ref('');
  </script>
  
  <style></style>
  