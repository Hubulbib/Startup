<template>
  <li class="item">
    <input
      v-model="subTitle"
      type="text"
      class="input-header"
      placeholder="Заголовок" />
    <!-- :modules="modules" -->
    <QuillEditor
      ref="editor"
      :toolbar="[
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        ['link'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['clean'],
      ]"
      v-model:content="content"
      contentType="html"
      content="html"
      placeholder="Контент">
    </QuillEditor>
  </li>
</template>

<script setup>
import { ref, h } from "vue";
// import ImageUploader from "quill-image-uploader";
// import axios from "axios";
const editor = ref(null);

const subTitle = ref("");
const content = ref("");

const resetContent = () => {
  editor.value.setContents([]);
  subTitle.value = "";
};

// const modules = {
//   name: "imageUploader",
//   module: ImageUploader,
//   options: {
//     upload: (file) => {
//       return new Promise((resolve, reject) => {
//         const formData = new FormData();
//         formData.append("image", file);

//         axios
//           .post("/upload-image", formData)
//           .then((res) => {
//             console.log(res);
//             resolve(res.data.url);
//           })
//           .catch((err) => {
//             reject("Upload failed");
//             console.error("Error:", err);
//           });
//       });
//     },
//   },
// };

defineExpose({
  subTitle,
  content,
  resetContent,
});
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  flex-direction: column;
  width: 100%;

  border: 1px solid var(--fk-color-border);
  border-radius: .35em;

  &:not(:last-child) {
    margin-bottom: 40px;
  }
}

.formkit-outer {
  margin: 0;
}

.ql-toolbar,
.ql-snow {
  border-color: var(--fk-color-border) !important;
}

.input-header {
  display: block;
  padding: 10px 16px;
  border: none;

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
