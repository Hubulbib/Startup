<script setup>
import ArticlesMockup from "@/mockups/ArticlesMockup.js"; // mockup of articles
import { ref, onMounted, watch } from "vue";
import ArticleListItem from "@/components/ArticleListItem.vue";

// const firstLoad = ref(true)
const loaderInc = ref(3);
const articles = ref([]);
const isFull = ref(false)

const hide = (id) => {
  ArticlesMockup = ArticlesMockup.filter(item => item.id !== id)
  articles.value = articles.value.filter(item => item.id !== id)
}

const fetchArticles = () => {
  // fetching articles from the server
  setTimeout(() => {
    // try catch
    // костыль
    const length = articles.value.length;

    articles.value = [
      ...articles.value,
      ...ArticlesMockup.slice(length, length + loaderInc.value),
    ];
  }, 250);
};

watch(articles, () => {
  if (articles.value.length === ArticlesMockup.length) {
    isFull.value = true
  }
}, { deep: true })

onMounted(() => {
  // try {
  //   fetchArticles();
  // } catch (error) {
  //   console.log(error)
  // } finally {
  //   firstLoad.value = false
  // }

  // v-intersection triggers callback whenever its element is mounted therefore the first fetch will happen automatically => onMounted method doesnt needed
});
</script>

<template>
  <transition-group name="article-list" class="article-list" tag="ul">
    <li class="article-list__item" v-for="article in articles" :key="article.id">
      <ArticleListItem :item="article" @onHide="hide" />
    </li>
  </transition-group>
  <my-button
    v-if="!isFull"
    v-intersection="fetchArticles"
    class="loadmore-btn"
  >
    Загрузить ещё
  </my-button>
</template>

<style scoped lang="scss">
.article-list {
  position: relative;

  &__item:not(:last-child) {
    border-bottom: 1px solid #666;
  }
}

.loadmore-btn {
  align-self: center;
}

// transitions
.article-list-move,
.article-list-enter-active {
  transition: all 0.6s ease-in-out;
}

.article-list-enter-from,
.article-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.article-list-enter-to,
.article-list-leave-from {
  opacity: 1;
  transform: none;
}

.article-list-leave-active {
  transition: all 0.3s ease-in-out;
  position: absolute;
}


</style>
