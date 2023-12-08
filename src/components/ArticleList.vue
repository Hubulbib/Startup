<template>
  <ul>
    <li v-for="article in articles" :key="article.id">
      <ArticleListItem :item="article" />
    </li>
  </ul>
  <div class="loadmore-button">
    <my-button @click="loadMore">Загрузить ещё</my-button>
  </div>
</template>

<script setup>
import ArticlesMockup from "@/mockups/ArticlesMockup.js"; // mockup of articles
import { ref, onMounted } from "vue";
import ArticleListItem from "@/components/ArticleListItem.vue";

  const articles = ref(ArticlesMockup) // would be empty array
  const fetchArticles = () => {
      // fetching articles from the server
      console.log('Articles fetched');
    }
  const loadMore = () => {
      console.log('fetching next 5 articles...');
    }
  onMounted(() => {
    fetchArticles()
  })

</script>

<style scoped lang="scss">
.article-list {
  margin: auto;
  max-width: 800px;
  display: flex;
  flex-direction: column;
}

.loadmore-button {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
