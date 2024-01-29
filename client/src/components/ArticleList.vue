<script setup>
import { onMounted } from "vue";
import ArticleListItem from "@/components/ArticleListItem.vue";
import { useArticleStore } from "@/stores/ArticleStore";
import { storeToRefs } from "pinia";

const articleStore = useArticleStore()
const { articles } = storeToRefs(articleStore)

onMounted(async () => {
  for (let page = 1; page <= 5; page++) {
    try {
      await articleStore.fetchArticles(10, page)
    } catch (error) {
      console.log(error);
    }
  }
})
</script>

<template>
  <div>
    <transition-group name="article-list" class="article-list" tag="ul">
      <li class="article-list__item" v-for="article in articles" :key="article._id">
        <ArticleListItem :item="article" />
        <!-- потом убрать -->
        <router-link style="margin-bottom: 10px; color: red"
          :to="{ name: 'cms.edit', params: { id: article._id } }">Редактировать статью (для теста роутера, потом
          уберу)</router-link>
        <!-- потом убрать -->
      </li>
    </transition-group>
  </div>
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
