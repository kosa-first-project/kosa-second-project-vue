<template>
  <div class="search-bar">
    <input
      type="text"
      v-model="searchInput"
      placeholder="검색어를 입력하세요"
      @keyup.enter="emitSearch"
    />
    <button @click="emitSearch">검색</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const searchInput = ref('');

const emitSearch = () => {
  // 검색 키워드를 부모로 전달
  emit('handle-search', searchInput.value.trim());
};
</script>

<style scoped>
.search-bar {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
</style>