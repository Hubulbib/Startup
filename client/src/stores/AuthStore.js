import { defineStore } from "pinia";
import { ref } from 'vue';
import { API_URL } from "@/http/api";
import AuthService from '@/services/AuthService';
import ls from '@/helpers/localStorageHelpers.js'
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
import { useUserStore } from "./userStore";

export const useAuthStore = defineStore('AuthStore', () => {
  const userStore = useUserStore()

  const router = useRouter();
  const route = useRoute();

  const isAuth = ref(false);

  const onLoadAuthCheck = async function() {
    try {
      const res = await axios.post(`${API_URL}/auth/refresh`, {}, { withCredentials: true });
      console.log(res.data)
      ls.saveToken(res.data.accessToken);
      isAuth.value = true;
      userStore.user = res.data.user;
    }
    catch (e) {
      console.log(e?.message);
      console.log(e?.response?.data);
    }
  }

  const signup = async function(data) {
    try {
      const res = await AuthService.signup(data);
      ls.saveToken(res.data.accessToken);
      isAuth.value = true;
      userStore.user = res.data.user;
      router.push({ name: 'home' });
    } catch (e) {
      console.log(e?.response?.data);
    }
  };

  const login = async function(email, password) {
    try {
      const res = await AuthService.login(email, password);
      ls.saveToken(res.data.accessToken);
      isAuth.value = true;
      userStore.user = res.data.user;

      if (route.query.redirect) {          // если пользователя перекинуло на страницу логина после действия, требующего авторизации
        router.push(route.query.redirect)  // после логина он будет возвращён на ту же страницу
      } else {                             // на действие надо навесить router.push({ name: 'login', query: { redirect: route.path } })
        router.push({ name: 'home' })      // см. пример в солянке компонентов
      }

    } catch (e) {
      console.log(e?.response?.data);
    }
  };

  const logout = async function() {
    if (!isAuth.value) {
      console.log(`You're not logged in!`)
      return
    }
    try {
      await AuthService.logout();
      ls.removeToken();
      isAuth.value = false;
      userStore.user = {};
      router.push({ name: 'home' })
    } catch (e) {
      console.log(e);
    }
  };

  return {
    isAuth, onLoadAuthCheck, signup, login, logout
  }
});
