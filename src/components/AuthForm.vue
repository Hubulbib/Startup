<template>
  <form @submit.prevent="auth" class="form">
    <input v-focus @input="updateLogin" type="text" placeholder="Логин" />
    <input @input="updatePassword" type="text" placeholder="Пароль" />
    <my-button type="submit">Send</my-button>
  </form>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";

const login = ref("");
const password = ref("");

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
      // headers: {
      //   'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NDRlZTA2ZWEyZTg4NzBhMTY3YjdkOCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjk5MDE2MjE0LCJleHAiOjE2OTkxMDI2MTR9.fJVhMESSh-LQYBWzBZrUmCZobhMmZf8MK4yTU0U7uXg '
      // }
    })
    .then((response) => {
      // console.log(response.data);
      axios.get("http://localhost:3000/api/user", {
        headers: {
          'Authorization': `Bearer ${response.data}`
        }
      }).then(r => console.log(r.data))
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
}

input {
  padding: 10px 20px;
  font-size: 22px;
}
</style>