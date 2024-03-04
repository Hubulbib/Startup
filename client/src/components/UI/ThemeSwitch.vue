<template>
  <div class="theme-switch">
    <button class="theme-switch__btn">
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
