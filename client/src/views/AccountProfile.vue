<script setup>
import { onBeforeMount, computed, ref } from 'vue';
import { useArticleStore } from '@/stores/ArticleStore.js';
import { useUserStore } from '@/stores/userStore.js';

import ArticleProfileList from '@/components/ArticleProfileList.vue';

const { name, surname, id, role } = useUserStore().user;

const fullName = computed(() => {
  const capitalizedName = name[0].toUpperCase() + name.slice(1);
  const capitalizedSurname = surname[0].toUpperCase() + surname.slice(1);
  return `${capitalizedName} ${capitalizedSurname}`
})

const articleStore = useArticleStore()
const articles = ref([]);

const isMentor = computed(() => {
  return role.name === 'mentor'
})

onBeforeMount(async () => {
  for (let page = 1; page <= 5; page++) {
    try {
      await articleStore.fetchArticles(10, page)
      const userArticles = articleStore.articles.filter(article => {
        return article.author.id === id;
      })

      articles.value = [...userArticles]
    } catch (error) {
      console.log(error);
    }
  }
})
</script>

<template>
  <div class="view-container profile">
    <div class="profile__info">
      <div class="profile__avatar avatar">
        <span class="avatar__text">Avatar</span>
        <button class="avatar__change-btn">Изменить</button>
      </div>
      <ul class="profile__info-list">
        <li class="profile__item profile__item--name">
          <span class="profile__name-text">{{ fullName }}</span>
        </li>
        <li class="profile__item profile__item--personal-acc personal-account">
          <router-link :to="{ name: 'account' }">
            <span class="personal-account__text">Личный кабинет</span>
            <my-svg name="arrow-left"></my-svg>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="profile__graph">
      <img src="@/assets/temp-graph.jpeg" alt="graph" class="profile__img">
    </div>
    <div class="profile__deals-wrapper">
      <div class="profile__rating">
        <span class="profile__rating-text">Rating 4.5</span>
      </div>
      <FormKit
        type="dropdown"
        name="deals"
        placeholder="Сделки"
        :options="['deal 1', 'deals 2']">
      </FormKit>
    </div>
    <ArticleProfileList
      v-if="isMentor"
      :articles="articles" />
  </div>
</template>

<style scoped>
img {
  max-width: 100%;
}

.view-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.profile__info {
  display: flex;
  margin-bottom: 40px;
}

.profile__avatar {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  padding: 10px;
  width: 96px;
  height: 96px;
  border: 1px solid var(--clr-border);
  border-radius: 100%;
}

.avatar__text {
  color: var(--clr-text-prime);
  font-size: 20px;
}

.avatar__change-btn {
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: var(--clr-text-prime);
}

.profile__info-list {
  display: flex;
  flex-direction: column;
}

.profile__item {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  padding: 6px 50px;
  border-radius: 10px;
  border: 2px solid var(--clr-border);
}

.profile__name-text {
  color: var(--clr-text-prime);
  font-size: 20px;
}

.profile__item--personal-acc a {
  display: flex;
  align-items: center;
  color: var(--clr-text-prime);
}

.personal-account__text {
  margin-right: 10px;
  font-size: 20px;
}

.profile__item--personal-acc svg {
  padding: 2px;
  border: 2px solid var(--clr-border);
  border-radius: 100%;
}

.profile__graph {
  width: 250px;
  height: 250px;
}

.profile__img {
  object-fit: cover;
  height: 100%;
}

.profile__articles {
  display: flex;
  justify-content: center;
  width: 400px;
}

.profile__dropdown {
  width: 100%;
}

.profile__deals-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile__rating {
  margin-right: 20px;
  padding: 5px 10px;
  border: 2px solid var(--clr-border);
  border-radius: 5px;
}

.profile__rating-text {
  color: var(--clr-text-prime);
}
</style>
