<template>
  <nav class="nav">
    <router-link v-if="permissions.includes('article.create')" :to="{ name: 'cms' }" class="nav__item">Создание
      статьи</router-link>
    <router-link :to="{ name: 'profile' }" class="nav__item">Профайл</router-link>
  </nav>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import { useAuthStore } from "@/stores/AuthStore";
import { useUserStore } from "@/stores/userStore";

const authStore = useAuthStore()
const userStore = useUserStore()
const permissions = ref([])

watchEffect(() => {
  authStore.isAuth
    ? permissions.value = [...userStore.user.role.permissions]
    : permissions.value = []
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
    background-color: var(--clr-bg);
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
  border-bottom: 1px solid var(--clr-border);
}
</style>
