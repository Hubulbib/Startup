<template>
  <h1 class="h-1">Article with id {{ id }}</h1>
  <p>Сейчас всегда рендерится один и тот же мокап статьи.</p>
  <p><strong>id</strong> передаётся пропсом в компонент ArticleFullText.</p>
  <h2>Article Full-text</h2>
  <article-fulltext :articleId="id" />
</template>

<script setup>
import ArticleFulltext from '@/components/ArticleFulltext.vue';

const props = defineProps({
  id: {
    type: Number,
    required: true
  }
});
</script>

<style></style>
