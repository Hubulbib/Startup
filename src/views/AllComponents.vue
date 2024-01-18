<template>
  <div class="view-container">
    <h1 class="h-1">Солянка компонентов</h1>
    <h2>Проверка редиректа после логина</h2>
    <my-button @click="redirectToLogin">Редирект на логин</my-button>
    <h2>AppLink - проверка: внешняя или внутренняя ссылка</h2>
    <p>Три ссылки в тексте подряд:
      <AppLink to="https://www.google.com">Google.com</AppLink>,
      <AppLink to="/cms">внутренняя ссылка с абсолютным url</AppLink>,
      <AppLink :to="{ name: 'profile' }">внутренняя ссылка с объектом</AppLink>.
    </p>
    <h2>Mentors List</h2>
    <p>Имя ментора - ссылка на профайл</p>
    <mentors-list></mentors-list>
    <h2>UI select</h2>
    <my-select :optionsData="optionsData" v-model="deafaultValue" />
    <h2>UI technical icons</h2>
    <a
      href="https://icon-sets.iconify.design/material-symbols/battery-horiz-075/"
      target="_blank">
      ИКОНКИ БРАТЬ ЗДЕСЬ
    </a>
    <Icon icon="mdi:youtube" width="96" color="#15CA82" />
    <h2>UI custom svg</h2>
    <my-svg :name="dynamicIcon" />
    <my-button @click="changeIconName('rect')" class="btn">
      Сменить иконку на Rect
    </my-button>
    <my-button @click="changeIconName('wave')" class="btn">
      Сменить иконку на Wave
    </my-button>
    <my-button @click="changeIconName('battery')" class="btn">
      Сменить иконку на Battery
    </my-button>
    <h2>UI buttons</h2>
    <div style="margin-bottom: 20px; display: flex; gap: 20px">
      <my-button>Button 1</my-button>
      <my-button :disabled="true">Button 2</my-button>
    </div>
    <h2>UI User Avatar</h2>
    <div
      style="
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-bottom: 20px;
        ">
      <user-avatar :user="user" />
      <user-avatar />
      <user-avatar :user="user2" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import MySelectMockup from "@/mockups/MySelectMockup.js";
import MentorsList from '@/components/MentorsList.vue';
import axios from "axios";
import AppLink from "@/components/UI/AppLink.vue";
import { useRoute, useRouter } from 'vue-router'

const router = useRouter();
const route = useRoute();

const redirectToLogin = () => {
  router.push({name: 'login', query: { redirect: route.path}})
}

const deafaultValue = ref("Выберите...");
const optionsData = ref(MySelectMockup);

const dynamicIcon = ref("rect");

const user = {
  name: "Dmitry",
  surname: "Aronov",
};

const user2 = {
  name: "John",
  surname: "Doe",
  avatar: "/images/users/avatars/avatar_example.jpeg",
};

const changeIconName = (name) => {
  dynamicIcon.value = name;
};

onMounted(async () => {
  // http://localhost:3000/api/...
  try {
    const response = await axios.get("http://localhost:3000/api/user");
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
});
</script>

<style lang="scss"></style>
