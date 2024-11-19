<template>
    <div class="list-container">
        <ul>
            <li v-for="event in events" :key="event.id" class="schedule-item">
                <h4><strong>Destination:</strong> {{ event.destination }}</h4>
                <h4><strong>Start:</strong> {{ formatDate(event.startDateTime) }}</h4>
                <h4><strong>End:</strong> {{ formatDate(event.endDateTime) }}</h4>
                <h4><strong>Comment:</strong> {{ event.comment }}</h4>
            </li>
        </ul>
    </div>
</template>

<script setup>
    import { ref, onMounted } from "vue";
    import axios from "axios";

    const events = ref([]); // Reactive array to store events

      // Fetch schedules from the backend
    const fetchSchedules = async () => {
        try {
        const response = await axios.get("http://localhost:8889/schedule");
        events.value = response.data; // Assign response data to events
        } catch (error) {
        console.error("Error fetching schedules:", error);
        }
    };
    
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

    // Fetch schedules on component mount
    onMounted(fetchSchedules);
</script>

<style>
.list-container {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
}

.schedule-list {
    list-style: none;
    padding: 0;
}

.schedule-item {
    margin-bottom: 15px;
    padding: 10px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
}
</style>