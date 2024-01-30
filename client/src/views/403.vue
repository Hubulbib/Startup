<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const count = ref(5);
const router = useRouter();
let interval;

onMounted(() => {
  interval = setInterval(() => {
    if (count.value === 1) {
      clearInterval(interval);
      router.push({ name: 'home' });
    } else {
      count.value--;
    }
  }, 1000);
});

onUnmounted(() => {
  clearInterval(interval);
});
</script>
<template>
  <div class="view-container">
    <div class="col-2">
      <div class="col-1-2">
        <h1>
          Доступ закрыт!
        </h1>
        <p style="font-size: 18px;">У вас нет доступа к этой странице. Вы будете перенаправлены на <router-link style="text-decoration: underline;" :to="{name: 'home'}">главную страницу</router-link>
        через {{ count }} секунд</p>
      </div>
      <div class="col-1-2">
        <img width="300" height="300" src="/images/403.webp">
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.view-container {
  margin: auto;
}
  .col-2 {
    display: flex;
    justify-content: space-around;
    gap: 30px;
  }

  .col-1-2 {
    flex: 1 1 33%;

    & h1 {
      text-align: right;
      margin-bottom: 20px;
    }

    & p {
      text-align: right;
      line-height: 1.7;
    }

  }

</style>
