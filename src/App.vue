<template>
  <Header></Header>
  <div class="app">
    <my-nav />
    <router-view v-slot="{ Component }">
      <transition name="route" mode="out-in">
        <component :is="Component" :key="$route.path" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import Header from "@/components/Header.vue";
import MyNav from "@/components/MyNav.vue"
</script>

<style lang="scss">
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.flex-c {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.view-container {
  width: 100%;
  margin: 0 auto;
}

.ql-container.ql-snow {
  border-inline: none !important;
  border-block-end: none !important;
}

.ql-toolbar.ql-snow {
  border-inline: none !important;
}

.ql-editor {
  min-height: 200px;
  font-size: 18px;
}

ul {
  list-style: none;
}

a {
  text-decoration: none;
  cursor: pointer;
  color: currentColor;
}

textarea {
  resize: none;
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

svg {
  display: block;
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

// router-view transitions

.route-enter-active,
.route-leave-active {
  transition: all .25s ease-in-out;
}

.route-enter-from,
.route-leave-to {
  opacity: 0;
}
</style>
