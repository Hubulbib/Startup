  <template>
<h1 class="h-1">Солянка компонентов</h1>

    <h2>Mentors List</h2>
    <p>Имя ментора - ссылка на профайл</p>
    <mentors-list></mentors-list>


    <h2>UI select</h2>
    <my-select :optionsData="optionsData" v-model="deafaultValue" />

    <h2>UI technical icons</h2>
    <a
      href="https://icon-sets.iconify.design/material-symbols/battery-horiz-075/"
      target="_blank"
    >
      ИКОНКИ БРАТЬ ЗДЕСЬ
    </a>
    <Icon icon="mdi:youtube" width="96" color="#15CA82" />

    <h2>UI custom svg</h2>
    <my-svg :name="dynamicIcon" />

    <my-button @click="changeIconName('rect')" class="btn">
      Сменить иконку на Rect
    </my-button>
    <my-button @click="changeIconName('wave')" class="btn">
      Сменить иконку на Wave
    </my-button>
    <my-button @click="changeIconName('battery')" class="btn">
      Сменить иконку на Battery
    </my-button>

    <h2>UI buttons</h2>
    <div style="margin-bottom: 20px; display: flex; gap: 20px">
      <my-button @click="testClick">Button 1</my-button>
      <my-button @click="testClick" :disabled="true">Button 2</my-button>
    </div>

    <h2>UI User Avatar</h2>
    <div
      style="
        display: flex;
        justify-content: center;
        gap: 20px;
        margin-bottom: 20px;
      "
    >
      <user-avatar :user="user" />
      <user-avatar />
      <user-avatar :user="user2" />
    </div>

</template>

<script setup>
import { onMounted, ref } from "vue";
import MySelectMockup from "@/mockups/MySelectMockup.js";
import MentorsList from '@/components/MentorsList.vue';
import axios from "axios";

const deafaultValue = ref("Выберите...");
const optionsData = ref(MySelectMockup);

const dynamicIcon = ref("rect");

const user = {
  name: "Dmitry",
  surname: "Aronov",
};

const user2 = {
  name: "John",
  surname: "Doe",
  avatar: "/images/users/avatars/avatar_example.jpeg",
};

const changeIconName = (name) => {
  dynamicIcon.value = name;
};

const testClick = () => {
  console.log("clicked");
};

onMounted(async () => {
  // http://localhost:3000/api/...
  try {
    const response = await axios.get("http://localhost:3000/api/user");
    console.log(response.data);
  } catch (error) {
    // console.log(error);
  }
});
</script>

<style lang="scss">
</style>
