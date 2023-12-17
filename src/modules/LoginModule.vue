<template>
  <div class="root">
    <AuthForm v-if="isLogin"></AuthForm>
    <RegistrationForm v-else></RegistrationForm>

    <div class="separator"></div>
    
    <my-button v-if="isLogin" @click="toggle"> Регистрация </my-button>
    <my-button v-else @click="toggle"> Уже есть аккаунт </my-button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import AuthForm from "@/components/AuthForm.vue";
import RegistrationForm from "@/components/RegistrationForm.vue";

const isLogin = ref(true);

const toggle = () => {
  isLogin.value = !isLogin.value;
};
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