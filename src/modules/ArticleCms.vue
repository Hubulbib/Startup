<template>
  <form @submit.prevent="createArticle" class="article-form">
    <div class="meta flex-c">
      <input type="text" placeholder="Название статьи" />
      <textarea rows="1" placeholder="Краткое описание"></textarea>
    </div>

    <div class="content flex-c">
      <h3>Контент статьи</h3>
      <editor-list />
    </div>

    <div class="tasks flex-c">
      <h3>Задания</h3>
      <editor-list />
    </div>

    <button type="submit">Send</button>
  </form>
</template>

<script setup>
import EditorList from "@/components/EditorList.vue";

const createArticle = () => {
    const article = {
         
    }
}
</script>

<style lang="scss" scoped>
.article-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;

  & .meta {
    gap: 60px;
    margin-bottom: 40px;
  }

  & input,
  & textarea {
    border: none;
    border-radius: 0;
    padding: 0;

    font-size: 22px;

    font-weight: normal;
    font-family: "Roboto";

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
}
</style>