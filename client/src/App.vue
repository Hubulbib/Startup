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
@import '@/assets/scss/main.scss';

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
