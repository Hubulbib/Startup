<template>
  <div class="app">
    <my-select :optionsData="optionsData" v-model="deafultValue" />
  </div>
</template>
<script>
import MySelectMockup from "@/mockups/MySelectMockup.js";

export default {
  data() {
    return {
      deafultValue: 'Выберите...',
      optionsData: MySelectMockup,
    };
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