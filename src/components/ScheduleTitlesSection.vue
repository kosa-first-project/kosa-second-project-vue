<template>
    <div class="contact-section">
        <div class="container">
            <h1>여행 계획 리스트</h1>
            <ul v-if="selectedTitle" class="schedule-list">
                <li v-for="schedule in filteredSchedules" :key="schedule.id" class="schedule-item">
                    <h3>{{ schedule.title }}</h3>
                    <p><strong>Destination:</strong> {{ schedule.destination }}</p>
                    <p><strong>Start:</strong> {{ formatDate(schedule.startDateTime) }}</p>
                    <p><strong>End:</strong> {{ formatDate(schedule.endDateTime) }}</p>
                    <p><strong>Comment:</strong> {{ schedule.comment }}</p>
                </li>
            </ul>
            <ul class="schedule-title-list">
                <li v-for="schedule in uniqueTitles" :key="schedule.title" class="schedule-title-item" @click="viewSchedule(schedule.title)">
                    <h3>{{ schedule.title }}</h3>
                </li>
            </ul>
            <button v-if="selectedTitle" @click="clearFilter" class="clear-filter-btn">Clear Filter</button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";

const schedules = ref([]); // All schedules from the backend
const selectedTitle = ref(null); // Title of the selected schedule

// Fetch schedules from the backend
const fetchSchedules = async () => {
    try {
        const response = await axios.get("http://localhost:8889/schedule");
        schedules.value = response.data;
    } catch (error) {
        console.error("Error fetching schedules:", error);
    }
};

// Extract unique titles from the schedules
const uniqueTitles = computed(() => {
    const titles = schedules.value.map((schedule) => schedule.title);
    return [...new Set(titles)].map((title) => ({ title }));
});

// Filter schedules based on the selected title
const filteredSchedules = computed(() => {
    if (!selectedTitle.value) {
        return schedules.value;
    }
    return schedules.value.filter((schedule) => schedule.title === selectedTitle.value);
});

// Handle selecting a schedule title
const viewSchedule = (title) => {
    selectedTitle.value = title;
};

// Clear filter and show all schedules
const clearFilter = () => {
    selectedTitle.value = null;
};

// Fetch schedules on component mount
onMounted(fetchSchedules);

// Format datetime for display
const formatDate = (dateTime) => {
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    };
    return new Date(dateTime).toLocaleString(undefined, options);
};
</script>

<style scoped>
.schedule-overview {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
}

.schedule-list {
    list-style: none;
    padding: 0;
}

.schedule-item {
    margin-bottom: 10px;
    padding: 10px;
    background-color: #f1f1f1;
    border: 1px solid #ddd;
    border-radius: 6px;
    cursor: default;
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
