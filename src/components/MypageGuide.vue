<template>
    <div class="guide-container">
      <h1 class="guide-title">가이드 활동 정보</h1>
  
      <div class="guide-button-group">
        <button class="guide-button" @click="goToAddGuidePage">가이드 추가하기</button>
      </div>
  
      <div class="guide-search-bar">
        <input 
          type="text" 
          v-model="searchTerm" 
          class="guide-search-input" 
          placeholder="제목 또는 상세정보 검색" 
        />
        <select v-model="selectedStatus" class="guide-search-select">
          <option value="all">모든 상태</option>
          <option value="activate">활성화</option>
          <option value="deactivate">비활성화</option>
        </select>
        <button class="guide-button" @click="performSearch">검색</button>
      </div>
  
      <table class="guide-table">
        <thead>
          <tr>
            <th>제목</th>
            <th>지역</th>
            <th>경력</th>
            <th>금액</th>
            <th>수용인원</th>
            <th>상태</th>
            <th>상세보기</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="guide in paginatedGuideData" :key="guide.guideInfoId">
            <td>{{ guide.title }}</td>
            <td>{{ guide.city }}</td>
            <td>{{ guide.career }}</td>
            <td>{{ guide.weekdayPrice }}원</td>
            <td>{{ guide.capacity }}명</td>
            <td>
              <button 
                class="guide-button" 
                @click="toggleStatus(guide.guideInfoId, guide.guideInfoState)">
                {{ guide.guideInfoState === 'activate' ? '활성화' : '비활성화' }}
              </button>
            </td>
            <td>
              <button class="guide-button" @click="viewDetails(guide.guideInfoId)">
                상세보기
              </button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <div class="guide-pagination">
        <button class="guide-button" @click="goToFirstPage">맨 앞</button>
        <button class="guide-button" @click="previousPage">이전</button>
        <span id="pageButtons">
          <button 
            class="guide-button" 
            v-for="page in totalPages" 
            :key="page" 
            @click="goToPage(page)">
            {{ page }}
          </button>
        </span>
        <button class="guide-button" @click="nextPage">다음</button>
        <button class="guide-button" @click="goToLastPage">맨 뒤</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        searchTerm: "",
        selectedStatus: "all",
        currentPage: 1,
        totalItems: 0,
        itemsPerPage: 10,
        guideData: []
      };
    },
    computed: {
      totalPages() {
        return Math.ceil(this.totalItems / this.itemsPerPage);
      },
      paginatedGuideData() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.guideData.slice(start, end);
      }
    },
    methods: {
      async fetchGuideData() {
        try {
          const response = await fetch(`/guides/my`);
          const data = await response.json();
          this.totalItems = data.length;
          this.guideData = data;
        } catch (error) {
          console.error("데이터를 가져오는 데 오류가 발생했습니다:", error);
        }
      },
      async performSearch() {
        try {
          const response = await fetch(
            `/guides/my/search?search=${encodeURIComponent(this.searchTerm)}&status=${encodeURIComponent(this.selectedStatus)}`
          );
          const data = await response.json();
          this.totalItems = data.length;
          this.guideData = data;
        } catch (error) {
          console.error("검색 중 오류 발생:", error);
        }
      },
      goToPage(page) {
        this.currentPage = page;
        this.fetchGuideData(); // 새 페이지 데이터 가져오기
      },
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.currentPage++;
          this.fetchGuideData();
        }
      },
      previousPage() {
        if (this.currentPage > 1) {
          this.currentPage--;
          this.fetchGuideData();
        }
      },
      goToFirstPage() {
        this.currentPage = 1;
        this.fetchGuideData();
      },
      goToLastPage() {
        this.currentPage = this.totalPages;
        this.fetchGuideData();
      },
      viewDetails(guideInfoId) {
        this.$router.push(`/guideForm/${guideInfoId}`);
      },
      async toggleStatus(guideInfoId, currentState) {
        const newState = currentState === "activate" ? "deactivate" : "activate";
        try {
          const response = await fetch(`/guides/list/${guideInfoId}/state`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ guideInfoState: newState })
          });
          if (response.ok) {
            this.fetchGuideData(); // 상태 변경 후 데이터 새로 가져오기
            alert(`가이드 상태가 ${newState === "activate" ? "활성화" : "비활성화"}되었습니다.`);
          } else {
            alert("상태 변경 실패. 다시 시도해 주세요.");
          }
        } catch (error) {
          console.error("오류 발생:", error);
          alert("오류가 발생했습니다. 나중에 다시 시도해 주세요.");
        }
      },
      goToAddGuidePage() {
        this.$router.push("/guideForm");
      }
    },
    mounted() {
      this.fetchGuideData();
    }
  };
  </script>
  
  <style scoped>
  /* 위의 HTML에서 작성한 CSS 스타일을 그대로 적용 */
  body {
    font-family: 'Arial', sans-serif;
    background-color: #f3f4f6;
    margin: 0;
    padding: 0;
  }
  .guide-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 30px;
  }
  .guide-title {
    text-align: center;
    margin-bottom: 20px;
  }
  .guide-button-group {
    text-align: right;
    margin-bottom: 20px;
  }
  .guide-button {
    background-color: #007bff;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;
  }
  .guide-button:hover {
    background-color: #0056b3;
    transform: translateY(-1px);
  }
  .guide-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  .guide-table th,
  .guide-table td {
    padding: 15px;
    text-align: left;
    border-bottom: 1px solid #ddd;
    height: 50px;
    vertical-align: middle;
  }
  .guide-table th {
    background-color: #f2f2f2;
    color: #333;
    font-weight: bold;
  }
  .guide-search-bar {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .guide-search-input,
  .guide-search-select {
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 48%;
    font-size: 14px;
  }
  .guide-pagination {
    text-align: center;
    margin-top: 20px;
  }
  .guide-pagination button {
    margin: 0 2px;
    padding: 8px 12px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  .guide-pagination button:hover {
    background-color: #0056b3;
  }
  </style>
  