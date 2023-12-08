<template>
  <component :is="icon" :value="name"/>
</template>
  
<script>
import icons from "@/assets/svg/index.js";
import { computed } from "vue";

export default {
  name: "my-svg",
  props: {
    name: {
      required: true,
      type: String,
    },
  },
  setup(props) {
    const icon = computed(() => {
      return icons[props.name]
    })

    return {
      icon
    }
  },
};
</script>

<!-- этот компонент для кастомных рукотворных свг типа замены аватарки на инициалы -->