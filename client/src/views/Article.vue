<template>
  <div class="view-container">
    <h1 class="h-1">Article with id {{ id }}</h1>
    <p>Сейчас всегда рендерится один и тот же мокап статьи.</p>
    <p><strong>id</strong> передаётся пропсом в компонент ArticleFullText.</p>
    <h2>Article Full-text</h2>
    <article-fulltext :articleId="id" />
  </div>
</template>

<script setup>
import ArticleFulltext from '@/components/ArticleFulltext.vue';

// сделать логику:
// fetch статьи по id,
// если такой статьи нет - router.replace(name: {'notfound'}) - редирект на 404
// не забыть про проверку на ошибку навигации - https://router.vuejs.org/guide/advanced/navigation-failures.html
// если статья есть - передать объект пропсом в article-fulltext (там изменить пропс с id (Number) на Article (Object))

const props = defineProps({
  id: {
    type: Number,
    required: true
  }
});
</script>

<style></style>
