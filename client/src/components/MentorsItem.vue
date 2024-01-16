<script setup>
const props = defineProps({
  user: {
    type: Object,
    required: true,
  }
})

const { _id, firstName, lastName, description, rating } = props.user;
</script>

<template>
  <li class="mentors__item">
    <div class="mentors__data-group">
      <img src="@/assets/empty-avatar.svg" alt="Mentor avatar" class="mentors__avatar">
      <router-link :to="{name: 'profile.show', params: {id:_id}}" >
        <h2 class="mentors__name">{{ firstName }} {{ lastName }}</h2>
      </router-link>
    </div>
    <p class="mentor__descr">
      {{ description }}
    </p>
    <div class="mentors__info-group">
      <div class="mentors__rating-group">
        <span>{{ rating }}</span>
        <my-svg name="star"></my-svg>
      </div>
      <button class="mentors__btn-call">Связаться</button>
    </div>
  </li>
</template>

<style scoped>
  .mentors__item {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 10px;
  }

  .mentors__item:not(:nth-child(3n))::after {
    content: '';
    height: 70%;
    position: absolute;
    width: 2px;
    top: 40px;
    bottom: 10px;
    right: -10px;
    background-color: #000;
  }

  .mentors__item:not(:nth-last-child(-n + 3))::before {
    content: '';
    position: absolute;
    left: 10px;
    right: 10px;
    bottom: -10px;
    height: 2px;
    background-color: #000;
  }

  .mentors__data-group {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 5px;
  }
  .mentors__info-group {
    margin-top: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .mentors__avatar {
    width: 48px;
    height: 58px;
    flex-shrink: 0;
    object-fit: cover;
  }

  .mentors__rating-group {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .mentors__rating-group svg {
    align-self: flex-start;
    width: 10px;
    height: 10px;
  }

  .mentors__btn-call {
    margin: 0;
    padding: 0;
    padding-bottom: 2px;
    border: 0;
    border-bottom: 2px solid #000;
    background-color: transparent;
  }
</style>
