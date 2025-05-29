import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

// 使用 RouteRecordRaw 类型定义路由数组
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
  },
  // {
  //  示例：动态路由参数
  //  path: '/user/:id',
  //  component: () => import("@/views/User.vue"),
  //  props: true // 启用 props 接收路由参数
  // },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
