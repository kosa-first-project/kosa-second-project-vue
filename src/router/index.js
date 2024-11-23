import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GuideCard from '../components/GuideCard.vue'
import MypageGuide from '../components/MypageGuide.vue'
import GuideForm from '../components/GuideForm.vue'
import GuideDetail from '../components/GuideDetail.vue'
import Login from '../views/Login.vue';
import ScheduleView from "../views/ScheduleView.vue"; 
import CreateScheduleView from "../views/CreateScheduleView.vue";
import EditScheduleView from "../views/EditScheduleView.vue";
import BoardList from '@/components/board/BoardList.vue';
import BoardDetails from '@/components/board/BoardDetails.vue';
import BoardForm from '../components/board/BoardForm.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login', // 로그인 페이지 라우트
      name: 'login',
      component: Login, // Login 컴포넌트 사용
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
      path: "/schedule",
      name: "schedule",
      component: ScheduleView, // Renders HeaderSection, ScheduleSection, FooterSection
    },
    {
      path: "/create",
      name: "create",
      component: CreateScheduleView, // Renders HeaderSection, CreateScheduleSection, FooterSection
    },
    {
      path:"/schedule/edit/:id",
      name: "edit",
      component: EditScheduleView,
      props: true,
    },
    {
      path: '/board',
      name: 'BoardList', // 라우트 이름 수정 (첫 글자 대문자)
      component: BoardList,
    },
    {
      path: '/board/:boardId',
      name: 'BoardDetails',
      component: BoardDetails,
    },
    {
      path: '/board/write',
      name: 'BoardForm', // 라우트 이름 수정
      component: BoardForm,
    },
    {
      path: '/board/:boardId/edit',
      name: 'BoardEdit',
      component: BoardForm,
      props: { editing: true },
    },
  ],
})

export default router
