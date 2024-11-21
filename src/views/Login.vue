<template>
    <div class="container">
    <form @submit.prevent="login">
        <label for="username">ID</label>
        <input type="text" v-model="username" required />
        <br />
        <label for="password">PASSWORD</label>
        <input type="password" v-model="password" required />
        <hr />
        <button type="submit">로그인</button>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const username = ref('');
const password = ref('');
  const router = useRouter();  // useRouter는 컴포넌트 외부에서 사용할 수 있습니다.
const errorMessage = ref('');

const login = async () => {
    try {
    const response = await axios.post(
        'http://localhost:8888/api/auth/login',
        { username: username.value, password: password.value },
        {
            // withCredentials: true,  // CORS 요청 시 쿠키나 인증 정보 전송
            headers: {
                'Content-Type': 'application/json'
        }
        }
    );

    console.log("RESPONSE:", response.data);
    const token = response.data.jwt;
      localStorage.setItem('jwt_token', token);  // 토큰을 로컬 스토리지에 저장

      // 페이지 전환
    router.push({ name: 'home' });
    } catch (error) {
    errorMessage.value = '로그인 실패. 다시 시도해주세요.';
    console.error('로그인 실패', error);
    }
};
</script>

<style scoped>
  /* 전체 페이지 중앙 정렬 */
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f4f7fc;
}

form {
    width: 100%;
    max-width: 400px;
    padding: 20px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

input[type="text"],
input[type="password"] {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
}

label {
    font-size: 14px;
    font-weight: bold;
    color: #555;
    margin-bottom: 5px;
    display: inline-block;
}

button {
    width: 100%;
    padding: 12px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #0056b3;
}

hr {
    border: 1px solid #ddd;
    margin: 10px 0;
}

.error {
    color: red;
    font-size: 14px;
    margin-top: 10px;
}
</style>
