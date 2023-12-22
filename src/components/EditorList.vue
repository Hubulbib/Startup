<template>
  <div class="wrapper">
    <ul class="list">
      <editor-block v-for="key in arr" :key="key" />
    </ul>
    <my-button @click="add" class="list-btn">
      <Icon icon="material-symbols:add" width="28" height="28"/>
    </my-button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import EditorBlock from "@/components/EditorBlock.vue";
import { nanoid } from "nanoid";

const arr = ref([nanoid(5)]);

const add = () => {
  arr.value.push(nanoid(5));
};
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.item {
  display: flex;
  flex-direction: column;

  &:not(:last-child) {
    margin-bottom: 40px;
  }
}

.list-btn {
  align-self: flex-end;
  transition: background-color .15s ease-in-out;

  &:hover {
    background-color: #fff !important;
    

    & svg {
      color: #4bb4ff;
    }
  }
}
</style>