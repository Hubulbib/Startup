<template>
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" :r="50" fill="#6495ee" />
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" :font-size="36">
      {{ initials }}
    </text>
  </svg>
</template>

<script>
import { computed } from 'vue';
export default {
  name: 'avatar-initials',
  props: {
    fullname: {
      type: Object,
      required: true
    },
  },
  setup(props) {
    // CHILD COMPONENTS RENDER FIRST -> NEED TO UPDATE DB SCHEMA

    const initials = computed(() => {
      return (props.fullname.name[0] + props.fullname.surname[0]).toUpperCase();
    });

    return {
      initials
    }
  }
}
</script>

<style scoped lang="scss">

svg text {
  transform: translateY(2px);
  user-select: none;
}

</style>
