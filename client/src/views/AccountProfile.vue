<script setup>
  import { onMounted, ref} from 'vue';
  import { useArticleStore } from '@/stores/ArticleStore.js';

  import ArticleProfileList from '@/components/ArticleProfileList.vue';

  const articleStore = useArticleStore();
  const articles = ref([]);

  const getData = async () => {
    try {
      await articleStore.fetchArticles();
      articles.value = [...articleStore.articles]
    } catch (e) {
      console.log(e);
    }
}

onMounted(() => {
  getData();
});

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
          <span class="profile__name-text">Имя Фамилия</span>
        </li>
        <li class="profile__item profile__item--personal-acc personal-account">
          <router-link to="/account">
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
        Rating 4.5
      </div>
      <FormKit
        type="dropdown"
        name="deals"
        placeholder="Сделки"
        :options="['deal 1', 'deals 2']"
      >
      </FormKit>
    </div>
    <div class="profile__articles">
      <FormKit
        type="dropdown"
        name="framework"
        placeholder="Статьи"
        :options="[
          '2',
          '3',
          '5'
        ]"
        outer-class="my-custom"
      >
      </FormKit>
    </div>
    <ArticleProfileList
    :articles="articles"
    />
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
    border: 1px solid #666;
    border-radius: 100%;
  }

  .avatar__text {
    font-size: 20px;
  }

  .avatar__change-btn {
    border: none;
    background-color: transparent;
    cursor: pointer;
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
    border: 2px solid #666;
  }

  .profile__name-text {
    font-size: 20px;
  }

  .profile__item--personal-acc a {
    display: flex;
    align-items: center;
  }

  .personal-account__text {
    margin-right: 10px;
    font-size: 20px;
  }

  .profile__item--personal-acc svg {
    padding: 2px;
    border: 2px solid #666;
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
    border: 2px solid #666;
    border-radius: 5px;
  }
</style>
