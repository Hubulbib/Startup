<script setup>
const props = defineProps(['firstName', 'lastName', 'description', 'rating'])
</script>

<template>
  <li class="mentors__item">
    <div class="mentors__data-group">
      <img src="../assets/empty-avatar.svg" alt="Mentor avatar" class="mentors__avatar">
      <h2 class="mentors__name">{{ props.firstName }} {{ props.lastName }}</h2>
    </div>
    <p class="mentor__descr">
      {{ props.description }}
    </p>
    <div class="mentors__info-group">
      <div class="mentors__rating-group">
        <span>{{ props.rating }}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path fill="gold" d="m5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625l7.2.625l-5.45 4.725L18.175 22L12 18.275z"/>
        </svg>
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
