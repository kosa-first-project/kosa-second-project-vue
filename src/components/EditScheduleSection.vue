<template>
    <section class="contact-section">
        <div class="container">
            <div class="row">
                <div class="col-6">
                    <h2 class="contact-title">여행 일정 수정하기</h2>
                </div>
                <div class="col-6">
                    <h2 class="contact-title">지도에서 선택하기</h2>
                </div>
                <div class="col-lg-6">
                    <form class="form-contact contact_form" method="post" id="scheduleForm" @submit.prevent="updateSchedule">
                        <div class="form-group">
                            <label for="title">여행 일정 제목</label>
                            <input
                                class="form-control"
                                name="title"
                                id="title"
                                v-model="schedule1.title"
                                type="text"
                                required
                            />
                        </div>  
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="travel_start_date">여행 시작 날짜</label>
                                    <input
                                        class="form-control"
                                        name="travel_start_date"
                                        id="travel_start_date"
                                        v-model="schedule1.travel_start_date"
                                        type="date"
                                        placeholder="여행 시작 날짜"
                                        required
                                    />
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="travel_start_time">여행 시작 시간</label>
                                    <input
                                        class="form-control"
                                        name="travel_start_time"
                                        id="travel_start_time"
                                        v-model="schedule1.travel_start_time"
                                        type="time"
                                        placeholder="여행 시작 시간"
                                        required
                                    />
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="travel_end_date">여행 종료 날짜</label>
                                    <input
                                        class="form-control"
                                        name="travel_end_date"
                                        id="travel_end_date"
                                        v-model="schedule1.travel_end_date"
                                        type="date"
                                        placeholder="여행 종료 날짜"
                                        required
                                    />
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="travel_end_time">여행 종료 시간</label>
                                    <input
                                        class="form-control"
                                        name="travel_end_time"
                                        id="travel_end_time"
                                        v-model="schedule1.travel_end_time"
                                        type="time"
                                        placeholder="여행 종료 시간"
                                        required
                                    />
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="form-group">
                                    <label for="destination">목적지</label>
                                    <input
                                        class="form-control"
                                        name="destination"
                                        id="destination"
                                        v-model="schedule1.destination"
                                        type="text"
                                        placeholder="목적지"
                                        required
                                    />
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <div class="form-group">
                                    <label for="comment">참고 사항</label>
                                    <input
                                        class="form-control"
                                        name="comment"
                                        id="comment"
                                        v-model="schedule1.comment"
                                        style="height:105px"
                                        type="text"
                                        placeholder="ex) 경복궁에서 한복 빌리기"
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="form-group mt-3">
                            <button type="submit" class="btn btn-primary">일정 수정</button>
                        </div>
                    </form>
                    <div class="form-group mt-3">
                            <button type="submit" class="btn btn-primary" @click="deleteSchedule()">일정 삭제</button>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="input-group mb-3">
                        <input
                            v-model="searchQuery"
                            type="text"
                            class="form-control"
                            placeholder="ex) 경복궁"
                            @keypress.enter="searchKeyword"
                        />
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
import { defineProps, reactive, ref, onMounted } from "vue";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";

// Props 정의
const props = defineProps({
    id: {
        type: String, // 또는 Number, API 요구사항에 따라 설정
        required: true,
    },
});

const router = useRouter();
const route = useRoute(); // useRoute를 통해 추가적으로 접근 가능
const searchQuery = ref("");
const markers = ref([]);
let map = null;
let ps = null;

// Reactive object to hold schedule data
const schedule1 = reactive({
    id: "",
    user_id:"123",
    title: "",
    travel_start_date: "",
    travel_start_time: "",
    travel_end_date: "",
    travel_end_time: "",
    destination: "",
    comment: "",
    latitude: null,
    longitude: null,
});

// Initialize Kakao Map
const initMap = () => {
    const mapContainer = document.getElementById("map");
    const mapOption = { 
        center: new kakao.maps.LatLng(36.98818056, 127.9281444), // Default center coordinates
        level: 12, // Zoom level
    };
    map = new kakao.maps.Map(mapContainer, mapOption);
    ps = new kakao.maps.services.Places();

    if (!ps) {
        console.error("Places services failed to initialize.");
    }
};

