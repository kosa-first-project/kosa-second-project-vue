import { createRouter, createWebHistory } from "vue-router";
import ScheduleView from "../views/ScheduleView.vue"; 
import CreateScheduleView from "../views/CreateScheduleView.vue";
import HomeView from "../views/HomeView.vue";

const routes = [
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
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
