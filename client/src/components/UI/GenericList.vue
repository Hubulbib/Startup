<template>
  <ul class="generic-list">
        <li class="generic-list__item" v-for="item in items" :key="item.id">
        <component :is="passedComponent" :item="item" />
      </li>
  </ul>
</template>

<script>
export default {
  name: "generic-list",
  props: {
    items: {
      type: Array,
      required: true
    },
    passedComponent: {
      type: String, // only String type works here. Otherwise an error occurs in console
      required: true
    }
  }
};
</script>

<style scoped lang="scss">

  .generic-list {
    list-style: none;

    &__item:not(:last-child) {
      border-bottom: 1px solid #666;
    }
  }


</style>

<!-- PARENT

  <generic-list class="flex-column" :passedComponent="ItemComponent" :items="arrayOfItemsToRender" />

-->
