<template>
  <div class="view-container">
    <h1 class="h-1">Article cms</h1>
    <div class="article-wrapper">
      <article-cms />
    </div>
  </div>
</template>

<script setup>
import ArticleCms from "@/modules/ArticleCms.vue";

// добавить хук onBeforeRouteLeave - "изменения не сохранены, вы точно хотите покинуть страницу?
</script>

<style scoped lang="scss">
.h-1 {
  color: var(--clr-text-prime);
  font-family: 'Inter';
}
</style>
