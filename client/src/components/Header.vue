<template>
  <div class="wrapper">
    <div class="header">
      <div class="header__wrapper">
        <router-link class="header__logo" :to="{ name: 'home' }">Logo</router-link>
        <h2 v-if="authStore.isLoading">
          <span class="skeleton skeleton--rectangle"></span>
        </h2>
        <h2 v-else class="header__desc">Привет, {{ userStore.user ? `${userStore.user.name}
                  ${userStore.user.surname}` : 'анонимус' }}</h2>
      </div>
      <div class="header__account">
        <my-button class="header__account--switch">THEME</my-button>
        <span v-if="authStore.isLoading" class="skeleton skeleton--circle"></span>
        <user-avatar v-else :size="100" :user="userStore.user" @click="redirectUser"></user-avatar>
        <my-button v-if="authStore.isAuth" @click="authStore.logout" class="">Выйти</my-button>
      </div>
    </div>
  </div>
</template>

<!--
    TODO:
    SMART STICKY ANIMATED HEADER
-->

<script setup>
import { useAuthStore } from '@/stores/AuthStore';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const userStore = useUserStore();
const router = useRouter();

const redirectUser = function() {
  if (authStore.isAuth) {
    router.push({ name: 'account' });
  } else {
    router.push({ name: 'login' });
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  background-color: #e5e5e5;
  box-shadow: 0 1px 25px rgba($color: #000000, $alpha: 0.5);
  border-radius: 0 0 12px 12px;
  padding: 20px;

  margin-bottom: 40px;
}

.header {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  //   align-items: center;

  font-size: 35px;

  $gap: 40px;

  &__wrapper {
    display: flex;
    align-items: center;
    gap: $gap;

    margin-right: auto;

    &>* {
      display: flex;
      align-items: center;
    }
  }

  &__desc {
    min-height: 100%;
    font-size: 40px;
  }

  &__logo {
    padding: 20px;
    background-color: #4bb4ff;
    color: #fff;
    border-radius: 8px;

    position: relative;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      right: calc($gap / 2 * -1);
      width: 3px;
      height: 100%;
      background-color: #8c8b8b;
      transform: translateX(50%);
      pointer-events: none;
    }
  }

  &__account {
    min-width: min-content;
    display: flex;
    align-items: center;
    gap: $gap;

    &--login {
      display: flex;
      align-items: center;
      min-height: 100%;
      font-size: 22px;

      background-color: transparent;
      border: none;
      cursor: pointer;

      position: relative;

      &:hover {
        text-decoration: underline;
        color: #4bb4ff;
      }

      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: calc($gap / 2 * -1);
        width: 3px;
        height: 100%;
        background-color: #8c8b8b;
        transform: translateX(50%);
        pointer-events: none;
      }
    }
  }

  .skeleton {
    background-color: #ccc;
    background-image: linear-gradient(90deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0) 60%);
    background-size: 400px 400px;
    animation: shine 2s linear infinite;

    &--circle {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }

    &--rectangle {
      width: 400px;
      height: 60px;
    }
  }

  @keyframes shine {
    0% {
      background-position: top -200px left -200px;
    }

    100% {
      background-position: top 200px left 200px;
    }
  }
}
</style>
