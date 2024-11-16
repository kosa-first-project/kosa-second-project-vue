import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GuideCard from '../components/GuideCard.vue';  // 위에서 만든 컴포넌트 임포트
import MypageGuide from '../components/MypageGuide.vue'; 
import GuideForm from '../components/GuideForm.vue'; 
import GuideDetail from '../components/GuideDetail.vue'; 

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/guide',
      name: 'Guide',
      component: GuideCard,  // /guide 경로에 GuideCard 컴포넌트 렌더링
    },
    {
      path: '/mypageguide',
      name: 'MypageGuide',
      component: MypageGuide,  // /guide 경로에 GuideCard 컴포넌트 렌더링
    },
    {
      path: '/guideform',
      name: 'GuideForm',
      component: GuideForm,  // /guide 경로에 GuideCard 컴포넌트 렌더링
    },
    {
      //path: '/guide/:id',
      path: '/guidedetail',
      name: 'GuideDetail',
      component: GuideDetail,  // /guide 경로에 GuideCard 컴포넌트 렌더링
    },
  ],
})

export default router
