<script setup>
import UsersMockup from "@/mockups/UsersMockup.js";
import { publishedString } from "@/helpers/publishedStringValidator.js";
import { ref, computed, onMounted, nextTick } from "vue";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  blockHeight: {
    type: Number,
    default: 150
  }
});

const blockHeightStyle = `max-height: ${props.blockHeight}px`;

const emit = defineEmits([
  'onHide',
])

const onHide = () => {
  emit('onHide', props.item.id)
}

const articleCard = ref(null);
const description = ref(props.item.description);

const cropDescription = async () => {
  let text = props.item.description;
  articleCard.value.style.maxHeight = `${props.blockHeight}px`;

  while (articleCard.value.scrollHeight > articleCard.value.clientHeight) {
    text = text.substring(0, text.lastIndexOf(' ')) + '...'
    description.value = text;
    await nextTick();
  }
};

onMounted(() => {
  cropDescription();
});

const user = computed(() => {
  // here will be a funciton that fetches user name, surname and avatar src
  // requesting data by this.item.author_id
  return UsersMockup.find((obj) => obj._id === props.item.author_id);
  // the author_id is a unique value, so it shouldn't cause incorrect behaviour
  // also Array.find will be replaced by fetch function, this one is only for demo
});

const published = publishedString(props.item.published);
</script>

<template>
  <div class="article-item">
    <div class="article-item__img" :style="blockHeightStyle">
      <img class="img" :src="item.img" :alt="item.title" />
    </div>
    <div class="article-item__card article-card" ref="articleCard">
      <h2 class="article-card__title">
        <router-link :to="{ name: 'article.show', params: {
          id: item._id,
          title: item.title}}">
          {{ item.title }}</router-link>
      </h2>
      <div class="article-card__meta">
        <article-author :user="user" />
        <div class="article-card__published">
          {{ published }}
        </div>
        <div class="article-card__counters">
          <article-counter :article="item" :isAuthorized="true" />
        </div>
      </div>
      <div class="article-card__description">{{ description }}</div>
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

.article-item {
  padding: 30px 0;
  display: flex;
  gap: 10px;

  &__img {
    flex-shrink: 0;
    width: 300px;
    border: 1px solid #ddd;
    border-radius: 15px;
    overflow: hidden;

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
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    padding-left: 10px;
    border-left: 1px solid #666;
  }

  .article-card {
    &__title {
      margin: 0;
      padding: 0;
    }

    &__meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 30px;
    }
  }
}
</style>
