<template>
  <component :is="icon" />
</template>
  
<script>
import icons from "@/assets/svg/index.js";

export default {
  name: "my-svg",
  props: {
    name: {
      required: true,
      type: String,
    },
  },
  computed: {
    icon() {
      return icons[this.name];
    },
  },
};
</script>

<!-- этот компонент для кастомных рукотворных свг типа замены аватарки на инициалы -->