import { createRouter, createWebHistory } from 'vue-router'
import { useArticleStore } from '@/stores/ArticleStore';
import { useAuthStore } from '@/stores/AuthStore';

const routes = [
  // webpackChunkName - позволяет задать красивые имена отдельным js файлам на этапе сборки проекта (npm run build)
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "Home" */'@/views/Home.vue'),
    alias: ['/home', '/index.html', '/index'],
    // beforeEnter: async (to, from, next) => { // prevent loading account component before UserStore is initialized
    //   const articleStore = useArticleStore()
    //   try {
    //     await articleStore.fetchArticles()
    //   } catch (error) {
    //     console.log(error);
    //   }
    //   next();
    // }
  },
  {
    path: '/article/:title/:id',
    name: 'article.show',
    component: () => import(/* webpackChunkName: "article" */ '@/views/Article.vue'),
    props: route => ({ id: route.params.id }),
    // beforeEnter: async (to, from, next) => { // prevent loading account component before UserStore is initialized
    //   const authStore = useAuthStore()
    //   if (!authStore.isAuth) {
    //     await authStore.onLoadAuthCheck();
    //   }
    //   next();
    // }
  },
  { path: '/cms', name: 'cms', component: () => import(/* webpackChunkName: "cms" */'@/views/CreateArticle.vue') },
  {
    path: '/cms/:id',
    name: 'cms.edit',
    component: () => import(/* webpackChunkName: "cmsedit" */'@/views/EditArticle.vue'),
    props: route => ({ id: route.params.id })
  },
  {
    path: '/account/info',
    name: 'account',
    component: () => import(/* webpackChunkName: "account"*/'@/views/PersonalAccount.vue'),
    // beforeEnter: async (to, from, next) => { // prevent loading account component before UserStore is initialized
    //   const authStore = useAuthStore()
    //   if (!authStore.isAuth) return false
    //   next();
    // }
  },
  {
    path: '/account/my-articles',
    name: 'my-articles',
    component: () => import(/* webpackChunkName: "myarticles"*/'@/views/MyArticles.vue')
  },
  {
    path: '/account/my-subscriptions',
    name: 'my-subscriptions',
    component: () => import(/* webpackChunkName: "mysubscriptions"*/'@/views/MySubscriptions.vue')
  },
  {
    path: '/account/quarantine',
    name: 'quarantine',
    component: () => import(/* webpackChunkName: "quarantine"*/'@/views/Quarantine.vue')
  },
  {
    path: '/account/articles-to-verify',
    name: 'articles-to-verify',
    component: () => import(/* webpackChunkName: "articlestoverify"*/'@/views/ArticlesToVerify.vue')
  },
  {
    path: '/account/search-users',
    name: 'search-users',
    component: () => import(/* webpackChunkName: "searchusers"*/'@/views/SearchUsers.vue')
  },
  { path: '/account/profile', name: 'profile', component: () => import(/* webpackChunkName: "" */'@/views/AccountProfile.vue') },
  {
    path: '/profile/:id',
    name: 'profile.show',
    component: () => import(/* webpackChunkName: "user" */'@/views/UserProfile.vue'),
    props: route => ({ id: route.params.id })
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

router.beforeResolve(async (to) => {
  const articleStore = useArticleStore()
  const authStore = useAuthStore()

  if (to.name === 'home') {
    try {
      await articleStore.fetchArticles()
    } catch (error) {
      console.log(error);
    }
  }

  if (to.name === 'account') {
    try {
      await authStore.onLoadAuthCheck()
    } catch (error) {
      console.log(error);
    }
  }

  if (['cms', 'cms.edit'].includes(to.name)) {
    console.log(to.name)
  }
})

export default router;
