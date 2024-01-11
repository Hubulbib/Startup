<template>
  <form @submit.prevent="auth" class="form">
    <input v-focus v-model="login" type="text" placeholder="Логин" />
    <input v-model="password" type="password" placeholder="Пароль" />
    <my-button type="submit">Send</my-button>
  </form>
</template>

<script setup>
import { useSignIn } from "@/hooks/useSignIn.js";
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();

const login = ref("user@user.ru");
const password = ref("user");

const auth = async () => {
  axios
        .post("http://localhost:3000/api/auth/sign-in", {
            email: login.value,
            password: password.value,
        })
        .then((r) => {
            localStorage.setItem('logged', JSON.stringify(r.data))
            router.push({ name: 'home' })
        })
        .catch((error) => {
            console.log(error);
        });
};

</script>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 8px;

  & button {
    align-self: flex-end;
  }
}
</style>