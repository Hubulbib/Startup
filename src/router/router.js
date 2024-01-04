import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
  	path: '/allcomponents',
  	name: 'allcomponents',
  	component: () => import(/* webpackChunkName: "AllComponents" */ '@/views/AllComponents.vue')
    // webpackChunkName - позволяет задать красивые имена отдельным js файлам на этапе сборки проекта (npm run build)
  },
  {
    path: '/article/:id/:title',
    name: 'article.show',
    component: () => import(/* webpackChunkName: "article" */ '@/views/Article.vue'),
    props: route => ({id: parseInt(route.params.id)})
  },
  {
    path: '/cms',
    name: 'cms',
    component: () => import(/* webpackChunkName: "cms" */'@/views/CreateArticle.vue')
  },
  {
    path: '/cms/:id',
    name: 'cms.edit',
    component: () => import(/* webpackChunkName: "cmsedit" */'@/views/EditArticle.vue'),
    props: route => ({id: parseInt(route.params.id)})
  },
  {
    path: '/account',
    name: 'account',
    component: () => import(/* webpackChunkName: "account"*/'@/views/PersonalAccount.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import(/* webpackChunkName: "" */'@/views/AccountProfile.vue')
  },
  {
    path: '/profile/:id',
    name: 'profile.show',
    component: () => import(/* webpackChunkName: "user" */'@/views/UserProfile.vue'),
    props: route => ({id: parseInt(route.params.id)})
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */'@/views/Login.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import(/* webpackChunkName: "signup" */'@/views/Signup.vue')
  }

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'link--active',           // кастомное имя класса активной router-ссылки
  linkExactActiveClass: 'exact-link--active' //
});

export default router;
