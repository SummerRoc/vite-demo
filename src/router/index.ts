import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { menu } from './menu';

const childrenRoutes: RouteRecordRaw[] = menu.map((item) => ({
  path: item.url.replace(/^\//, ''),
  name: item.label,
  component: () => import(`@/views/${item.label}.vue`),
}));

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    children: childrenRoutes,
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
