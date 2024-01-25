<template>
  <div class="avatar" :style="size">
    <img v-if="user && user.avatar" :src="user.avatar" alt="Личный кабинет" />
    <avatar-initials v-else-if="user && user.name" :fullname="{ name: user.name, surname: user.surname }" />
    <Icon v-else icon="carbon:user-avatar-filled-alt" color="#6495ee" width="100" height="100" />
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "user-avatar",
  props: {
    user: {
      type: Object,
      default: null
    },
    size: {
      type: Number,
      default: 100
    }
  },
  setup(props) {
    const size = `width: ${props.size}px; heigth: ${props.size}px`;

    return {
      size
    }
  }
};
</script>

<style scoped lang="scss">
img {
  width: 100%;
}

.avatar {
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;

  user-select: none;

  &:hover {
    opacity: 0.9;
  }

  &:active * {
    transform-origin: center;
    transform: scale(1.05);
  }
}
</style>

<!-- USAGE:

 <userAvatar :user="user" />

-->
