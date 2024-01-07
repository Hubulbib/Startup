<script setup>
  import { computed, ref } from 'vue';

  import MentorsItem from '@/components/MentorsItem.vue';
  import MentorsData from '@/mockups/MentorsMockup.js';

  const mentorsData = ref(MentorsData);

  const mentorsVisible = ref(3);
  const renderMentorsCount = ref(3)

  const visibleMentors = computed(() => {
    return mentorsData.value.slice(0, mentorsVisible.value)
  })

  const isAllMentorsDisplayed = computed(() => {
    return mentorsVisible.value < mentorsData.value.length;
  })

  const addMoreUsers = () => {
    mentorsVisible.value + renderMentorsCount.value < mentorsData.value.length ?
    mentorsVisible.value += renderMentorsCount.value :
    mentorsVisible.value = mentorsData.value.length;
  }
</script>

<template>
    <transition-group tag="ul" name="mentors-list" class="mentors__list">
      <mentors-item
      v-for="mentorData in visibleMentors"
      :key="mentorData._id"
      :user="mentorData"
      >
      </mentors-item>
    </transition-group>
  <my-button
  class="mentors__btn-loadmore"
  @click="addMoreUsers"
  v-if="isAllMentorsDisplayed"
  >Загрузить еще...</my-button>
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
    /* margin: 0; */
    /* padding: 0; */
    /* padding-bottom: 2px; */
    /* border: 0; */
    /* border-bottom: 2px solid #000; */
    /* cursor: pointer; */
    /* background-color: transparent; */
  }

  .mentors-list-enter-from,
  .mentors-list-leave-to {
    opacity: 0;
    transform: translateX(-30px);
  }

  .mentors-list-enter-active,
  .mentors-list-leave-active {
    transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
  }
  .mentors-list-enter-to,
  .mentors-list-leave-from {
    opacity: 1;
    transform: translateX(0);
  }
</style>
