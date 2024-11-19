<template>
  <div class="container">
    <h1>{{ guideInfoId ? "가이드 수정하기" : "가이드 등록하기" }}</h1>

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
          <input
            type="number"
            id="weekdayPrice"
            v-model="formData.weekdayPrice"
            required
          />
        </div>

        <div class="form-group">
          <label for="capacity">수용인원:</label>
          <input type="number" id="capacity" v-model="formData.capacity" required />
        </div>

        <div class="form-group">
          <label for="text">홍보글 작성:</label>
          <textarea id="text" v-model="formData.text" rows="5"></textarea>
        </div>
      </div>

      <div class="button-group">
        <button type="submit">{{ guideInfoId ? "저장하기" : "생성하기" }}</button>
        <button type="button" @click="closeForm">닫기</button>
        <button type="button" v-if="guideInfoId" @click="deleteGuide">삭제하기</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      guideInfoId: null,
      formData: {
        title: "",
        city: "",
        career: "",
        weekdayPrice: 0,
        capacity: 0,
        text: "",
      },
    };
  },
  mounted() {
    this.initializeGuideInfo();
  },
  methods: {
    async initializeGuideInfo() {
      const guideId = this.$route.params.id; // URL 파라미터에서 ID 가져오기
      if (guideId) {
        this.guideInfoId = guideId;
        await this.fetchGuideInfo();
      }
    },
    async fetchGuideInfo() {
      try {
        const response = await fetch(
          `http://localhost:8888/api/guides/one?id=${this.guideInfoId}`
        );
        if (response.ok) {
          const data = await response.json();
          this.formData = data; // API 응답으로 formData 초기화
        } else {
          alert("가이드 정보를 불러오는 데 실패했습니다.");
        }
      } catch (error) {
        console.error("가이드 정보 불러오기 오류:", error);
      }
    },
    async submitForm() {
      try {
        const url = this.guideInfoId
          ? `http://localhost:8888/api/guides/update`
          : `http://localhost:8888/api/guides/insert`;
        const method = this.guideInfoId ? "POST" : "POST";

        const response = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.formData),
        });

        if (response.ok) {
          alert(this.guideInfoId ? "가이드가 수정되었습니다." : "가이드가 등록되었습니다.");
          this.$router.push("/mypageguide");
        } else {
          alert("가이드 저장에 실패했습니다.");
        }
      } catch (error) {
        console.error("저장 오류:", error);
        alert("저장 중 문제가 발생했습니다.");
      }
    },
    closeForm() {
      this.$router.go(-1); // 이전 페이지로 돌아가기
    },
    async deleteGuide() {
      if (confirm("정말로 이 가이드를 삭제하시겠습니까?")) {
        try {
          const response = await fetch(
            `http://localhost:8888/api/guides/delete?id=${this.guideInfoId}`,
            { method: "DELETE" }
          );

          if (response.ok) {
            alert("가이드가 삭제되었습니다.");
            this.$router.push("/mypageguide");
          } else {
            alert("가이드 삭제에 실패했습니다.");
          }
        } catch (error) {
          console.error("삭제 오류:", error);
          alert("삭제 중 문제가 발생했습니다.");
        }
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}
h1 {
  text-align: center;
  margin-bottom: 20px;
}
.form-group {
  margin-bottom: 15px;
}
label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}
input,
textarea,
select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 5px;
}
button {
  margin-top: 10px;
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
}
button:hover {
  background-color: #0056b3;
}
.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>
