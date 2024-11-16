<template>
    <div class="container" v-if="guide">
      <!-- 가이드 이미지 -->
      <img :src="guide.image" alt="상세 이미지" class="guide-image" />
  
      <!-- 가이드 제목, 지역, 수용 인원, 금액, 평점, 닉네임 -->
      <h2>{{ guide.title }}</h2>
      <p>지역: {{ guide.city }}</p>
      <p>수용 인원: {{ guide.capacity }}</p>
      <p>금액: {{ guide.weekdayPrice }} 원</p>
      <p>평점: {{ guide.boardRating }}</p>
      <p>닉네임: {{ guide.nickname }}</p>
  
      <!-- 상세 내역 -->
      <div class="details">
        <h4>상세 내역</h4>
        <p>{{ guide.text }}</p>
      </div>
  
      <!-- 버튼들 -->
      <div class="button-container">
        <button class="button" @click="applyForGuide">신청하기</button>
        <button class="button cancel" @click="goBack">취소</button>
      </div>
    </div>
  
    <!-- 가이드 정보 로딩 중 -->
    <div v-else>
      <p>가이드 정보를 불러오는 중입니다...</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        guide: null,  // 가이드 정보를 저장할 변수
      };
    },
    methods: {
      async fetchGuideDetails() {
        try {
          // 현재 페이지 URL에서 가이드 ID를 추출
          const pathParts = window.location.pathname.split('/');
          const guideId = pathParts[pathParts.length - 1];
  
          // 가이드 상세 정보 API 호출
          const response = await fetch(`/guides/list/${guideId}`, {
            headers: {
              'Accept': 'application/json',
            },
          });
  
          if (!response.ok) {
            console.error(`Error: ${response.status} ${response.statusText}`);
            throw new Error('가이드를 가져오는 데 실패했습니다.');
          }
  
          const data = await response.json();
          this.guide = data;  // 받아온 데이터를 Vue의 guide 변수에 저장
        } catch (error) {
          console.error(error);
          alert('가이드 정보를 가져오는 데 문제가 발생했습니다.');
        }
      },
      applyForGuide() {
        alert('신청이 완료되었습니다!');
        // 신청 로직을 여기에 작성 (예: 서버에 신청 데이터 보내기)
      },
      goBack() {
        window.history.back();  // 이전 페이지로 돌아가기
      },
    },
    mounted() {
      this.fetchGuideDetails();  // 컴포넌트가 마운트되면 가이드 정보를 가져옴
    },
  };
  </script>
  
  <style scoped>
  /* 기존 CSS 스타일을 그대로 적용 */
  body {
    font-family: 'Arial', sans-serif;
    background-color: #f0f2f5;
    color: #333;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    margin: 0;
    padding: 20px;
  }
  .container {
    background-color: white;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    padding: 30px;
    width: 90%;
    max-width: 700px;
    text-align: center;
  }
  .container img {
    width: 100%;
    border-radius: 15px;
    height: auto;
    margin-bottom: 20px;
  }
  .container h2 {
    margin: 10px 0;
    font-size: 28px;
    color: #007bff;
  }
  .container p {
    margin: 5px 0;
    font-size: 16px;
    line-height: 1.5;
  }
  .details {
    text-align: left;
    margin: 20px 0;
  }
  .button-container {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  .button {
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 12px 20px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    flex: 1;
    margin: 0 5px;
    font-size: 16px;
    font-weight: bold;
  }
  .button:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }
  .button.cancel {
    background-color: #f44336;
  }
  .button.cancel:hover {
    background-color: #d32f2f;
  }
  @media (max-width: 600px) {
    .button-container {
      flex-direction: column;
    }
    .button {
      margin: 5px 0;
    }
  }
  </style>
  