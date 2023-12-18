<template>
  <Header></Header>
  <div class="app">
    <h2>UI select</h2>
    <my-select :optionsData="optionsData" v-model="deafaultValue" />

    <h2>UI technical icons</h2>
    <a
      href="https://icon-sets.iconify.design/material-symbols/battery-horiz-075/"
      target="_blank"
    >
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
      <my-button @click="testClick">Button 1</my-button>
      <my-button @click="testClick" :disabled="true">Button 2</my-button>
    </div>

    <h2>UI User Avatar</h2>
    <div
      style="
        display: flex;
        justify-content: center;
        gap: 20px;
        margin-bottom: 20px;
      "
    >
      <user-avatar :user="user" />
      <user-avatar />
      <user-avatar :user="user2" />
    </div>

    <h2>Article List</h2>
    <article-list />

    <h2>Mentors List</h2>
    <mentors-list></mentors-list>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import MySelectMockup from "@/mockups/MySelectMockup.js";
import ArticleList from "@/components/ArticleList.vue";
import MentorsList from '@/components/MentorsList.vue';
import Header from "@/components/Header.vue";
import axios from "axios";

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

const testClick = () => {
  console.log("clicked");
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

<style lang="scss">
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

ul {
  list-style: none;
}

a {
  text-decoration: none;
  cursor: pointer;
  color: currentColor;
}

input {
  border: 1px solid black;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 22px;

  &:hover {
    background-color: rgba($color: #4bb4ff, $alpha: 0.1);
  }

  &:active {
    background-color: rgba($color: #4bb4ff, $alpha: 0.2);
  }
}

button:disabled {
  background-color: #cacaca !important;
  color: rgba($color: #000000, $alpha: 0.5) !important;
  pointer-events: none;
  user-select: none;
}

@font-face {
  font-family: "Roboto";
  src: url("@/fonts/Roboto-Regular.ttf") format("truetype");
}

#app {
  font-family: "Roboto", sans-serif;
  font-weight: 500;
}

.app {
  margin: 0 auto;
  max-width: 1200px;
  padding: 20px;

  /* temporary layout */
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: flex-start;
}

.stopscroll {
  overflow: hidden !important;
}
</style>
