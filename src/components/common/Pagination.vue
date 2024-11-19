<template>
  <div class="pagination">
    <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1">
      이전
    </button>
    <span>Page {{ currentPage }} of {{ pageCount }}</span>
    <button @click="changePage(currentPage + 1)" :disabled="currentPage === pageCount">
      다음
    </button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps(['currentPage', 'pageCount']);
defineEmits(['page-changed']);

const changePage = (page) => {
  if (page >= 1 && page <= pageCount) {
    emit('page-changed', page);
  }
};
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}
</style>