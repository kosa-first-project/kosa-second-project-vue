<template>
    <div class="list-container">
        <ul>
            <li v-for="event in events" :key="event.id" class="schedule-item">
                <h4><strong>Destination:</strong> {{ event.destination }}</h4>
                <h4><strong>Start:</strong> {{ formatDate(event.startDateTime) }}</h4>
                <h4><strong>End:</strong> {{ formatDate(event.endDateTime) }}</h4>
                <h4><strong>Comment:</strong> {{ event.comment }}</h4>
                <button @click="navigateToEdit(event.id)" class="edit-btn">Edit</button>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

// Navigate to edit page using named route
const navigateToEdit = (id) => {
    router.push({ name: 'edit', params: { id } });
};

// Props
defineProps({
    events: {
        type: Array,
        required: true,
    },
});

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

<style>
.list-container {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
}

.schedule-item {
    margin-bottom: 15px;
    padding: 10px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
    position: relative; /* For button positioning if needed */
}

.edit-btn {
    margin-top: 10px;
    padding: 5px 15px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.edit-btn:hover {
    background-color: #0056b3;
}
</style>
