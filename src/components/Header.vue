<template>
  <div class="wrapper">
    <div class="header">
      <div class="header__wrapper">
        <router-link class="header__logo" :to="{ name: 'home' } ">Logo</router-link>
        <h2 class="header__desc">Шапка сайта</h2>
      </div>
      <div class="header__account">
        <my-button class="header__account--switch">THEME</my-button>
        <router-link :to="{ name: 'account' }" v-if="isLogged" class="header__account--user">
          <img src="@/assets/empty-avatar.svg" alt="Аватарка пользователя" />
          <span>{{ user.name }} {{ user.surname }}</span>
        </router-link>
        <router-link v-else :to="{ name: 'login' }" class="header__account--login">Войти</router-link>
      </div>
      <my-button v-if="isLogged" @click="logOut" class="">Выйти</my-button>
    </div>
  </div>
</template>

<!--
    TODO:
    SMART STICKY ANIMATED HEADER
-->

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const isLogged = ref(false)
const user = ref(null)

const logOut = () => {
  localStorage.removeItem('logged')

  isLogged.value = false
  user.value = null

  window.location.reload()
}

watch(router.currentRoute, () => {
  const data = JSON.parse(localStorage.getItem('logged'))
  
  if (data === null) return

  isLogged.value = true
  user.value = data.user
}, { immediate: true })

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

    & > * {
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
}
</style>
