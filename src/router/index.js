import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/common/Home.vue';
import boardList from '@/components/board/BoardList.vue';
import BoardDetails from '@/components/board/BoardDetails.vue';
import GuideCard from '../components/GuideCard.vue'
import MypageGuide from '../components/MypageGuide.vue'
import GuideForm from '../components/GuideForm.vue'
import GuideDetail from '../components/GuideDetail.vue'
import Login from '../pages/Login.vue';
import HomeView from '../views/HomeView.vue'
import ScheduleView from "../views/ScheduleView.vue"; 
import CreateScheduleView from "../views/CreateScheduleView.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/login', // 로그인 페이지 라우트
      name: 'login',
      component: Login, // Login 컴포넌트 사용
    },
    {
      path: '/api/board',
      name: 'boardList',
      component: boardList,
    },
    {
      path: '/api/board/:boardId',
      name: 'BoardDetails',
      component: BoardDetails,
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
    {
      path:"/home",
      name: "home",
      component: HomeView,
    },
    {
      path: "/schedule",
      name: "schedule",
      component: ScheduleView, // Renders HeaderSection, ScheduleSection, FooterSection
    },
    {
      path: "/create",
      name: "create",
      component: CreateScheduleView, // Renders HeaderSection, CreateScheduleSection, FooterSection
    },
  ],
})

export default router;
