<template>
<footer class="footer-area">
    <div class="container">
    <div class="row justify-content-between">
        <div class="col-sm-6 col-md-5">
        <h4>만든 사람들</h4>
        <ul>
            <li><a href="#">조장 : 안성준</a></li>
            <li><a href="#">조원 : 김도훈</a></li>
            <li><a href="#">조원 : 임은선</a></li>
            <li><a href="#">조원 : 배영재</a></li>
        </ul>
        </div>
        <div class="col-sm-6 col-md-4">
        <h4>뉴스레터 구독하기</h4>
        <form @submit.prevent="subscribeNewsletter" class="form-inline">
            <input
            v-model="email"
            class="form-control"
            placeholder="abcd@gmail.com"
            type="email"
            required
            />
            <button
            type="submit"
            class="click-btn btn btn-default text-uppercase"
            >
            <i class="far fa-paper-plane"></i>
            </button>
        </form>
        </div>
        <div class="col-sm-6 col-md-3">
        <h4>문의 사항</h4>
        <p>서울시 송파구 중대로 135 IT벤쳐타워</p>
        <span>nadri@gamil.com</span>
        </div>
    </div>
    </div>
</footer>
</template>

<script>
    export default {
        data() {
            return {
            email: "",
            };
        },
        methods: {
            subscribeNewsletter() {
            alert(`Subscribed with email: ${this.email}`);
            this.email = "";
            },
        },
    };
</script>
