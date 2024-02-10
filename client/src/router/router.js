import { createRouter, createWebHistory } from 'vue-router'
import { useArticleStore } from '@/stores/ArticleStore';
import { useAuthStore } from '@/stores/AuthStore';
import { useUserStore } from '@/stores/userStore';

let isAppFirstLoad = true;

// текущие разрешения по ролям:
// head: ['role.create', 'role.edit', 'role.delete', 'user.mentor.request']
// admin: ['article.verficitaion', 'user.penalty', 'user.ban']
// mentor: ['article.create', 'article.edit', 'article.delete']
// user: []

const routes = [
  // webpackChunkName - позволяет задать красивые имена отдельным js файлам на этапе сборки проекта (npm run build)
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "Home" */'@/views/Home.vue'),
    alias: ['/home', '/index.html', '/index'],
  },
  {
    path: '/article/:title/:id',
    name: 'article.show',
    component: () => import(/* webpackChunkName: "article" */ '@/views/Article.vue'),
    props: route => ({ id: route.params.id }),
  },
  {
    path: '/cms',
    name: 'cms',
    component: () => import(/* webpackChunkName: "cms" */'@/views/CreateArticle.vue'),
    meta: {
      requiresAuth: true,
      requiresPermission: 'article.create'
    }
  },
  {
    path: '/cms/:id',
    name: 'cms.edit',
    component: () => import(/* webpackChunkName: "cmsedit" */'@/views/EditArticle.vue'),
    props: route => ({ id: route.params.id }),
    meta: {
      requiresAuth: true,
      requiresPermission: 'article.edit'
    }
  },
  {
    path: '/account/info',
    name: 'account',
    component: () => import(/* webpackChunkName: "account"*/'@/views/PersonalAccount.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/account/my-articles',
    name: 'my-articles',
    component: () => import(/* webpackChunkName: "myarticles"*/'@/views/MyArticles.vue'),
    meta: {
      requiresAuth: true,
      requiresPermission: 'article.create'
    }
  },
  {
    path: '/account/my-subscriptions',
    name: 'my-subscriptions',
    component: () => import(/* webpackChunkName: "mysubscriptions"*/'@/views/MySubscriptions.vue'),
    meta: {
      requiresAuth: true,
      requiresRole: 'mentor' // заменить на requiresPermission: 'article.subscribe'
    }
  },
  {
    path: '/account/quarantine',
    name: 'quarantine',
    component: () => import(/* webpackChunkName: "quarantine"*/'@/views/Quarantine.vue'),
    meta: {
      requiresAuth: true,
      requiresPermission: 'article.verficitaion'
    }
  },
  {
    path: '/account/articles-to-verify',
    name: 'articles-to-verify',
    component: () => import(/* webpackChunkName: "articlestoverify"*/'@/views/ArticlesToVerify.vue'),
    meta: {
      requiresAuth: true,
      requiresPermission: 'article.verficitaion'
    }
  },
  {
    path: '/account/search-users',
    name: 'search-users',
    component: () => import(/* webpackChunkName: "searchusers"*/'@/views/SearchUsers.vue'),
    meta: {
      requiresAuth: true,
      requiresPermission: 'user.ban'
    }
  },
  {
    path: '/account/profile',
    name: 'profile',
    component: () => import(/* webpackChunkName: "" */'@/views/AccountProfile.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/profile/:id',
    name: 'profile.show',
    component: () => import(/* webpackChunkName: "user" */'@/views/UserProfile.vue'),
    props: route => ({ id: route.params.id }),
    meta: {
      requiresAuth: true,

    }
  },
  { path: '/login', name: 'login', component: () => import(/* webpackChunkName: "login" */'@/views/Login.vue') },
  { path: '/signup', name: 'signup', component: () => import(/* webpackChunkName: "signup" */'@/views/Signup.vue') },
  { path: '/:pathMatch(.*)*', name: 'notfound', component: () => import(/* webpackChunkName: "notfound" */'@/views/404.vue') },
  { path: '/access-denied', name: 'denied', component: () => import(/* webpackChunkName: "denied" */'@/views/403.vue') }

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

router.beforeEach(async (to) => {
  const authStore = useAuthStore();
  const userStore = useUserStore();

  if (isAppFirstLoad) {
    try {
      await authStore.onLoadAuthCheck()
    } catch (e) {
      console.log(e?.message)
    } finally {
      isAppFirstLoad = false
      authStore.isLoading = false;
    }
  }

  if (to.meta.requiresAuth) {
    if (!authStore.isAuth)
      return {
        name: 'login',
        query: { redirect: to.fullPath }
      }
    if (to.meta.requiresPermission && authStore.isAuth && !userStore.user.role.permissions.includes(to.meta.requiresPermission)) {
      return {
        name: 'denied'
      }
    } else if (to.meta.requiresRole && !(userStore.user.role.name === to.meta.requiresRole)) { // пока нет прописанных разрешений,
      return {                                                                                 // можно указывать роли
        name: 'denied'
      }
    }

  }
});

router.beforeResolve(async (to) => {
  const articleStore = useArticleStore()

  if (to.name === 'home') {
    try {
      await articleStore.fetchArticles()
    } catch (error) {
      console.log(error);
    }
  }
})

export default router;
