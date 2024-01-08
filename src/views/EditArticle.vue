<template>
  <div class="view-container">
    <h1 class="h-1">Редактирование статьи № {{ id }}</h1>
    <p style="font-size: 22px;">(надо создать компонент и передать ему проп <code>:article="article")</code></p>
  </div>
</template>

<script setup>
// сделать логику:
// fetch статьи по id,
// если статьи нет - await router.replace(name: {'notfound'}) - редирект на 404
// не забыть про проверку на ошибку навигации - https://router.vuejs.org/guide/advanced/navigation-failures.html
// если статья есть - передать объект пропсом в компонент

// добавить хук onBeforeRouteLeave - изменения не сохранены, вы точно хотите покинуть страницу?

const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})
</script>
