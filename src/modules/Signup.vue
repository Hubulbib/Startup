<template>
  <h1 class="h-1">Регистрация</h1>
  <RegistrationForm />
  <separator />
  <router-link :to="{ name: 'login' }">Уже есть аккаунт</router-link>
</template>

<script setup>
import RegistrationForm from '@/components/RegistrationForm.vue';
</script>

<style lang="scss" scoped>
</style>