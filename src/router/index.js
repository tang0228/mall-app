import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import List from '@/views/List.vue';
import Shopping from '@/views/Shopping.vue';
import Search from '@/components/Search.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: 'list',
        component: List,
      },
      {
        path: 'shopping',
        component: Shopping,
      },
    ],
  },
  {
    path: '/search',
    component: Search,
  },
  {
    path: '*',
    redirect: '/home',
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
