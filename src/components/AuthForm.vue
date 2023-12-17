<template>
  <form @submit.prevent="auth" class="form">
    <input v-focus v-model="login" @input="updateLogin" type="text" placeholder="Логин" />
    <input v-model="password" @input="updatePassword" type="password" placeholder="Пароль" />
    <my-button type="submit">Send</my-button>
  </form>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";

const login = ref("test@test1.ru");
const password = ref("test");

const updateLogin = () => {
  login.value = event.target.value;
};

const updatePassword = () => {
  password.value = event.target.value;
};

const auth = async () => {
  axios
    .post("http://localhost:3000/api/auth", {
      email: login.value,
      password: password.value,

    })
    .then((r) => console.log(r.data))
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