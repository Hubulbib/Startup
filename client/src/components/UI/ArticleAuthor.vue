<template>
  <div class="author">
    <router-link
    :to="{name: 'profile.show', params: {id: user._id}}"
    class="author__image">
      <img v-if="user.avatar" :src="user.avatar" :alt="user.name" class="author__img" />
      <avatar-initials v-else :user="user" class="author__svg" />
    </router-link>
    <router-link
    :to="{name: 'profile.show', params: {id: user._id}}"
     class="author__name">
      {{ user.name }} {{ user.surname }}
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'article-author',
  props: {
    user: {
      type: Object,
      required: true
    },
  }
}

</script>

<style scoped lang="scss">
.author {
  display: flex;
  gap: 10px;
  align-items: center;

  &__image {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    user-select: none;

    &:hover {
      opacity: 0.9;
    }

    &:active * {
      transform-origin: center;
      transform: scale(1.05);
    }
  }

  &__img {
    width: 100%;
  }

}




img {
  width: 100%;
}
</style>
