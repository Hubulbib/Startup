<template>
  <div class="view-container">
    <h1 class="h-1">Профайл пользователя id: {{ id }}</h1>
    <p style="font-size: 22px;">(надо создать компонент и передать ему проп <code>:user="user")</code></p>
  </div>
</template>

<script setup>
// сделать логику:
// fetch пользователя по id,
// если пользователя нет - await router.replace(name: {'notfound'}) - редирект на 404
// не забыть про проверку на ошибку навигации - https://router.vuejs.org/guide/advanced/navigation-failures.html
// если пользователь есть - передать объект пропсом в компонент
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})


</script>
