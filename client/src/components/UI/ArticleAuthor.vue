<template>
  <div class="author">
    <router-link
      :to="{ name: 'profile.show', params: { id: id } }"
      class="author__image"
    >
      <img
        v-if="user.avatar"
        :src="user.avatar"
        :alt="user.name"
        class="author__img"
      />
      <avatar-initials :user="user" class="author__svg" />
    </router-link>
    <router-link
      :to="{ name: 'profile.show', params: { id: id } }"
      class="author__name"
    >
      {{ user.name }} {{ user.surname }}
    </router-link>
  </div>
</template>

<script>
export default {
  name: "article-author",
};
</script>

<script setup>
import { onBeforeMount, ref } from 'vue';
import axios from 'axios';
import { API_URL } from '@/http/api';

const props = defineProps({
  id: {
    type: String,
    required: true,
  }
});

const user = ref({})

onBeforeMount(async () => {
  try {
    const response = await axios.get(`${API_URL}/user/${props.id}`)

    user.value = response.data
  } catch (error) {
    console.log(error);
  }
})
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
