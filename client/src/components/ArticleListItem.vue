<script setup>
import UsersMockup from "@/mockups/UsersMockup.js";
import { publishedString } from "@/helpers/publishedStringValidator.js";
import { ref, computed, onMounted, nextTick, onBeforeMount } from "vue";
import { $api, API_URL } from "@/http/api";
import axios from "axios";

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

const emit = defineEmits(["onHide"]);

const onHide = () => {
  emit("onHide", props.item._id);
};

const articleCard = ref(null);
const user = ref(null)

onBeforeMount(async () => {
  try {
    const response = await axios.get(`${API_URL}/user/${props.item.author}`)

    user.value = response.data
  } catch (error) {
    console.log(error)
  }
})

const published = publishedString(props.item.createdAt);
</script>

<template>
  <div class="article-item">
    <div class="article-item__img" :style="blockHeightStyle">
      <img class="img" src="@/assets/logo.png" :alt="item.content.title" />
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
        >
          {{ item.content.title }}
        </router-link>
      </h2>
      <div class="article-card__meta">
        <article-author :id="item.author" />
        <div class="article-card__published">
          {{ published }}
        </div>
        <div class="article-card__counters">
          <article-counter :article="item" :isAuthorized="true" />
        </div>
      </div>
      <div class="article-card__description">{{ item.content.recommended.description }}</div>
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
    margin-left: auto;
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
