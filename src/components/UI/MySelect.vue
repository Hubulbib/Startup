<script>
  export default {
    name: 'my-select'
  }
</script>

<script setup>
import { PerfectScrollbar } from "vue3-perfect-scrollbar";
import { ref } from "vue";
// import { useClickOutside } from "@/hooks/useClickOutside.js";

const props = defineProps({
  modelValue: String,
  optionsData: {
    type: Array,
    default: () => [],
  },
})
const value = ref(props.modelValue);
const visible = ref(false);
// const root = ref(null);

const toggle = () => {
  return (visible.value = !visible.value);
};

const select = (option) => {
  return (value.value = option);
};

// useClickOutside(root, () => visible.value ? toggle() : null)
</script>

<template>
  <div v-click-outside="(toggle, visible.value)" class="select" ref="root">
    <div
      class="select__wrapper"
      @keydown.enter="toggle"
      @keydown.space="toggle"
      @click="toggle"
      tabindex="0"
      :value="modelValue"
    >
      <div class="select__label">
        <span class="select__value">{{ value }}</span>
      </div>
      <div
        class="select__icon"
        :class="{ 'select__icon--expanded': visible }"
      ></div>
      <ul
        class="select__list"
        :class="{
          'select__list--hidden': !visible,
          'select__list--visible': visible,
        }"
      >
        <perfect-scrollbar ref="scrollbar">
          <li
            v-for="item in optionsData"
            class="select__item"
            :class="{ 'select__item--current': item.name === value }"
            :value="item.name"
            :key="item.id"
            @keydown.enter="select(item.name)"
            @keydown.space="select(item.name)"
            @click="select(item.name)"
            tabindex="0"
          >
            {{ item.name }}
          </li>
        </perfect-scrollbar>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.select {
  width: 100%;
}

.select .select__wrapper {
  position: relative;
  z-index: 1;
  border: 1px solid gainsboro;
  background: #f8f8f8;
}

.select .select__wrapper .select__icon {
  position: absolute;
  right: 10px;
  top: 40%;
  width: 0;
  height: 0;
  border-top: 10px solid #888;
  border-right: 7px solid transparent;
  border-left: 7px solid transparent;
  transform: rotateZ(180deg) translateY(2px);
  transition: transform 0.3s ease;
}

.select .select__wrapper .select__icon--expanded {
  transform: rotateZ(0deg) translateY(0px);
}

.select .select__wrapper .select__label {
  display: block;
  padding: 12px;
}

.select__value {
  font-size: 16px;
  color: #888;
}

.select .select__list {
  position: absolute;
  left: -1px;
  z-index: 1;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 168px;
  border: 1px solid gainsboro;
  font-size: 16px;
  list-style-type: none;
  overflow: auto;
  background: #fff;
}

.select .select__item {
  padding: 12px;
  color: #666;
  outline: none;
}

.select .select__item:focus-visible {
  color: white;
  background: rgb(113, 46, 139);
}

.select .select__item:hover {
  color: white;
  background: rgb(123, 46, 139);
}

.select .select__item--current {
  background: #eaeaea;
}

.select .select__list--hidden {
  visibility: hidden;
}

.select .select__list--visible {
  visibility: visible;
}

.ps {
  width: 100%;
  height: 168px;
}
</style>