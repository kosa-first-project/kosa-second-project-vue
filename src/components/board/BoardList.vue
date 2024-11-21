<template>
  <div class="container" style="min-height: 800px;">
    <h1>게시판</h1>
    
    <!-- 게시글 작성 버튼 -->
    <div class="d-flex justify-content-end mb-3" style="padding-top: 100px;">
      <router-link :to="{ name: 'BoardForm' }" class="btn btn-success">
        게시글 작성
      </router-link>
    </div>
    
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
          <td>{{ params.page * params.size + index + 1 }}</td>
          <td>
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
    <Pagination :currentPage="params.page + 1" :pageCount="pageCount" @page-changed="goToPage" />
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { getBoards, getBoardsByKeyword } from '@/api/board.js';
import Pagination from '@/components/board/Pagination.vue';
import SearchBar from '@/components/board/SearchBar.vue';

const boards = ref([]);
const params = reactive({
  page: 0, // 0부터 시작
  size: 5,
  sort: 'boardId,desc',
});
const keyword = ref('');
const totalCount = ref(0);

// 게시글 가져오기
const fetchBoards = async () => {
  try {
    const response = keyword.value
      ? await getBoardsByKeyword(
          params.page,
          params.size,
          keyword.value,
          params.sort
        )
      : await getBoards(
          params.page,
          params.size,
          params.sort
        );

    boards.value = response.data.content; // Page 객체의 content 사용
    totalCount.value = response.data.totalElements || 0;
  } catch (error) {
    console.error('Failed to fetch boards:', error);
    alert('게시글을 가져오는데 실패했습니다.');
  }
};

// 페이지네이션 계산
const pageCount = computed(() => {
  const count = Math.ceil(totalCount.value / params.size);
  return count > 0 ? count : 1;
});

// 페이지 변경
const goToPage = (page) => {
  params.page = page - 1; // API 호출 시 0부터 시작
  fetchBoards();
};

// 검색 처리
const handleSearch = (newKeyword) => {
  keyword.value = newKeyword;
  params.page = 0; // 검색 시 첫 페이지로 이동
  fetchBoards();
};

// 컴포넌트가 로드될 때 초기 데이터 가져오기
onMounted(fetchBoards);
</script>

<style scoped>
/* 필요한 스타일 추가 */
</style>
