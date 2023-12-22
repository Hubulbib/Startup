<template>
  <li class="item">
    <input type="text" class="input-header" placeholder="Заголовок" />
    <QuillEditor
      class="quill-editor"
      :toolbar="[
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        ['link', 'image'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['clean'],
      ]"
      placeholder="Контент"
    >
    </QuillEditor>
  </li>
</template>

<script setup>
import { onMounted } from "vue";

onMounted(() => {
  const lastSpan = document.querySelectorAll(".ql-formats");

  lastSpan[lastSpan.length - 1].style.cssText = "margin-right: 0";
});
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  flex-direction: column;
  width: 100%;

  &:not(:last-child) {
    margin-bottom: 40px;
  }
}

.input-header {
  display: block;
  padding: 0 1px;
  margin-bottom: 20px;
  border: none;
  border-radius: 0;

  width: 100%;

  &:focus {
    outline: none;
    background-color: transparent;
  }

  &:hover {
    background-color: transparent;
  }

  &:active {
    background-color: transparent;
  }
}
</style>