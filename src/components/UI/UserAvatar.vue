<template>
  <div class="avatar" @click="openProfile">
    <img v-if="user && user.avatar" :src="user.avatar" alt="Личный кабинет" />
    <avatar-initials v-else-if="user && user.name" :user="user" />
    <Icon v-else icon="carbon:user-avatar-filled-alt" color="#6495ee" width="100" height="100" />

  </div>
</template>

<script>
export default {
  name: "user-avatar",
  props: {
    user: {
      type: Object,
      default: null
    }
  },
  setup(props) {
    const openProfile = function() {
      if (props.user) {
        console.log("Personal account page"); // route to personal account
      } else {
        console.log("Modal for registration / authorisation"); // open modal for register/auth
      }
    };

    return {
      openProfile
    }
  }
};
</script>

<style scoped lang="scss">
img {
  width: 100%;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;

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
