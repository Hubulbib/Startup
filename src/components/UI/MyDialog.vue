<template>
  <div class="dialog" v-if="props.show" @mousedown="hideDialog">
    <div @mousedown.stop class="dialog__content">
      <Icon
        @click="hideDialog"
        icon="material-symbols:close-small-outline-rounded"
        class="icon--close"
        width="40"
        size="40"
      />
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "my-dialog",
};
</script>

<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["hide"]);

const hideDialog = () => {
  emit("hide");
};
</script>

<style lang="scss" scoped>
.dialog {
  inset: 0;
  position: fixed;
  z-index: 10;
  background-color: rgba($color: #000000, $alpha: 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  &__content {
    position: relative;
    margin: auto;
    padding: 40px;
    background-color: #fff;
    border-radius: 4px;
  }
}

.icon--close {
  position: absolute;
  top: 0;
  right: 0;

  transition: color .15s ease-in-out;

  &:hover {
    color: #4bb4ff;
  }
}
</style>