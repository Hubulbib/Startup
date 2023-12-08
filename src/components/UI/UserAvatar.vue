<template>
  <div class="avatar" @click="openProfile">
    <img v-if="user && user.avatar" :src="user.avatar" alt="Личный кабинет" />
    <svg
      v-else-if="user && user.name"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="50" r="45" fill="#6495ee" />
      <text
        x="50%"
        y="50%"
        dominant-baseline="middle"
        text-anchor="middle"
        fill="white"
        font-size="36"
      >
        {{ getInitials(user) }}
      </text>
    </svg>
    <img
      v-else
      src="@/assets/empty-avatar.svg"
      alt="Регистрация / Авторизация"
    />
  </div>
</template>

<script>
export default {
  name: "user-avatar",
  props: {
    user: { type: Object, default: null },
  },
  methods: {
    openProfile() {
      if (this.user) {
        console.log("Personal account page"); // route to personal account
      } else {
        console.log("Modal for registration / authorisation"); // open modal for register/auth
      }
    },
    getInitials(user) {
      return (user.name[0] + user.surname[0]).toUpperCase();
    },
  },
};
</script>

<style scoped lang="scss">
img {
  width: 100%;
}

.avatar {
  width: 75px;
  height: 75px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;

  & text {
    transform: translate(0, 3px);
  }

  & :hover {
    opacity: 0.9;
  }

  & :active {
    transform-origin: center;
    transform: scale(0.95);
  }
}
</style>

<!--
  USAGE:

  <template>
    <userAvatar :user="user" />
  </template>

  <script>
    import userAvatar from './components/userAvatar.vue';
    export default {
      components: {
          userAvatar,
      }
    },
    data() {
    return {
      user // fetch a user object from server.
      // The avatar would be either an image with src taken from user account, or generated SVG from first letters of user name and surname
    }
  }
  </script>
-->
