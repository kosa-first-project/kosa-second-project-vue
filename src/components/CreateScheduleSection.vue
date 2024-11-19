<template>
    <section class="contact-section">
        <div class="container">
            <div class="row">
                <div class="col-6">
                    <h2 class="contact-title">여행 일정 추가하기</h2>
                </div>
                <div class="col-6">
                    <h2 class="contact-title">지도에서 선택하기</h2>
                </div>
                <div class="col-lg-6">
                    <div class="form-group">
                        <label for="title">여행 일정 제목</label>
                        <input class="form-control" name="title" id="title" v-model="scheduleTitle" type="text" placeholder="여행 일정 제목" required>
                    </div>  
                    <form class="form-contact contact_form" method="post" id="scheduleForm" action="/schedule/Create">
                        <input type="hidden" name="title" id="titleField" />
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="travel_start_date">여행 시작 날짜</label>
                                    <input class="form-control" name="travel_start_date" id="travel_start_date" type="date" placeholder="여행 시작 날짜" required />
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="travel_start_time">여행 시작 시간</label>
                                    <input class="form-control" name="travel_start_time" id="travel_start_time" type="time" placeholder="여행 시작 시간" required />
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="travel_end_date">여행 종료 날짜</label>
                                    <input class="form-control" name="travel_end_date" id="travel_end_date" type="date" placeholder="여행 종료 날짜" required />
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="travel_end_time">여행 종료 시간</label>
                                    <input class="form-control" name="travel_end_time" id="travel_end_time" type="time" placeholder="여행 종료 시간" required />
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="form-group">
                                    <label for="destination">목적지</label>
                                    <input class="form-control" name="destination" id="destination" type="text" placeholder="목적지" required />
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <div class="form-group">
                                    <label for="destination">참고 사항</label>
                                    <input class="form-control" name="comment" id="comment" style="height:105px" type="text" placeholder="ex) 경복궁에서 한복 빌리기" />
                                </div>
                            </div>
                        </div>
                        <div class="form-group mt-3">
                            <button @click="createSchedule" type="button" class="btn btn-primary">일정 생성</button>
                        </div>
                        <div class="form-group mt-3"></div>
                    </form>
                </div>
                <div class="col-lg-6">
                    <div class="input-group mb-3">
                    <input v-model="searchQuery" type="text" class="form-control" placeholder="ex) 경복궁" @keypress.enter="searchKeyword" />
                    <div class="input-group-append">
                        <button @click="searchKeyword" class="btn" type="button"><i class="ti-search"></i></button>
                    </div>
                    <div id="map" style="width: 100%; height: 400px; margin-top: 10px;"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from 'axios';

const searchQuery = ref("");
const markers = ref([]);
let map = null;
let ps = null;

// Initialize Kakao Map
const initMap = () => {
    const mapContainer = document.getElementById("map");
    const mapOption = { 
        center: new kakao.maps.LatLng(36.98818056, 127.9281444), // Default center coordinates
        level: 12, // Zoom level
    };
    map = new kakao.maps.Map(mapContainer, mapOption);
    ps = new kakao.maps.services.Places();
};

// Search keyword
const searchKeyword = () => {
if (!searchQuery.value) {
    alert("검색어를 입력하세요.");
    return;
}

ps.keywordSearch(searchQuery.value, (data, status) => {
    if (status === kakao.maps.services.Status.OK) {
    markers.value = []; // Clear existing markers
    const bounds = new kakao.maps.LatLngBounds();

    data.forEach((place) => {
        const position = new kakao.maps.LatLng(place.y, place.x);
        const marker = new kakao.maps.Marker({
            position,map,
        });
        markers.value.push(marker);
        bounds.extend(position);

        kakao.maps.event.addListener(marker, "click", () => {
            document.getElementById("destination").value = place.place_name;
        });
    });

        map.setBounds(bounds);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert("검색 결과가 없습니다.");
    } else {
        alert("검색 중 오류가 발생했습니다.");
    }
});
};

const createSchedule = async () => {
    try {
        const formData = {
            user_id: "123", // Replace with actual user ID logic
            destination: document.getElementById("destination").value,
            travel_start_date: document.getElementById("travel_start_date").value,
            travel_start_time: document.getElementById("travel_start_time").value,
            travel_end_date: document.getElementById("travel_end_date").value,
            travel_end_time: document.getElementById("travel_end_time").value,
            comment: document.getElementById("comment").value,
            title: document.getElementById("title").value,
        };

        const response = await axios.post("http://localhost:8889/schedule/create", formData, {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });

        alert("일정이 성공적으로 생성되었습니다.");
        console.log("Created schedule:", response.data);
    } catch (error) {
        console.error("Error creating schedule:", error);
        alert("일정 생성 중 오류가 발생했습니다.");
    }
};

// Initialize the map on component mount
    onMounted(() => {
        initMap();
    });
</script>

<style scoped>
    #map {
        width: 100%;
        margin-top: 10px;
    }
</style>
