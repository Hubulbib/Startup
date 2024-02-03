<template>
  <article class="article">
    <h1 class="article__header">{{ article.content.title }}</h1>
    <div class="article__meta">
      <div class="article__author">
        <article-author :user="author" />
      </div>
      <div class="article__date">
        <div>Создана: {{ createdAt }}</div>
        <div>Обновлена: {{ updatedAt }}</div>
      </div>
      <article-counter :article="likesViewsValue" :isAuthorized="true" />
    </div>
    <div class="article__callout">
      <div class="article__recommended">{{ article.content.recommended }}</div>
      <ul class="article__tags">
        <li
          v-for="tag in article.tags"
          :key="tag"
          class="article__tag">
          {{ tag }}
        </li>
      </ul>
    </div>
    <div @click="isBodyHidden = !isBodyHidden" class="article__hide">
      <Icon
        icon="material-symbols:collapse-content"
        width="30"
        height="30"
        v-if="!isBodyHidden" />
      <Icon
        icon="material-symbols:expand-content"
        width="30"
        height="30"
        v-else />
      <span class="toggle-span">{{ isBodyHidden ? 'Показать' : 'Скрыть' }}</span>
    </div>
    <TransitionGroup name="body">
      <div
        id="article-body-container"
        v-if="!isBodyHidden"
        :key="article.content.body">
        <div
          v-for="block in article.content.body"
          :key="block._id"
          class="article__body">
          <section class="article-block">
            <h2 class="article-block__header">{{ block.subTitle }}</h2>
            <p class="article-block__text">{{ block.subTitleText }}</p>
          </section>
        </div>
      </div>
      <div id="article-tasks-container" :key="article.content.tasks">
        <div class="article__footer">
          <my-button>Поделиться</my-button>
          <!-- here will be a 3d party library like https://www.growthbunker.dev/vuesocial/ -->
          <my-button>В избранное</my-button> <!-- here will be a UI component -->
        </div>
        <h2 class="article__header--tasks">Задания:</h2>
        <ol class="article__tasks">
          <li v-for="(task, index) in article.content.tasks" :key="task._id" class="article-task">
            <h3 class="article-task__header">{{ index + 1 }}. {{ task.taskTitle }}</h3>
            <p class="article-task__description">{{ task.taskText }}</p>
          </li>
        </ol>
        <MentorsList />
      </div>
    </TransitionGroup>
  </article>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import MentorsList from './MentorsList.vue';
import axios from 'axios';
import { publishedString } from "@/helpers/publishedStringValidator.js";


import ArticleMockup from '@/mockups/ArticleMockup'; // for development purposes only
import UsersMockup from '@/mockups/UsersMockup'; // for development purposes only


const props = defineProps({
  articleId: {
    type: String,
    required: true
  }
});

const article = ref(ArticleMockup); // will be computed or onMounted fetch
const author = ref(UsersMockup[0]); // will be computed or onMounted fetch
const isBodyHidden = ref(false);

const fetchArticle = async () => {
  try {
    // const response = await axios.get(`/articles/${props.articleId}`); // get request to get an article
    // article.value = response.data;
    console.log('Article loaded')
  } catch (error) {
    console.error(error);
  }
};

const fetchAuthor = async () => {
  try {
    // const response = await axios.get(`/users/${props.author}`);
    // author.value = response.data;
  } catch (error) {
    console.log(error);
  }
};

const updateViews = async () => {
  try {
    // const response = await axios.put(`/articles/${props.articleId}`, {views: likesViewsValue.views})
  } catch (error) {
    console.log(error);
  }
}

let likesViewsValue = reactive({
  views: article.value.views,
  likes: article.value.likes
});

likesViewsValue.views++;

onMounted(() => {
  // fetchArticle();
  // fetchAuthor();
  // updateViews();
});

const createdAt = publishedString(article.value.createdAt);
const updatedAt = publishedString(article.value.updatedAt);

</script>

<style scoped lang="scss">
.toggle-span {
  cursor: pointer;
}
.article {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  &__header {
    color: #333;
    font-size: 32px;
    margin-bottom: 30px;

    &--tasks {
      color: #333;
      font-size: 24px;
      margin-bottom: 15px;
    }
  }

  &__meta {
    display: flex;
    gap: 45px;
    align-items: center;
    margin-bottom: 30px;
  }

  &__date {
    display: flex;
    flex-direction: column;
    gap: 10px
  }

  &__callout {
    margin-bottom: 30px;
    padding: 18px;
    border-left: 3px solid #333;
    font-style: italic;
    background-color: #eaeaea;
  }

  &__recommended {
    display: block;
    margin-bottom: 12px;
  }

  &__tags {
    list-style: none;
    padding: 0;
  }

  &__tag {
    display: inline-block;
    background-color: #6b6b6b;
    color: #fff;
    padding: 5px 10px;
    margin-right: 5px;
    border-radius: 4px;
    font-size: 12px;
  }

  &__hide {
    margin-bottom: 20px;
    display: flex;
    gap: 5px;
    align-items: center;

    & svg {
      display: inline;
      transform: translateY(-1px);
    }

    & span {
      font-size: 20px;
      color: #666;
      border-bottom: 1px dotted #666;
    }
  }

  &__body {
    margin-bottom: 35px;
  }

  .article-block {
    margin-bottom: 10px;

    &__header {
      margin-bottom: 12px;
      font-size: 24px;
      color: #333;
    }

    &__text {
      margin-bottom: 18px;
      line-height: 1.5;
      color: #666;
    }
  }

  &__tasks {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 25px 30px;
    margin-bottom: 15px;
    background-color: white;
    list-style: none;
  }

  .article-task {
    padding-bottom: 20px;
    border-bottom: 1px solid #999;

    &__header {
      margin-bottom: 8px;
      font-size: 16px;
      color: #333;
    }

    &__description {
      color: #666;
    }
  }

  &__footer {
    margin-bottom: 20px;
    display: flex;
    gap: 20px;

  }
}

// animations
.body-move,
.body-enter-active,
.body-leave-active {
  transition: all .6s ease-in-out;
}

.body-leave-active {
  position: absolute;
  max-width: 1120px; // a crutch for TransitionGroup. Without it the text disappears in an ugly way
}

.body-enter-from,
.body-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
