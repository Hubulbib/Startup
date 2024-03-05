<template>
  <div class="wrapper">
    <div class="header">
      <div class="header__wrapper">
        <router-link class="header__logo" :to="{ name: 'home' }">Logo</router-link>
      </div>
      <nav class="header__nav">
        <router-link class="header__link" :to="{ name: 'home' }">Главная</router-link>
        <router-link class="header__link" :to="{ name: 'account' }">Личный кабинет</router-link>
        <router-link class="header__link" :to="{ name: 'home' }">Поддержка</router-link>
      </nav>
      <ThemeSwitch class="header__theme-switch" />
      <div class="header__account">
        <span v-if="authStore.isLoading" class="skeleton skeleton--circle"></span>
        <user-avatar v-if="authStore.isAuth && !authStore.isLoading" :size="100" :user="userStore.user"
          @click="redirectUser"></user-avatar>
        <my-button v-if="authStore.isAuth" @click="authStore.logout" class="">Выйти</my-button>
      </div>
      <div v-if="!authStore.isAuth && !authStore.isLoading" class="header__user-actions">
        <router-link class="header__register" :to="{ name: 'signup' }">
          Зарегистрироваться
        </router-link>
        <router-link class="header__login" :to="{ name: 'login' }">
          <my-svg name="dummy-user"></my-svg>
          <span class="header__login-text">Войти</span>
        </router-link>
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

import ThemeSwitch from '@/components/UI/ThemeSwitch.vue';

const authStore = useAuthStore();
const userStore = useUserStore();
const router = useRouter();

const redirectUser = function () {
  if (authStore.isAuth) {
    router.push({ name: 'account' });
  } else {
    router.push({ name: 'login' });
  }
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/abstract' as abs;

.wrapper {
  background-color: var(--clr-prime);
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
  justify-content: space-between;
  align-items: center;

  font-size: 35px;

  $gap: 40px;

  &__wrapper {
    display: flex;
    align-items: center;
    gap: $gap;

    &>* {
      display: flex;
      align-items: center;
    }
  }

  &__nav {
    @include abs.flex-center;
    gap: 32px;
  }

  &__link {
    font-size: 16px;
    color: var(--clr-text-secondary);
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

    &--switch {
      @include abs.btn-reset;
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

  &__user-actions {
    display: flex;
    gap: 50px;
  }

  &__login {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 8px 16px;
    border: 1px solid var(--clr-border);
    border-radius: 8px;
    color: var(--clr-text-prime);
  }

  &__register {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 8px 16px;
    border: 1px solid var(--clr-border);
    border-radius: 8px;
    font-size: 16px;
    color: var(--clr-text-prime);
  }

  &__login-text {
    font-size: 16px;
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
