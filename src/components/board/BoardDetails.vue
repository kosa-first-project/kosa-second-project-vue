<template>
  <div class="board-details">
    <h1>{{ board.title }}</h1>
    <p><strong>작성자:</strong> {{ board.nickname }}</p>
    <p><strong>작성일:</strong> {{ board.createDate }}</p>
    <p><strong>내용:</strong> {{ board.content }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getBoardDetails } from '@/api/board.js';

const route = useRoute();
const boardId = route.params.boardId; // URL의 boardId

const board = ref({});

// 게시글 상세 조회
const fetchBoardDetails = async () => {
  try {
    const { data } = await getBoardDetails(boardId);
    board.value = data; // API에서 가져온 게시글 데이터
  } catch (error) {
    console.error('게시글 상세 조회 실패:', error);
  }
};

// 컴포넌트 로드 시 데이터 가져오기
onMounted(fetchBoardDetails);
</script>

<style scoped>
.board-details {
  margin: 20px auto;
  max-width: 800px;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
