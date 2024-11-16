<template>
    <div id="containerUnique">
        <h1 id="headerTitle">가이드 활동 정보</h1>

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

        <div id="cardContainerUnique">
            <div v-for="guide in paginatedGuideData" :key="guide.guideInfoId" class="card" @click="goToGuide(guide.guideInfoId)">
                <div class="card-content">
                    <div id="cardTitle">{{ guide.title }}</div>
                    <div id="cardInfo">지역: {{ guide.city }}</div>
                    <div id="cardInfo">경력: {{ guide.career }}</div>
                    <div id="cardInfo">금액: {{ guide.weekdayPrice }}원</div>
                    <div id="cardInfo">수용인원: {{ guide.capacity }}명</div>
                    <div id="nicknameUnique">{{ guide.nickname }}</div>
                </div>
            </div>
        </div>

        <div id="paginationWrapper">
            <button class="pagination-button" @click="goToFirstPage">맨 앞</button>
            <button class="pagination-button" @click="previousPage">이전</button>
            <span id="pageButtons">
        <button class="pagination-button" v-for="page in totalPages" :key="page" @click="goToPage(page)">
          {{ page }}
        </button>
      </span>
            <button class="pagination-button" @click="nextPage">다음</button>
            <button class="pagination-button" @click="goToLastPage">맨 뒤</button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                totalItems: 0,
                itemsPerPage: 12,
                currentPage: 1,
                searchTerm: "",
                selectedCity: "all",
                guideData: [],
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
            },
        },
        methods: {
            async fetchGuideData() {
                try {
                    const response = await fetch("/guides");
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
                        `/guides/search?search=${encodeURIComponent(this.searchTerm)}&city=${encodeURIComponent(this.selectedCity)}`
                    );
                    const data = await response.json();
                    this.totalItems = data.length;
                    this.guideData = data;
                } catch (error) {
                    console.error("검색 중 오류 발생:", error);
                }
            },
            goToGuide(guideId) {
                this.$router.push(`/guides/list/${guideId}`);
            },
            goToPage(page) {
                this.currentPage = page;
            },
            nextPage() {
                if (this.currentPage < this.totalPages) {
                    this.currentPage++;
                }
            },
            previousPage() {
                if (this.currentPage > 1) {
                    this.currentPage--;
                }
            },
            goToFirstPage() {
                this.currentPage = 1;
            },
            goToLastPage() {
                this.currentPage = this.totalPages;
            },
        },
        mounted() {
            this.fetchGuideData();
        },
    };
</script>

<style scoped>
    body {
        font-family: 'Arial', sans-serif;
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
        margin: 40px 0 20px; /* 상단에 여백을 추가했습니다 */
    }
    .search-bar {
        display: flex;
        justify-content: center;
        margin-bottom: 20px;
        gap: 10px;
    }
    input[type="text"], select {
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
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        transition: transform 0.3s;
        cursor: pointer;
    }
    .card:hover {
        transform: translateY(-5px);
    }
    .card-content {
        padding: 20px;
    }
    #profileImg {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
        margin-right: 10px;
    }
    #nicknameUnique {
        font-size: 16px;
        font-weight: bold;
        text-align: right;
    }
    #cardTitle {
        font-size: 18px;
        font-weight: bold;
        color: #333;
        margin-bottom: 10px;
    }
    #cardInfo {
        margin-bottom: 8px;
        font-size: 14px;
        color: #555;
    }
    #paginationWrapper {
        text-align: center;
        margin: 30px 0 40px; /* 버튼 밑에 여백을 추가했습니다 */
    }
    .pagination-button {
        margin: 0 2px;
        padding: 8px 12px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s;
    }
    .pagination-button:hover {
        background-color: #0056b3;
    }
</style>
