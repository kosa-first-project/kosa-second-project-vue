<template>
    <div class="contact-section" style="min-height: 800px;">
        <div class="container">
            <h1>여행 계획 리스트</h1>
            
            <!-- 검색 -->
            <div v-if="!selectedTitle" class="search-container">
                <input
                    v-model="searchQuery"
                    type="text"
                    class="search-input"
                    placeholder="검색할 키워드를 입력하세요."
                />
                <button @click="searchSchedules" class="search-btn">검색</button>
            </div>
            
            <!-- 제목 리스트 -->
            <ul v-if="!selectedTitle" class="schedule-title-list">
                <li
                    v-for="schedule in uniqueTitles"
                    :key="schedule.title"
                    class="schedule-title-item"
                    @click="viewSchedule(schedule.title)"
                >
                    <h3>{{ schedule.title }}</h3>
                </li>
            </ul>
            
            <!-- 일정 상세 보기 -->
            <div v-if="selectedTitle">
                <ScheduleSection :events="filteredSchedules" />
            </div>
            
            <button v-if="selectedTitle" @click="clearFilter" class="clear-filter-btn">여행 계획 리스트로 돌아가기</button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import ScheduleSection from "./ScheduleSection.vue";

const schedules = ref([]); // All schedules from the backend
const selectedTitle = ref(null); // Selected schedule title
const searchQuery = ref(""); // 검색 키워드

// Fetch schedules from the backend
const fetchSchedules = async () => {
    try {
        const response = await axios.get("http://localhost:8888/schedule");
        schedules.value = response.data;
    } catch (error) {
        console.error("Error fetching schedules:", error);
    }
};

// 검색 요청
const searchSchedules = async () => {
    if (!searchQuery.value) {
        alert("검색어를 입력하세요.");
        return;
    }

    try {
        const response = await axios.get(`http://localhost:8888/schedule/${encodeURIComponent(searchQuery.value)}`);
        schedules.value = response.data;
        selectedTitle.value = null; // 필터 해제
    } catch (error) {
        console.error("Error searching schedules:", error);
        alert("검색 중 오류가 발생했습니다.");
    }
};

// Extract unique titles from schedules
const uniqueTitles = computed(() => {
    const titles = schedules.value.map((schedule) => schedule.title);
    return [...new Set(titles)].map((title) => ({ title }));
});

// Filter schedules based on the selected title
const filteredSchedules = computed(() => {
    return schedules.value.filter((schedule) => schedule.title === selectedTitle.value);
});

// Handle selecting a schedule title
const viewSchedule = (title) => {
    selectedTitle.value = title;
};

// Clear the selected filter
const clearFilter = () => {
    selectedTitle.value = null;
};

// Fetch schedules on component mount
onMounted(fetchSchedules);
</script>

<style scoped>
/* 기존 스타일 + 검색 스타일 */
.search-container {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}

.search-input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.search-btn {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.search-btn:hover {
    background-color: #0056b3;
}

.schedule-title-list {
    list-style: none;
    padding: 0;
}

.schedule-title-item {
    margin-bottom: 10px;
    padding: 10px;
    background-color: #e1e1e1;
    border: 1px solid #bbb;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.schedule-title-item:hover {
    background-color: #ccc;
}

.clear-filter-btn {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.clear-filter-btn:hover {
    background-color: #0056b3;
}
</style>
