<template>
  <div class="view-container">
    <!-- <button @click="click">test get more</button>
    <button @click="show">show articles count</button> -->
    <h1 class="h-1">Список публикаций</h1>
    <article-list />
  </div>
</template>

<script setup>
import ArticleList from "@/components/ArticleList.vue";
// import { useArticleStore } from "@/stores/ArticleStore";

// const articleStore = useArticleStore()
// const click = () => {
//   for (let index = 0; index < 10; index++) {
//     console.log(index);
//     articleStore.fetchArticles(10, index)
//   }
// }
// const show = () => {
//   console.log(articleStore.articles)
// }
</script>
