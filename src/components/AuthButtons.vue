<template>
    <div class="d-flex auth-buttons">
      <!-- 사용자가 로그인하지 않은 경우 -->
      <div v-if="!isAuthenticated">
        <router-link to="/login" class="btn_1 btn btn-outline-primary">Login</router-link>
      </div>
      
      <!-- 사용자가 로그인한 경우 -->
      <div v-else class="auth-actions">
        <button class="btn_1 btn btn-outline-success" @click="createNewSchedule">새 여행 계획 만들기</button>
        <router-link to="/logout" class="btn_1 btn btn-outline-danger">Logout</router-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AuthButtons',
    props: {
      // 상위 컴포넌트로부터 인증 상태를 전달받습니다.
      isAuthenticated: {
        type: Boolean,
        required: true
      }
    },
    methods: {
      createNewSchedule() {
        // 새 여행 계획 생성 로직을 여기에 구현하세요.
        // 예를 들어, 새 페이지로 네비게이션:
        this.$router.push('/create-schedule');
        
        // 또는 API 호출을 통해 새 여행 계획을 생성할 수 있습니다.
        // axios.post('/api/schedules', {...})
        //   .then(response => { /* 성공 처리 */ })
        //   .catch(error => { /* 오류 처리 */ });
      }
    }
  }
  </script>
  
  <style scoped>
  /* 커스텀 스타일 */
  .auth-buttons {
      align-items: center;
      justify-content: flex-end;
      margin-top: 10px; /* 위쪽 여백을 줄여서 버튼 위치를 위로 */
      display: flex;
      flex-direction: column; /* 세로로 정렬 */
  }
  
  .auth-actions {
      display: flex;
      flex-direction: column;
      width: 100%;
      max-width: 300px;
  }
  
  .auth-actions .btn_1 {
      padding: 10px 20px;
      border-radius: 20px;
      margin: 8px 0; /* 버튼 간 간격 조절 */
      transition: background-color 0.3s, transform 0.2s;
      width: 100%; /* 버튼 크기를 동일하게 */
      max-width: 300px; /* 버튼의 최대 너비 설정 */
  }
  
  .auth-buttons .btn_1 {
      padding: 10px 20px;
      border-radius: 20px;
      margin: 8px 0; /* 버튼 간 간격 조절 */
      transition: background-color 0.3s, transform 0.2s;
      width: 100%; /* 버튼 크기를 동일하게 */
      max-width: 300px; /* 버튼의 최대 너비 설정 */
  }
  
  .auth-buttons .btn_1:hover {
      background-color: #007bff;
      color: white;
      transform: scale(1.05);
  }
  
  /* 미디어 쿼리 적용 */
  @media (min-width: 768px) {
      .auth-buttons {
          flex-direction: row; /* 데스크톱 환경에서는 가로 정렬 */
          justify-content: flex-end;
          margin-top: 0; /* 데스크톱 환경에서는 위쪽 여백을 줄임 */
      }
  
      .auth-actions {
          flex-direction: row;
      }
  
      .auth-buttons .btn_1 {
          width: auto; /* 데스크톱에서는 버튼이 자동 너비 */
          margin: 0 10px; /* 버튼 간 가로 간격 */
      }
  }
  </style>
  