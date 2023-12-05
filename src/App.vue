<template>
  <div class="app">
    <my-select :optionsData="optionsData" v-model="deafaultValue" />
  </div>
</template>
<script>
import { ref } from "vue";
import MySelectMockup from "@/mockups/MySelectMockup.js";

export default {
  setup() {
    const deafaultValue = 'Выберите...'
    const optionsData = ref(MySelectMockup)

    return {
      deafaultValue,
      optionsData
    }
  },
};
</script>

<style>
.app {
  margin: 0 auto;
  max-width: 1640px;
  padding: 20px;
}
</style>