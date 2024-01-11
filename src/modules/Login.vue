<template>
  <div class="root">
    <h1 class="h-1">Авторизация</h1>

    <AuthForm></AuthForm>

    <separator />

    <router-link :to="{ name: 'signup' }"> Регистрация </router-link>

    <ul>
      <li>
        мокап данные из бд для авторизации
      </li>
      <li>
        "name": "Юзер", "surname": "Юзерович", "email": "user@user.ru",
        "password": "user"
      </li>
      <li>
        "name": "Ментор", "surname": "Менторович", "email":
        "mentor@mentor.ru", "password": "mentor"
      </li>
      <li>
        "name": "Админ", "surname": "Админович", "email": "admin@admin.ru",
        "password": "admin"
      </li>
      <li>
        "name": "Хед", "surname": "Хедович", "email": "head@head.ru",
        "password": "head"
      </li>
    </ul>
  </div>
</template>

<script setup>
import AuthForm from "@/components/AuthForm.vue";
</script>

<style lang="scss" scoped>
.root {
  display: flex;
  flex-direction: column;

  gap: 20px;
}

.separator {
  background-color: #8c8b8b;
  width: 100%;
  height: 3px;
}
</style>