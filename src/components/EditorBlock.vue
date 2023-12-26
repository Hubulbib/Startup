<template>
  <li class="item">
    <input v-model="subTitle" type="text" class="input-header" placeholder="Заголовок" />
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
      placeholder="Контент"
    >
    </QuillEditor>
  </li>
</template>

<script setup>
import { ref, h } from "vue";
// import ImageUploader from "quill-image-uploader";
// import axios from "axios";
const editor = ref(null)

const content = ref("");
const subTitle = ref("")

const resetContent = () => {
  editor.value.setContents([])
  subTitle.value = ''
}

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
  content,
  subTitle,
  resetContent
})
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