<template>
  <div class="view-container">

    <h1 class="h-1">Личный кабинет</h1>
    <p style="font-size: 22px;">Надо сделать компонент</p>

    <div v-if="authStore.isAuth">
      <div style="margin: 20px 0;" class="h3">Логаут</div>
      <my-button @click="logout">Выйти</my-button>
    </div>

  </div>
</template>
<script setup>
import { useAuthStore } from '@/stores/AuthStore';
const authStore = useAuthStore();
const logout = () => {
  authStore.logout();
};


</script>

