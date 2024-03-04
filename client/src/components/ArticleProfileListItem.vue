<script setup>
import { publishedString } from "@/helpers/publishedStringValidator.js";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  blockHeight: {
    type: Number,
    default: 150,
  },
});

const blockHeightStyle = `max-height: ${props.blockHeight}px`;
const item = props.item;

const emit = defineEmits(['onHide']);
const onHide = () => {
  emit("onHide", props.item._id);
};

const published = publishedString(props.item.createdAt);
</script>

<template>
  <!-- сделать псведоссылку на обертку через :after -->
  <div class="article-item">
    <div class="article-item__img" :style="blockHeightStyle">
      <img
        v-if="item.img"
        class="img"
        :src="item.img"
        :alt="item.content.title" />
      <img
        v-else
        class="img-placeholder"
        src="@/assets/logo.png"
        alt="placeholder"
        width="150" />
    </div>
    <div class="article-item__card article-card" ref="articleCard">
      <h2 class="article-card__title">
        <router-link
          :to="{
      name: 'article.show',
      params: {
        id: item._id,
        title: item.content.title.replace(/\s/g, '_'),
      },
    }"
          class="title-link">
          {{ item.content.title }}
        </router-link>
      </h2>
      <div class="article-card__meta">
        <article-author :user="item.author" />
        <div class="article-card__published">
          {{ published }}
        </div>
        <div class="article-card__counters">
          <article-counter :article="item" :isAuthorized="true" />
        </div>
      </div>
      <div class="article-card__description">
        {{ item.content.recommended.description }}
      </div>
    </div>
    <div class="article-item__social">
      <my-button>Поделиться</my-button>
      <my-button>Избранное</my-button>
      <my-button @click="onHide">Скрыть</my-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
a {
  color: inherit;
  text-decoration: none;

  &:hover {
    opacity: 0.7;
  }
}

p {
  margin: 0;
  padding: 0;
}

.title-link::after {
  position: absolute;
  content: "";

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
}

.article-item {
  padding: 10px 0;
  display: flex;
  gap: 10px;
  position: relative;

  &__img {
    flex-shrink: 0;
    width: 150px;
    height: 100px;
    overflow: hidden;

    display: flex;
    align-items: center;
    justify-content: center;

    & .img {
      width: 100%;
      height: auto;
    }
  }

  &__card {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-right: 20px;
  }

  &__social {
    position: relative;
    z-index: 10;
    margin-left: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    padding-left: 10px;
    border-left: 1px solid var(--clr-border);
  }

  .article-card {
    &__title {
      margin: 0;
      padding: 0;
      color: var(--clr-text-secondary);
    }

    &__meta {
      position: relative;
      z-index: 10;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 30px;
      color: var(--clr-text-prime);
    }

    &__description {
      color: var(--clr-text-secondary);
    }
  }
}
</style>
