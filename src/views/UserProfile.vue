<template>
  <h1 class="h-1">Профайл пользователя id: {{ id }}</h1>
  <p style="font-size: 22px;">(надо создать компонент и передать ему проп <code>:id="id")</code></p>
</template>
<script setup>
const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})

</script>
