<script setup>
import EditorBlock from "@/components/EditorBlock.vue";
import { nanoid } from "nanoid";
import { ref } from "vue";

const title = ref(null);
const description = ref(null);

const form = ref(null);
const body = ref(null);
const tasks = ref(null);

const data = ref({
  body: [nanoid(5)],
  tasks: [nanoid(5)],
});

const add = (name) => {
  data.value[name].push(nanoid(5));
};

const createArticle = () => {
  const formData = new FormData(form.value);

  formData.append("title", title.value);
  formData.append("description", description.value);

  for (const item of body.value) {
    formData.append(item.subTitle, item.content);
  }

  for (const item of tasks.value) {
    formData.append(item.subTitle, item.content);
  }
};
</script>

<template>
  <form ref="form" @submit.prevent="createArticle" class="article-form">
    <div class="meta flex-c">
      <input ref="title" type="text" placeholder="Название статьи" />
      <textarea
        ref="description"
        rows="1"
        placeholder="Краткое описание"
      ></textarea>
    </div>

    <div class="content flex-c">
      <h3>Контент статьи</h3>
      <div class="wrapper">
        <ul class="list">
          <editor-block ref="body" v-for="key in data.body" :key="key" />
        </ul>
        <my-button @click="add('body')" class="list-btn" type="button">
          <Icon icon="material-symbols:add" width="28" height="28" />
        </my-button>
      </div>
    </div>

    <div class="tasks flex-c">
      <h3>Задания</h3>
      <div class="wrapper">
        <ul class="list">
          <editor-block ref="tasks" v-for="key in data.tasks" :key="key" />
        </ul>
        <my-button @click="add('tasks')" class="list-btn">
          <Icon icon="material-symbols:add" width="28" height="28" />
        </my-button>
      </div>
    </div>

    <my-button class="article-form__submit" type="submit">Send</my-button>
  </form>
</template>

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

  &__submit {
    align-self: flex-end;
  }
}

.wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.list-btn {
  align-self: flex-end;
  transition: background-color 0.15s ease-in-out;

  &:hover {
    background-color: #fff !important;

    & svg {
      color: #4bb4ff;
    }
  }
}
</style>