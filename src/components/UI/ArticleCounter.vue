<template>
  <div class="article-counter">
    <Icon icon="clarity:eye-line" color="#999" width="30" height="30" />
    {{ views }}
    <span class="like" :class="{ 'button-liked': isLiked }" @click="incrementLikes">
      <Icon icon="simple-line-icons:like" color="#999" width="25" height="25" />
    </span>
    {{ likes }}
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: "article-counter",
  props: {
    article: {
      type: Object,
      required: true,
    },
    isAuthorized: {
      type: Boolean,
      required: false,
      default: false,
    }
  },

  setup(props, { emit }) {
    const views = ref(props.article.views);
    let likes = ref(props.article.likes),
      isLiked = ref(false);

    const incrementLikes = function() {
      if (props.isAuthorized) {
        isLiked.value ? likes.value-- : likes.value++;
        isLiked.value = !isLiked.value;
        emit('update:likes', likes.value);
      } else {
        console.log("Open login modal"); // open login modal
      }
    };

    return {
      views, likes, isLiked, incrementLikes
    }
  }
}
</script>

<style scoped lang="scss">
.article-counter {
  display: flex;
  gap: 10px;
  align-items: center;
}

.like {
  cursor: pointer;

  &:hover svg {
    fill: #dadada;
  }

  &:active svg {
    transform: scale(0.9);
  }
}

.button-liked {

  & svg,
  &:hover svg,
  &:active svg {
    color: lightgreen !important;
    transform: none;
  }
}
</style>

<!-- PARENT

<article-counter :article="object" :isAuthorized="boolean" @update:likes="updateLikes" />

-->
