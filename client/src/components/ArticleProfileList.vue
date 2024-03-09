<script setup>
import { ref, toRef } from "vue";

import ArticleProfileListItem from "@/components/ArticleProfileListItem.vue";

const props = defineProps({
  articles: {
    type: Object,
    required: true,
  },
});

const articlesLocalRef = toRef(props, 'articles');
</script>

<template>
  <div>
    <transition-group name="article-list" class="article-list" tag="ul">
      <li class="article-list__item" v-for="article in articlesLocalRef" :key="article._id">
        <ArticleProfileListItem :item="article" />
      </li>
    </transition-group>
  </div>
</template>

<style scoped lang="scss">
.article-list {
  position: relative;
  border: 1px solid var(--clr-border);
  border-radius: 10px;

  &__item:not(:last-child) {
    border-bottom: 1px solid var(--clr-border);
  }
}

.article-item:not(:last-child) {
  background-color: var(--clr-border);
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
