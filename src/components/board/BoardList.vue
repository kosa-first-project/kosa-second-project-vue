<template>
  <div class="container">
    <h1>게시판</h1>
    <!-- 검색 바 -->
    <SearchBar @handle-search="handleSearch" />
    <table class="table">
      <thead>
        <tr>
          <th>No.</th>
          <th>제목</th>
          <th>작성자</th>
          <th>작성일</th>
          <th>조회수</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(board, index) in boards" :key="board.boardId">
          <td>{{ index + 1 }}</td>
          <td>
            <!-- 제목 클릭 시 라우팅 -->
            <router-link :to="{ name: 'BoardDetails', params: { boardId: board.boardId } }">
              {{ board.title }}
            </router-link>
          </td>
          <td>{{ board.nickname }}</td>
          <td>{{ board.createDate }}</td>
          <td>{{ board.views }}</td>
        </tr>
      </tbody>  
    </table>
    <!-- 페이지네이션 -->
    <Pagination :currentPage="params.page" :pageCount="pageCount" @page-changed="goToPage" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { getBoards, getBoardsByKeyword } from '@/api/board.js';

const boards = ref([]);
const params = ref({
  page: 1,
  limit: 5,
  sort: 'boardId',
  order: 'desc',
});
const keyword = ref('');
const totalCount = ref(0);

// 게시글 가져오기
const fetchBoards = async () => {
  try {
    const response = keyword.value
      ? await getBoardsByKeyword(
          params.value.page,
          params.value.limit,
          keyword.value,
          params.value.sort,
          params.value.order
        )
      : await getBoards(
          params.value.page,
          params.value.limit,
          params.value.sort,
          params.value.order
        );

    boards.value = response.data; // 게시글 리스트
    totalCount.value = response.headers['x-total-count'] || 0; // 전체 데이터 개수 (백엔드가 헤더에 추가했다면)
  } catch (error) {
    console.error('Failed to fetch boards:', error);
  }
};

// 페이지네이션 계산
const pageCount = computed(() => Math.ceil(totalCount.value / params.value.limit));

// 페이지 변경
const goToPage = (page) => {
  params.value.page = page;
  fetchBoards();
};

// 검색
const handleSearch = (newKeyword) => {
  keyword.value = newKeyword;
  params.value.page = 1; // 첫 페이지로 초기화
  fetchBoards();
};

// 컴포넌트가 로드될 때 초기 데이터 가져오기
onMounted(fetchBoards);
</script>

<style scoped>
.container {
  margin: 20px auto;
  max-width: 80%;
}
</style>