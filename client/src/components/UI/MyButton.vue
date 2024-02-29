<template>
  <button class="button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "my-button",
}
</script>

<style scoped lang="scss">
.button {
  display: inline-block;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: var(--fk-bg-submit);
  border: 2px solid var(--fk-bg-submit);
  color: white;
  font-size: 16px;
  cursor: pointer;

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
</style>

<!-- PARENT

<my-button @click="function" :disabled="boolean">Any text</my-button>

-->
