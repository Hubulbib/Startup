<script setup>
  import { computed, ref } from 'vue';

  import MentorsItem from './MentorsItem.vue';
  import MentorsData from '../mockups/MentorsMockup.js';

  const mentorsVisible = ref(3);

  const mentorsData = ref(MentorsData);

  const visibleMentors = computed(() => {
    return mentorsData.value.slice(0, mentorsVisible.value)
  })

  const isAllMentorsDisplayed = computed(() => {
    return mentorsVisible.value < mentorsData.value.length;
  })

  const addMoreUsers = () => {
    mentorsVisible.value = mentorsData.value.length;
  }
</script>

<template>
  <ul class="mentors__list">
    <mentors-item
    v-for="mentorData in visibleMentors"
    :key="mentorData.id"
    :first-name="mentorData.firstName"
    :last-name="mentorData.lastName"
    :description="mentorData.description"
    :rating="mentorData.rating"
    >
    </mentors-item>
  </ul>
  <button
  class="mentors__btn-loadmore"
  @click="addMoreUsers"
  v-if="isAllMentorsDisplayed"
  >Загрузить еще...</button>
</template>

<style scoped>
  .mentors__list {
    display: grid;
    grid-template-columns: repeat(3, [col-start] 1fr [col-end]);
    grid-auto-rows: minmax(150px, 1fr);
    gap: 20px;
  }

  .mentors__btn-loadmore {
    place-self: center;
    margin: 0;
    padding: 0;
    padding-bottom: 2px;
    border: 0;
    border-bottom: 2px solid #000;
    cursor: pointer;
    background-color: transparent;
  }
</style>
