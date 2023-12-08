<template>
  <div class="app">
    <my-select :optionsData="optionsData" v-model="deafaultValue" />
    <Icon icon="mdi:youtube" width="96" color="#15CA82" />
    <my-svg name="rect" />
    <my-button class="btn">Кнопка</my-button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import MySelectMockup from "@/mockups/MySelectMockup.js";

const deafaultValue = "Выберите...";
const optionsData = ref(MySelectMockup);
</script>

<style>
.app {
  margin: 0 auto;
  max-width: 1640px;
  padding: 20px;

  /* temporary layout */
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: flex-start;
}
</style>