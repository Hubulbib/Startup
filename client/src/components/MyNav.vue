<template>
  <nav class="nav">
    <!-- <Icon style="cursor: pointer;" @click="$router.back()" icon="ion:arrow-back-circle-outline" width="75" height="75" /> -->
    <!-- <router-link :to="{name: 'home'}" class="nav__item">Homepage</router-link> -->
    <router-link v-if="isMentorAccess" :to="{name: 'cms'}" class="nav__item">Создание статьи</router-link>
    <router-link :to="{name: 'allcomponents'}" class="nav__item">Солянка</router-link>
    <!-- <router-link :to="{name: 'account'}" class="nav__item">Личный кабинет</router-link> -->
    <router-link :to="{name: 'profile'}" class="nav__item">Профайл</router-link>
    <!-- <router-link :to="{name: 'login'}" class="nav__item">Логин</router-link> -->
    <!-- <router-link :to="{name: 'signup'}" class="nav__item">Регистрация</router-link> -->
  </nav>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import ls from "@/helpers/localStorageHelpers.js";

const router = useRouter()
const isMentorAccess = ref(false)

watch(router.currentRoute, () => {
  const user = ls.getUser()

  if (!user) return isMentorAccess.value = false

  if (user.role.permissions.includes('article.create')) return isMentorAccess.value = true
})
</script>

<style lang="scss">
.nav {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;

  &__item {
    padding: 15px 25px;
    font-size: 18px;
    color: white;
    background-color: #666;
    border-radius: 15px;
    cursor: pointer;

    &.link--active {
      background-color: #999;
    }

    &:hover {
      background-color: #9b9b9b;
    }
  }
}

.h-1 {
    padding-bottom: 10px;
    margin-bottom: 20px;
    border-bottom: 1px solid #666;
  }


</style>
