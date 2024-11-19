import './assets/main.css'
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import VueCookies from 'vue3-cookies';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './assets/main.css';

createApp(App)
    .use(createPinia())
    .use(router)
    .use(VueCookies, {
    expireTimes : '1h',
    secure: false,
})
.mount('#app');

import { useKakao } from 'vue3-kakao-maps/@utils';

useKakao('c4383072ddbd9de13cbbd32ea4ac8aeb');

import './assets/css/bootstrap.min.css';
import './assets/css/style.css';
import './assets/css/animate.css';
import './assets/css/font-awesome.min.css';
import './assets/css/aos.css';
import './assets/css/magnific-popup.css';
import './assets/css/flaticon.css';
import './assets/css/nice-select.css';
import './assets/css/slick.css';
import './assets/main.css';
import './assets/css/owl.carousel.min.css';
import './assets/css/swiper.min.css';
import './assets/css/themify-icons.css';

