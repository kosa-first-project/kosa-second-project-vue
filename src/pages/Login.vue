<template>
    <input type="text" v-model="username" required/>
    <label>ID</label>
    <hr>
    <input type="password" v-model="password" required/>
    <label>PASSWORD</label>
    <hr>
    <button @Click="login()">로그인</button>
</template>
<script>
    import { reactive } from "vue";
    import axios from "axios";
    import { useRouter, createWebHistory} from "vue-router";

    // axios 기본 설정
    axios.defaults.withCredentials = true;

    export default {
        setup() {
            // 반응형 상태 정의
            const state = reactive({
                form: {
                    username: "",
                    password: ""
                }
            });

            // 로그인 함수
            const login = () => {
                axios.post("http://localhost:8888/login", state.form, {
                    headers: { "X-Requested-With": "XMLHttpRequest" }
                }).then((res) => {
                    console.log(res.headers);
                    sessionStorage.setItem("token", res.headers.get('authorization'))
                }).catch(() => {
                    window.alert("로그인을 수행하는 동안 오류가 발생하였습니다.");
                });
            };

            // 로그아웃 함수
            const logout = () => {
                
            };

            // setup에서 반환하여 템플릿에서 접근 가능하도록 함
            return {
                state, login
            };
        }
    };
</script>