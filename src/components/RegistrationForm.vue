<template>
  <form @submit.prevent="registration" class="form">
    <input v-focus v-model="name" type="text" placeholder="Имя" />
    <input v-model="surname" type="text" placeholder="Фамилия" />
    <input v-model="email" type="email" placeholder="E-mail" />
    <input v-model="password" type="password" placeholder="Введите пароль" />
    <input
      v-model="passwordCheck"
      type="password"
      placeholder="Повторите пароль"
    />
    <div class="form__options">
      <label class="option" tabindex="0">
        <input
          tabindex="-1"
          class="option__radio"
          type="radio"
          name="category"
          value="user"
          v-model="userCategory"
        />
        <span class="bubble bubble--user"></span>
        <div>Пользователь</div>
      </label>
      <label class="option" tabindex="0">
        <input
          tabindex="-1"
          class="option__radio"
          type="radio"
          name="category"
          value="menthor"
          v-model="userCategory"
        />
        <span class="bubble bubble--menthor"></span>
        <div>Ментор</div>
      </label>
    </div>
    <my-button type="submit">Submit</my-button>
  </form>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";

const name = ref("");
const surname = ref("");
const email = ref("");
const password = ref("");
const passwordCheck = ref("");
const userCategory = ref(null);

const validation = (user) => {
  for (const key in user) {
    if (!user[key]) {
      alert(`${user[key]} is empty`);
      return false;
    }
  }

  if (user.password !== passwordCheck.value) {
    alert(`PW missmatch`);
    return false;
  }

  return true;
};

const registration = async () => {
  const user = {
    name: name.value,
    surname: surname.value,
    email: email.value,
    password: password.value,
    role: userCategory.value,
  };

  if (!validation(user)) {
    return;
  }

  axios
    .post("http://localhost:3000/api/auth/registration", user)
    .then((r) => console.log(r.data));
};
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 20px;

  &__options {
    display: flex;
    gap: 20px;
    justify-content: space-between;
    margin-bottom: 20px;

    .option {
      display: flex;
      padding: 20px 40px;
      gap: 20px;
      background-color: #fff;
      border-radius: 8px;

      font-size: 22px;

      cursor: pointer;

      border: 1px solid black;

      position: relative;

      &:hover {
        background-color: rgba($color: #4bb4ff, $alpha: 0.1);
      }

      &:active {
        background-color: rgba($color: #4bb4ff, $alpha: 0.2);
      }

      &__radio {
        opacity: 0;

        &:checked + .bubble--user {
          background-color: teal;
        }

        &:checked + .bubble--menthor {
          background-color: purple;
        }
      }

      .bubble {
        position: absolute;
        top: 50%;
        left: 30px;
        transform: translateY(-50%);
        width: 25px;
        height: 25px;
        border-radius: 50%;
        border: 2px solid #000;

        &--user {
          border-color: teal;
          box-shadow: 0 0 10px teal, 0 0 5px teal;
        }
        &--menthor {
          border-color: purple;
          box-shadow: 0 0 10px purple, 0 0 5px purple;
        }
      }
    }
  }
}
</style>