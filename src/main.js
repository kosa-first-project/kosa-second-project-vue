import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
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
