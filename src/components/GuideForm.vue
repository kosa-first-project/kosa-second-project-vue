<template>
    <div class="container">
      <h1>{{ guideInfoId ? '가이드 수정하기' : '가이드 등록하기' }}</h1>
  
      <form @submit.prevent="submitForm">
        <div id="guidesContainer">
          <h3>가이드 정보 작성</h3>
  
          <div class="form-group">
            <label for="title">가이드 홍보 제목:</label>
            <input type="text" id="title" v-model="formData.title" required />
          </div>
  
          <div class="form-group">
            <label for="city">지역:</label>
            <select v-model="formData.city" required>
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
          </div>
  
          <div class="form-group">
            <label for="career">경력:</label>
            <input type="text" id="career" v-model="formData.career" required />
          </div>
  
          <div class="form-group">
            <label for="weekdayPrice">금액 (일별):</label>
            <input type="number" id="weekdayPrice" v-model="formData.weekdayPrice" required />
          </div>
  
          <div class="form-group">
            <label for="capacity">수용인원:</label>
            <input type="number" id="capacity" v-model="formData.capacity" required />
          </div>
  
          <div class="unavailable-dates" id="unavailableDatesContainer">
            <h4>불가능 기간</h4>
            <div
              v-for="(unavailableDate, index) in formData.unavailableDates"
              :key="index"
              class="form-group"
            >
              <label :for="'unavailableStartDate' + index">시작일:</label>
              <input
                type="date"
                :id="'unavailableStartDate' + index"
                v-model="unavailableDate.startDate"
              />
  
              <label :for="'unavailableEndDate' + index">종료일:</label>
              <input
                type="date"
                :id="'unavailableEndDate' + index"
                v-model="unavailableDate.endDate"
              />
            </div>
          </div>
  
          <button type="button" @click="addUnavailableDate">+ 추가하기</button>
          <br /><br />
  
          <div class="form-group">
            <label for="text">홍보글 작성:</label>
            <textarea id="text" v-model="formData.text" rows="5"></textarea>
          </div>
        </div>
  
        <div class="button-group">
          <div>
            <button type="submit">{{ guideInfoId ? '저장하기' : '생성하기' }}</button>
            <button type="button" @click="closeForm">닫기</button>
          </div>
          <button type="button" v-if="guideInfoId" @click="deleteGuide">삭제하기</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      guideInfoId: {
        type: String,
        default: '',
      },
      guideInfo: {
        type: Object,
        default: () => ({
          title: '',
          city: '',
          career: '',
          weekdayPrice: 0,
          capacity: 0,
          unavailableDates: [{ startDate: '', endDate: '' }],
          text: '',
        }),
      },
    },
    data() {
      return {
        formData: { ...this.guideInfo }, // 초기값은 부모로부터 받은 `guideInfo` 객체
      };
    },
    methods: {
      addUnavailableDate() {
        this.formData.unavailableDates.push({ startDate: '', endDate: '' });
      },
  
      async submitForm() {
        try {
          const response = this.guideInfoId
            ? await fetch(`/guideForm/${this.guideInfoId}`, {
                method: 'PUT',
                body: JSON.stringify(this.formData),
                headers: { 'Content-Type': 'application/json' },
              })
            : await fetch('/guideForm', {
                method: 'POST',
                body: JSON.stringify(this.formData),
                headers: { 'Content-Type': 'application/json' },
              });
  
          if (response.ok) {
            alert('가이드 활동 저장을 성공하였습니다.');
            this.$router.push('/mypage_guide.html');
          } else {
            alert('가이드 저장에 실패했습니다. 다시 시도해주세요.');
          }
        } catch (error) {
          console.error('AJAX 오류:', error);
          alert('서버와의 통신 중 오류가 발생했습니다.');
        }
      },
  
      closeForm() {
        this.$router.go(-1); // 뒤로가기
      },
  
      async deleteGuide() {
        if (confirm('정말로 이 가이드를 삭제하시겠습니까?')) {
          try {
            const response = await fetch(`/guideForm/${this.guideInfoId}/state`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ guideInfoState: 'delete' }),
            });
  
            if (response.ok) {
              alert('가이드가 삭제되었습니다.');
              this.$router.push('/mypage_guide.html');
            } else {
              alert('삭제에 실패했습니다. 다시 시도해주세요.');
            }
          } catch (error) {
            console.error('삭제 오류:', error);
            alert('서버와의 통신 중 오류가 발생했습니다.');
          }
        }
      },
    },
  };
  </script>
  
  <style scoped>
 
 body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            padding: 20px;
        }
        h1 {
            text-align: center;
            color: #333;
        }
        .form-group {
            margin-bottom: 15px;
        }
        label {
            display: block;
            margin-bottom: 5px;
            color: #555;
        }
        input, textarea, select {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            box-sizing: border-box;
            transition: border-color 0.3s;
        }
        input:focus, textarea:focus, select:focus {
            border-color: #007bff;
            outline: none;
        }
        button {
            background-color: #007bff;
            color: white;
            padding: 10px 15px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        button:hover {
            background-color: #0056b3;
        }
        .unavailable-dates {
            margin-top: 20px;
            border: 1px solid #ddd;
            padding: 10px;
            border-radius: 4px;
        }
        .button-group {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
        }
    
  </style>
  