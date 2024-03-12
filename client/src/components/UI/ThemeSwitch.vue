<script setup>
import { useThemeSwitch } from '@/hooks/useThemeSwitch.js';

const toggleDarkMode = useThemeSwitch();
</script>

<template>
  <div class="theme-switch">
    <button
      class="theme-switch__btn"
      @click="toggleDarkMode">
      <my-svg name="theme-switcher"></my-svg>
    </button>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/abstract' as *;

.theme-switch__btn {
  @include btn-reset;
}
</style>
