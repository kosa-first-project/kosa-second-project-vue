<template>
    <div id="containerUnique">
      <h1 id="headerTitle">가이드 활동 정보</h1>
  
      <!-- 카드 컨테이너 -->
      <div class="card-container">
        <div v-if="isLoading">데이터 로딩 중...</div>
        <div v-else-if="!guides.length">검색된 데이터가 없습니다.</div>
        <div v-else>
          <div
            v-for="guide in guides.slice(0, 6)" 
            :key="guide.guideInfoId"
            class="card"
            @click="goToGuide(guide.guideInfoId)"
          >
            <div class="card-content">
              <div class="card-title">{{ guide.title }}</div>
              <div class="card-info">지역: {{ guide.city }}</div>
              <div class="card-info">경력: {{ guide.career }}년</div>
              <div class="card-info">금액: {{ guide.weekdayPrice }}원</div>
              <div class="card-info">수용인원: {{ guide.capacity }}명</div>
              <div id="nicknameUnique">{{ guide.nickname }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  
  // 가이드 데이터 상태 변수
  const guides = ref([]);
  const isLoading = ref(false);
  
  // API 호출 함수
  const fetchGuideData = async () => {
    try {
      isLoading.value = true;
      const response = await fetch("http://localhost:8888/api/guides/GuideMain"); // API URL 수정 필요
      const data = await response.json();
      guides.value = data.list || [];
    } catch (error) {
      console.error("데이터를 가져오는 데 오류가 발생했습니다:", error);
    } finally {
      isLoading.value = false;
    }
  };
  
  // 상세 페이지 이동 함수
  const goToGuide = (guideInfoId) => {
    window.location.href = `/guides/list/${guideInfoId}`;
  };
  
  // 컴포넌트 마운트 시 데이터 로드
  onMounted(() => {
    fetchGuideData();
  });
  </script>
  
  <style scoped>
  body {
    font-family: Arial, sans-serif;
    background-color: #f3f4f6;
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
  
  /* 그리드 레이아웃 */
  .card-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* 항상 3열로 구성 */
    grid-auto-rows: auto; /* 행 높이는 콘텐츠에 따라 자동으로 */
    gap: 20px; /* 카드 간 간격 */
    justify-content: center; /* 그리드 중앙 정렬 */
    padding: 20px 0;
  }
  
  .card {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.3s, box-shadow 0.3s;
    width: 100%; /* 셀에 맞게 카드 크기 조정 */
    max-width: 300px; /* 카드의 최대 너비 */
    margin: 0 auto; /* 카드가 셀 안에서 중앙에 위치 */
  }
  
  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }
  
  .card-content {
    padding: 20px;
  }
  
  .card-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .card-info {
    margin-bottom: 8px;
    font-size: 14px;
  }
  
  #nicknameUnique {
    font-size: 16px;
    font-weight: bold;
    text-align: right;
  }
  </style>
  