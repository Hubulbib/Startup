<script setup>
import EditorBlock from "@/components/EditorBlock.vue";
import { nanoid } from "nanoid";
import { ref } from "vue";
import TagsMockup from "@/mockups/TagsMockup.js";
import { $api } from "@/http/api.js";
import LevelMockup from "@/mockups/LevelMockup.js"
import { useUserStore } from "@/stores/userStore";
import { reset } from "@formkit/vue";

const userStore = useUserStore()

const description = ref("");

const body = ref(null);
const tasks = ref(null);

const data = ref({
  body: [nanoid(5)],
  tasks: [nanoid(5)],
});

const add = (name) => {
  data.value[name].push(nanoid(5));
};

const createArticle = (data, node) => {
  console.log(node);
  const article = {
    // TODO: userStore.user ПОСЛЕ СМЕНЫ СХЕМЫ В ДБ
    author: userStore.user.id,
    content: {
      title: data.title,
      description: data.description,
      recommended: {
        level: data.level,
        description: data.recommended
      },
    },
    tags: data.tags,
  };

  const detail = {
    body: [],
    tasks: [],
  };

  for (const item of body.value) {
    detail.body = [
      ...detail.body,
      {
        subTitle: item.subTitle,
        subTitleText: item.content,
      },
    ];
  }

  for (const item of tasks.value) {
    detail.tasks = [
      ...detail.tasks,
      {
        taskTitle: item.subTitle,
        taskText: item.content,
      },
    ];
  }

  article.content.detail = detail;
  console.log(article);

  return article
};

const postArticle = (data) => {
  // console.log(createArticle(data))
  $api
    .post("/article", createArticle(data))
    .then((r) => console.log(r.data))
    .catch(err => console.log(err))
    .finally(() => {
      for (const item of body.value) {
        item.resetContent()
      }
      for (const item of tasks.value) {
        item.resetContent()
      }

      reset('form')
    })
};
</script>

<template>
  <FormKit
    type="form"
    :actions="false"
    @submit="postArticle"
    id="form"
    class="article-form">
    <div class="meta flex-c">
      <FormKit
        name="title"
        type="text"
        placeholder="Название статьи"
        validation="required"
        validation-visibility="blur"
        :validation-messages="{
          required: 'Поле должно быть заполнено',
        }" />
      <FormKit
        type="textarea"
        name="description"
        auto-height
        v-model="description"
        placeholder="Краткое описание"
        :help="`${description ? description.length : 0} / 200`"
        validation="required|length:0,200"
        validation-visibility="blur"
        :validation-messages="{
          length: 'Описание не должно превышать 200 символов.',
          required: 'Поле должно быть заполнено',
        }" />
      <FormKit
        type="taglist"
        name="tags"
        placeholder="Выберите язык программирования"
        open-on-focus
        open-on-remove
        validation-visibility="blur"
        :validation-messages="{
          required: 'Поле должно быть заполнено',
        }"
        :options="TagsMockup"
        :filter="(option, search) =>
          option.label.toLowerCase().startsWith(search.toLowerCase())
          "
        :tag-class="{
          'custom-tag': true,
        }"
        max="3" />
    </div>

    <div class="content flex-c">
      <h3>Контент статьи</h3>
      <FormKit
        type="text"
        name="recommended"
        validation="required"
        validation-visibility="blur"
        :validation-messages="{
          required: 'Поле должно быть заполнено',
        }"
        placeholder="Для кого рекомендована статья?" />
      <FormKit
        type="dropdown"
        name="level"
        open-on-focus
        open-on-remove
        validation="required"
        validation-visibility="blur"
        :options="LevelMockup"
        :validation-messages="{
          required: 'Поле должно быть заполнено',
        }"
        placeholder="Выберите уровень сложности" />
      <div class="wrapper">
        <ul class="list">
          <editor-block ref="body" v-for="key in data.body" :key="key" />
        </ul>
      </div>
      <my-button @click="add('body')" class="list-btn" type="button">
        <Icon icon="material-symbols:add" width="28" height="28" />
      </my-button>
    </div>

    <div class="tasks flex-c">
      <h3>Задания</h3>
      <div class="wrapper">
        <ul class="list">
          <editor-block ref="tasks" v-for="key in data.tasks" :key="key" />
        </ul>
      </div>
      <my-button @click="add('tasks')" class="list-btn" type="button">
        <Icon icon="material-symbols:add" width="28" height="28" />
      </my-button>
    </div>

    <FormKit type="submit" class="article-form__submit">Создать</FormKit>
  </FormKit>
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
    padding: 10px;

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

.description {
  display: block;
  width: 100%;
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

.content {
  h3 {
    color: var(--clr-text-prime);
  }
}

.tasks {
  h3 {
    color: var(--clr-text-prime);
  }
}
</style>
