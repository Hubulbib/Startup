<script setup>
import UsersMockup from "@/mockups/UsersMockup.js";
import { publishedString } from "@/helpers/publishedStringValidator.js";
import { computed } from "vue";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits([
  'onHide',
])

const updateLikes = (value) => {
  console.log(
    `The number of likes of article #${props.item.id.value} updated to ${value}`
  );
  //ты мутируешь пропс, а так нельзя
  props.item.value = value;
};

const onHide = () => {
  emit('onHide', props.item.id)
}

const description = computed(() => {
  if (props.item.description.length > 200) {
    return props.item.description.substring(0, 197) + "...";
  } else {
    return props.item.description;
  }
});

const user = computed(() => {
  // here will be a funciton that fetches user name, surname and avatar src
  // requesting data by this.item.author_id
  return UsersMockup.find((obj) => obj.id === props.item.author_id);
  // the author_id is a unique value, so it shouldn't cause incorrect behaviour
  // also Array.find will be replaced by fetch function, this one is only for demo
});

const published = publishedString(props.item);
</script>

<template>
  <div class="article-item">
    <div class="article-item__img">
      <img class="img" :src="item.img" :alt="item.title" />
    </div>
    <div class="article-item__card article-card">
      <h2 class="article-card__title">
        <a href="">{{ item.title }}</a>
      </h2>
      <div class="article-card__meta">
        <div class="article-card__author author">
          <img class="author-avatar" src="" alt="" />
          <a class="author-name" href="">{{ user.name }} {{ user.surname }}</a>
        </div>
        <div class="article-card__published">
          {{ published }}
        </div>
        <div class="article-card__counters">
          <article-counter
            :article="item"
            :isAuthorized="true"
            @update:likes="updateLikes"
          />
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
    height: 150px;
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

    // &__description {
    //   max-width: 400px;
    //   white-space: nowrap;
    //   overflow: hidden;
    //   text-overflow: ellipsis;
    // }
  }
}
</style>
