<template>
  <ul class="generic-list">
    <li v-for="item in items" :key="item.id">
      <component :is="passedComponent" :item="item" />
    </li>
  </ul>
</template>

<!-- 

  пока в подвешенном состоянии, не рекомендуется к использованию

 -->

<script>
export default {
  name: "generic-list",
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    passedComponent: {
      type: String, // only String type works here. Otherwise an error occurs in console
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
.generic-list {
  list-style: none;
}
</style>

<!-- PARENT

  <generic-list class="flex-column" :passedComponent="ItemComponent" :items="arrayOfItemsToRender" />

-->