// Search keyword
const searchKeyword = () => {
    if (!ps) {
        alert("지도 서비스가 초기화되지 않았습니다. 페이지를 새로고침 해주세요.");
        return;
    }

    if (!searchQuery.value) {
        alert("검색어를 입력하세요.");
        return;
    }

    ps.keywordSearch(searchQuery.value, (data, status) => {
        if (status === kakao.maps.services.Status.OK) {
            // Remove existing markers
            markers.value.forEach(marker => marker.setMap(null));
            markers.value = [];
            const bounds = new kakao.maps.LatLngBounds();

            data.forEach((place) => {
                const position = new kakao.maps.LatLng(place.y, place.x);
                const marker = new kakao.maps.Marker({
                    position, map,
                });
                markers.value.push(marker);
                bounds.extend(position);

                kakao.maps.event.addListener(marker, "click", () => {
                    schedule1.destination = place.place_name;
                    // Optional: Update map center to selected location
                    map.setCenter(position);
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

// Fetch schedule data based on ID
const fetchSchedule = async (id) => {
    try {
        console.log(`Fetching schedule with ID: ${id}`); // Log the ID being fetched
        const response = await axios.get(`http://localhost:8888/schedule/get/${id}`);
        const data = response.data; // API 응답 구조에 따라 수정 필요

        console.log("Fetched schedule data:", data);

        if (data) {
            if (schedule1) {
                schedule1.id = data[0].id;
                schedule1.title = data[0].title;
                schedule1.travel_start_date = data[0].travel_start_date;
                schedule1.travel_start_time = data[0].travel_start_time;
                schedule1.travel_end_date = data[0].travel_end_date;
                schedule1.travel_end_time = data[0].travel_end_time;
                schedule1.destination = data[0].destination;
                schedule1.comment = data[0].comment;
                schedule1.latitude = data[0].latitude;
                schedule1.longitude = data[0].longitude;

                console.log("Show schedule1:", schedule1);

                // 위치 설정
                if (schedule1.latitude && schedule1.longitude) {
                    const position = new kakao.maps.LatLng(schedule1.latitude, schedule1.longitude);
                    map.setCenter(position);
                }
            } else {
                console.warn("No data received for schedule ID:", id);
                alert("해당 ID에 대한 일정 데이터가 없습니다.");
            }
        } else {
            console.warn("No data received for schedule ID:", id);
            alert("해당 ID에 대한 일정 데이터가 없습니다.");
        }
    } catch (error) {
        if (error.response) {
            console.error("서버 응답 오류:", error.response.data);
            alert(`오류: ${error.response.data.message || "일정 데이터를 가져오는 중 오류가 발생했습니다."}`);
        } else if (error.request) {
            console.error("요청 오류:", error.request);
            alert("서버로부터 응답을 받지 못했습니다. 네트워크 상태를 확인하세요.");
        } else {
            console.error("요청 설정 오류:", error.message);
            alert("일정 데이터를 가져오는 중 오류가 발생했습니다.");
        }
    }
};

// Update schedule
const updateSchedule = async () => {
    const num = schedule1.id; // Access the id from schedule1

    if (!num) {
        alert("유효한 일정 ID가 없습니다.");
        console.log(num); // null
        return;
    }

    try {
        const formData = {
            user_id: "123", // Replace with actual user ID
            destination: document.getElementById("destination").value,
            travel_start_date: document.getElementById("travel_start_date").value,
            travel_start_time: document.getElementById("travel_start_time").value,
            travel_end_date: document.getElementById("travel_end_date").value,
            travel_end_time: document.getElementById("travel_end_time").value,
            comment: document.getElementById("comment").value,
            title: document.getElementById("title").value,
        };
        //console.log(formData.destination);

        //console.log(`Updating schedule with ID: ${num}`, formData); // Log the form data

        //const response = await axios.put(`http://localhost:8888/schedule/edit/${num}`, formData);
        const response = await axios.post(`http://localhost:8888/schedule/edit/${num}`, {
            user_id: "123",
            destination: formData.destination,
            travel_start_date: formData.travel_start_date,
            travel_start_time: formData.travel_start_time,
            travel_end_date: formData.travel_end_date,
            travel_end_time: formData.travel_end_time,
            comment: formData.comment,
            title: formData.title,
        });

        alert("일정이 성공적으로 수정되었습니다.");
        console.log("Schedule Edited:", response.data);
        // Redirect to the schedule detail page
        router.push(`/schedule`);
    } catch (error) {
        if (error.response) {
            console.error("서버 응답 오류:", error.response.data);
            alert(`오류: ${error.response.data.message || "일정 수정 중 오류가 발생했습니다."}`);
        } else if (error.request) {
            console.error("요청 오류:", error.request);
            alert("서버로부터 응답을 받지 못했습니다. 네트워크 상태를 확인하세요.");
        } else {
            console.error("요청 설정 오류:", error.message);
            alert("일정 수정 중 오류가 발생했습니다.");
        }
    }
};

const deleteSchedule = async () => {
    const num = schedule1.id; // Access the id from schedule1

    if (!num) {
        alert("유효한 일정 ID가 없습니다.");
        console.log(num); // null
        return;
    }

    // 사용자에게 삭제 확인을 요청
    const confirmed = confirm("정말로 이 일정을 삭제하시겠습니까? 이 작업은 취소할 수 없습니다.");

    if (!confirmed) {
        return;
    }

    try {
        // 백엔드의 삭제 엔드포인트로 DELETE 요청 보내기
        const response = await axios.delete(`http://localhost:8888/schedule/delete/${num}`, {
            headers: { "Content-Type": "application/json" },
        });

        if (response.status === 204) { // No Content
            alert("일정이 성공적으로 삭제되었습니다.");
            console.log("Schedule Deleted:", response.data);
            // 일정 목록 페이지로 리디렉션 또는 다른 적절한 동작 수행
            router.push(`/schedule`);
        } else {
            alert("일정 삭제 중 예상치 못한 응답을 받았습니다.");
            console.log("Unexpected response:", response);
        }
    } catch (error) {
        if (error.response) {
            console.error("서버 응답 오류:", error.response.data);
            alert(`오류: ${error.response.data.message || "일정 삭제 중 오류가 발생했습니다."}`);
        } else if (error.request) {
            console.error("요청 오류:", error.request);
            alert("서버로부터 응답을 받지 못했습니다. 네트워크 상태를 확인하세요.");
        } else {
            console.error("요청 설정 오류:", error.message);
            alert("일정 삭제 중 오류가 발생했습니다.");
        }
    }
};

onMounted(async () => {
    initMap();

    // Props로부터 ID 추출
    const id = route.params.id;
    console.log("Fetched ID from props:", route.params); // Log the ID

    // 추가 디버깅: route.params 전체 출력
    console.log("Route Params:", route.params);

    if (id) {
        await fetchSchedule(id);
    } else {
        alert("유효한 일정 ID가 제공되지 않았습니다.");
    }
});
</script>

<style scoped>
#map {
    width: 100%;
    height: 400px;
    margin-top: 10px;
}
</style>
