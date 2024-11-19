<template>
    <div id="containerUnique">
      <h1 id="headerTitle">가이드 활동 정보</h1>
  
      <!-- 검색 바 -->
      <div class="search-bar">
        <input type="text" v-model="searchTerm" placeholder="제목 및 상세내역 검색" />
        <select v-model="selectedCity">
          <option value="all">모든 지역</option>
          <option value="서울">서울</option>
          <option value="부산">부산</option>
          <option value="대구">대구</option>
          <option value="인천">인천</option>
          <option value="광주">광주</option>
          <option value="대전">대전</option>
          <option value="울산">울산</option>
          <option value="세종">세종</option>
          <option value="경기도">경기도</option>
          <option value="강원도">강원도</option>
          <option value="충청도">충청도</option>
          <option value="전라도">전라도</option>
          <option value="경상도">경상도</option>
          <option value="제주도">제주도</option>
        </select>
        <button class="pagination-button" @click="performSearch">검색</button>
      </div>
  
      <!-- 카드 컨테이너 -->
      <div id="cardContainerUnique">
        <div v-if="isLoading">데이터 로딩 중...</div>
        <div v-else-if="!paginatedGuideData.length">검색된 데이터가 없습니다.</div>
        <div v-else>
          <div
            v-for="guide in paginatedGuideData"
            :key="guide.guideInfoId"
            class="card"
            @click="goToGuide(guide.guideInfoId)"
          >
            <div v-if="guide.guideInfoState !== 'delete'" class="card-content">
              <div id="cardTitle">{{ guide.title }}</div>
              <div id="cardInfo">지역: {{ guide.city }}</div>
              <div id="cardInfo">경력: {{ guide.career }}</div>
              <div id="cardInfo">금액: {{ guide.weekdayPrice }}원</div>
              <div id="cardInfo">수용인원: {{ guide.capacity }}명</div>
              <div id="nicknameUnique">{{ guide.nickname }}</div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- 페이지네이션 -->
      <div id="paginationWrapper">
        <button class="pagination-button" @click="goToFirstPage">맨 앞</button>
        <button class="pagination-button" @click="previousPage">이전</button>
        <span id="pageButtons">
          <button
            class="pagination-button"
            v-for="page in totalPages"
            :key="page"
            @click="goToPage(page)"
          >
            {{ page }}
          </button>
        </span>
        <button class="pagination-button" @click="nextPage">다음</button>
        <button class="pagination-button" @click="goToLastPage">맨 뒤</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from "vue";
  import axios from "axios";
  
  // 상태 변수
  const searchTerm = ref("");
  const selectedCity = ref("all");
  const guideData = ref([]);
  const isLoading = ref(false);
  const totalItems = ref(0);
  const itemsPerPage = ref(12);
  const currentPage = ref(0);
  const totalPages = ref(0);
  
  // 필터링된 데이터 계산
  const paginatedGuideData = computed(() => {
    if (!guideData.value) return [];
    return guideData.value.filter((guide) => {
      const cityFilter = selectedCity.value === "all" || guide.city === selectedCity.value;
      const textFilter = guide.title.includes(searchTerm.value) || guide.text.includes(searchTerm.value);
      return cityFilter && textFilter;
    });
  });
  
  // API 호출 함수
  const fetchGuideData = async () => {
    try {
      isLoading.value = true;
      const response = await axios.get("http://localhost:8888/api/guides/GuideMain", {
        params: {
          page: currentPage.value,
          size: itemsPerPage.value,
        },
      });
      console.log("API 응답:", response.data);
      guideData.value = response.data.list || [];
      totalItems.value = response.data.totalElements || 0;
      totalPages.value = response.data.totalPages || 0;
    } catch (error) {
      console.error("데이터를 가져오는 데 오류가 발생했습니다:", error);
    } finally {
      isLoading.value = false;
    }
  };
  
  const performSearch = async () => {
    try {
      isLoading.value = true;
      const response = await axios.get("http://localhost:8888/api/guides/search", {
        params: {
          keyword: searchTerm.value,
          city: selectedCity.value,
        },
      });
      console.log("검색 응답:", response.data);
      guideData.value = response.data.list || [];
      totalItems.value = response.data.totalElements || 0;
      totalPages.value = response.data.totalPages || 0;
    } catch (error) {
      console.error("검색 중 오류 발생:", error);
    } finally {
      isLoading.value = false;
    }
  };
  
  // 페이지네이션 함수
  const goToGuide = (guideId) => {
    window.location.href = `/guidedetail/${guideId}`;
  };
  
  const goToPage = (page) => {
    currentPage.value = page - 1;
    fetchGuideData();
  };
  
  const nextPage = () => {
    if (currentPage.value < totalPages.value - 1) {
      currentPage.value++;
      fetchGuideData();
    }
  };
  
  const previousPage = () => {
    if (currentPage.value > 0) {
      currentPage.value--;
      fetchGuideData();
    }
  };
  
  const goToFirstPage = () => {
    currentPage.value = 0;
    fetchGuideData();
  };
  
  const goToLastPage = () => {
    currentPage.value = totalPages.value - 1;
    fetchGuideData();
  };
  
  // 초기 데이터 로드
  fetchGuideData();
  </script>
  
  <style scoped>
  /* 스타일 변경 */
  body {
    font-family: "Arial", sans-serif;
    background-color: #f3f6fa;
    margin: 0;
    padding: 0;
  }
  
  #containerUnique {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  #headerTitle {
    text-align: center;
    margin: 40px 0 20px;
    color: #222;
  }
  
  .search-bar {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    gap: 10px;
  }
  
  input[type="text"],
  select {
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 48%;
    font-size: 14px;
  }
  
  #cardContainerUnique {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
  }
  
  .card {
    width: 300px;
    background: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    transition: transform 0.3s, box-shadow 0.3s;
    cursor: pointer;
  }
  
  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }
  
  .card-content {
    padding: 20px;
    color: #333;
  }
  
  #cardTitle {
    font-size: 18px;
    font-weight: bold;
    color: #222;
    margin-bottom: 10px;
  }
  
  #cardInfo {
    margin-bottom: 8px;
    font-size: 14px;
    color: #555;
  }
  
  #nicknameUnique {
    font-size: 16px;
    font-weight: bold;
    text-align: right;
    color: #444;
  }
  
  #paginationWrapper {
    text-align: center;
    margin: 30px 0 40px;
  }
  
  .pagination-button {
    margin: 0 2px;
    padding: 8px 12px;
    background-color: #007bff;
    color: #ffffff;
    border: 2px solid #0056b3;
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;
    transition: transform 0.2s, background-color 0.2s;
  }
  
  .pagination-button:hover {
    background-color: #0056b3;
    color: #f1f1f1;
    transform: scale(1.05);
  }
  </style>
  