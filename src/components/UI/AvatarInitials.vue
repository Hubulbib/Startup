<template>
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" :r="45" fill="#6495ee" />
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" :font-size="36">
      {{ initials }}
    </text>
  </svg>
</template>

<script>
export default {
  name: 'avatar-initials',
  props: {
    user: {
      type: Object,
      required: true
    },
  },
  setup(props) {
    const getInitials = function(user) {
      return (user.name[0] + user.surname[0]).toUpperCase();
    };

    const initials = getInitials(props.user);

    return {
      initials
    }
  }
}
</script>

<style scoped lang="scss">

svg text {
  transform: translateY(2px);
}

</style>
