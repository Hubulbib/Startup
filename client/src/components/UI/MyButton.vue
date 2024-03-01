<template>
  <button :class="['button', { flat }]">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "my-button",
  props: {
    flat: {
      type: Boolean,
      required: false,
      default: false,
    }
  }
}
</script>

<style scoped lang="scss">
@use '@/assets/scss/abstract' as abs;

.button {
  @include abs.btn-reset;
  display: inline-block;
  padding: 7px 16px;
  border-radius: 8px;
  border: 2px solid var(--clr-text-secondary);
  color: var(--clr-text-secondary);
  font-size: 16px;

  &:hover {
    background-color: var(--fk-bg-submit);
  }

  &:active {
    transform: scale(0.95);
  }
}

.button:disabled {
  background-color: #d3d3d3;
  color: #a9a9a9;
  cursor: not-allowed;

  &:active {
    transform: none;
  }
}

.flat {
  padding: 0;
  border: none;
  border-radius: 0px;
  border-bottom: 2px solid #fff;

  &:hover {
    background-color: transparent;
  }
}
</style>

<!-- PARENT

<my-button @click="function" :disabled="boolean">Any text</my-button>

-->
