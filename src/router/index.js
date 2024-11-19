import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GuideCard from '../components/GuideCard.vue'
import MypageGuide from '../components/MypageGuide.vue'
import GuideForm from '../components/GuideForm.vue'
import GuideDetail from '../components/GuideDetail.vue'
import Login from '../pages/Login.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login', // 로그인 페이지 라우트
      name: 'login',
      component: Login, // Login 컴포넌트 사용
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/guide',
      name: 'Guide',
      component: GuideCard,
    },
    {
      path: '/mypageguide',
      name: 'MypageGuide',
      component: MypageGuide,
    },
    {
      path: '/guideform/:id?', // 등록 및 수정 모두 처리
      name: 'GuideForm',
      component: GuideForm,
      props: true, // props로 ID 전달
    },
    {
      path: '/guidedetail/:id', // 상세보기 경로 수정
      name: 'GuideDetail',
      component: GuideDetail,
      props: true, // 경로 매개변수를 props로 전달
    },
  ],
})

export default router
