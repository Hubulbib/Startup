<script setup>
import axios from "axios";
import { ref } from "vue";
import pwVisibile from "@/helpers/pwVisibile.js";

const name = ref("");
const surname = ref("");
const email = ref("");
const password = ref("");
const userCategory = ref(null);

const registration = async () => {
  const user = {
    name: name.value,
    surname: surname.value,
    email: email.value,
    password: password.value,
    role: userCategory.value,
  };

  axios.post("http://localhost:3000/api/auth/sign-up", user).then((r) => {
    localStorage.setItem("logged", JSON.stringify(r.data));
    router.push({ name: "home" });
  });
};
</script>

<template>
  <div class="wrapper">
    <h2 class="form-header">Регистрация</h2>
    <FormKit type="form" :actions="false" @submit="registration">
      <FormKit
        v-focus
        type="text"
        label="Имя"
        v-model="name"
        validation="required|length:3"
        placeholder="Иван"
      />
      <FormKit
        type="text"
        label="Фамилия"
        v-model="surname"
        validation="required|length:3"
        placeholder="Иванов"
      />
      <FormKit
        type="email"
        label="Почта"
        v-model="email"
        placeholder="example@example.com"
        validation="required|length:5|*email"
      />
      <FormKit
        type="password"
        label="Пароль"
        name="password"
        v-model="password"
        validation="required"
        prefix-icon="password"
        suffix-icon="eyeClosed"
        @suffix-icon-click="pwVisibile"
        suffix-icon-class="hover:text-blue-500"
      />
      <FormKit
        type="password"
        name="password_confirm"
        label="Подтвердите пароль"
        validation="required|confirm"
        prefix-icon="password"
        suffix-icon="eyeClosed"
        @suffix-icon-click="pwVisibile"
        suffix-icon-class="hover:text-blue-500"
      />
      <FormKit
        type="radio"
        v-model="userCategory"
        label="Роль"
        validation="required"
        :options="{
          user: 'Пользователь',
          mentor: 'Ментор',
        }"
      />
      <div class="double">
        <router-link :to="{ name: 'login' }" class="sign-in">
          Уже есть аккаунт
        </router-link>
        <FormKit type="submit" label="Зарегистрироваться" class="form-submit" />
      </div>
    </FormKit>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  margin: 0 auto;
  max-width: 50%;
  width: 50%;

  .formkit-form {
    display: flex;
    flex-direction: column;
    padding: 1em 20px;
    border: 1px solid #94929c;
    border-radius: 8px;
    max-width: none;
    width: 100%;
  }

  .form-header {
    margin-bottom: 20px;
  }
}

.separator {
  margin-bottom: 20px;
}

.sign-in {
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

.double {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}
</style>