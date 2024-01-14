<template>
  <div class="root">
    <h2 class="h-2 form-header">Авторизация</h2>

    <FormKit type="form" :actions="false" class="form" @submit="auth">
      <FormKit
        v-focus
        type="email"
        label="Введите логин"
        placeholder="example@example.com"
        name="email"
        validation="required|*email"
      />
      <FormKit
        type="password"
        label="Введите пароль"
        name="password"
        placeholder="qwerty123"
        prefix-icon="password"
        suffix-icon="eyeClosed"
        @suffix-icon-click="pwVisibile"
        suffix-icon-class="hover:text-blue-500"
      />
      <div class="flex">
        <router-link :to="{ name: 'signup' }" class="sign-up">
          Регистрация
        </router-link>
        <FormKit type="submit" label="Войти" />
      </div>
    </FormKit>

    <ul>
      <li>мокап данные из бд для авторизации</li>
      <li>
        "name": "Юзер", "surname": "Юзерович", "email": "user@user.ru",
        "password": "user"
      </li>
      <li>
        "name": "Ментор", "surname": "Менторович", "email": "mentor@mentor.ru",
        "password": "mentor"
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
import { useRouter } from "vue-router";
import axios from "axios";
import pwVisibile from "@/helpers/pwVisibile.js";

const router = useRouter();

const auth = async (data) => {
  axios
    .post("http://localhost:3000/api/auth/sign-in", data)
    .then((r) => {
      localStorage.setItem("logged", JSON.stringify(r.data));
      router.push({ name: "home" });
    })
    .catch((error) => {
      console.log(error);
    });
};
</script>

<style lang="scss" scoped>
.root {
  margin: 0 auto;
  max-width: 50%;
  width: 50%;

  display: flex;
  flex-direction: column;

  gap: 20px;
}

.flex {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.formkit-form {
  display: flex;
  flex-direction: column;
  padding: 1em 20px;
  border: 1px solid #94929c;
  border-radius: 8px;
  max-width: none;
  width: 100%;
}

.sign-up {
  font-size: var(--fk-font-size-button);
  border-radius: var(--fk-border-radius);
  cursor: pointer;
  display: inline-flex;
  width: auto;
  justify-content: center;
  padding: var(--fk-padding-button);
  margin: var(--fk-margin-button);
  border: 1px solid transparent;
  line-height: var(--fk-line-height-button);
  background: var(--fk-bg-submit);
  color: var(--fk-color-submit);
}
</style>