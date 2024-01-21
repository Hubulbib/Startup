import { createRouter, createWebHistory } from 'vue-router'
import { useArticleStore } from '@/stores/ArticleStore';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "Home" */'@/views/Home.vue'),
    alias: ['/home', '/index.html', '/index']
  },
  { path: '/allcomponents', name: 'allcomponents', component: () => import(/* webpackChunkName: "AllComponents" */ '@/views/AllComponents.vue') },
  // webpackChunkName - позволяет задать красивые имена отдельным js файлам на этапе сборки проекта (npm run build)
  {
    path: '/article/:id(\\d+)/:title*',
    name: 'article.show',
    component: () => import(/* webpackChunkName: "article" */ '@/views/Article.vue'),
    props: route => ({ id: parseInt(route.params.id) })
  },
  { path: '/cms', name: 'cms', component: () => import(/* webpackChunkName: "cms" */'@/views/CreateArticle.vue') },
  {
    path: '/cms/:id(\\d+)',
    name: 'cms.edit',
    component: () => import(/* webpackChunkName: "cmsedit" */'@/views/EditArticle.vue'),
    props: route => ({ id: parseInt(route.params.id) })
  },
  { path: '/account', name: 'account', component: () => import(/* webpackChunkName: "account"*/'@/views/PersonalAccount.vue') },
  { path: '/profile', name: 'profile', component: () => import(/* webpackChunkName: "" */'@/views/AccountProfile.vue') },
  {
    path: '/profile/:id(\\d+)',
    name: 'profile.show',
    component: () => import(/* webpackChunkName: "user" */'@/views/UserProfile.vue'),
    props: route => ({ id: parseInt(route.params.id) })
  },
  { path: '/login', name: 'login', component: () => import(/* webpackChunkName: "login" */'@/views/Login.vue') },
  { path: '/signup', name: 'signup', component: () => import(/* webpackChunkName: "signup" */'@/views/Signup.vue') },
  {
    path: '/:pathMatch(.*)*', name: 'notfound', component: () => import(/* webpackChunkName: "notfound" */'@/views/404.vue')
  }

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'link--active',            // кастомное имя класса активной router-ссылки
  linkExactActiveClass: 'exact-link--active', //
  scrollBehavior(to, from, savedPosition) { //
    return savedPosition || new Promise((res) => {  // сбрасывает скролл на начало страницы при переходе на ссылку
      setTimeout(() => res({
        top: 0,
        behavior: 'smooth'
      }), 250); // установить значение ms такое же, как значение transition-duration в App.vue
    });
  }
});

router.beforeResolve(async to => {
  const articleStore = useArticleStore()

  if (to.name !== 'home') return

  try {
    await articleStore.fetchArticles()
  } catch (error) {
    console.log(error);
  }

})

export default router;
