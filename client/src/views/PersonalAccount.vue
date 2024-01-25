<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/AuthStore';
import { useUserStore } from '@/stores/userStore';
import pwVisibile from "@/helpers/pwVisibile.js";
import AuthService from '@/services/AuthService';
import ls from '@/helpers/localStorageHelpers.js'


const authStore = useAuthStore();
const userStore = useUserStore();
const user = userStore.user;
const showInput = ref(false);

// для тестов
const chRole = (role) => {
  userStore.user.role.name = role;
}
//

function openAvatarUpload() {
  document.querySelector('#avatar-upload').click();
}

function uploadAvatar() {
  const input = document.querySelector('#avatar-upload');
  if (input.files[0]) {
    console.log('File uploaded');
    // нужно понять, как обрабатывать картинки на сервере
    // userStore.update
  }
}

const logout = () => {
  authStore.logout();
};

const editFields = () => {
  showInput.value = !showInput.value;
};

const cancelEditing = () => {
  showInput.value = !showInput.value;
}

const submitChanges = async (data) => {
  console.log(data);
  const oldemail = user.email;
  const { email, oldpassword, password } = data;
  try {
    const res = await AuthService.login(oldemail, oldpassword);
    // это такая своеобразная проверка, правильный ли старый пароль ввёл пользователь
    // но по-хорошему, надо на эндпоинте принимать старый и новый пароль и выдывать ошибку, если старый не совпадает
    // заодно обновляет access token
    if (res.statusText === "OK") {
      ls.saveToken(res.data.accessToken);
      await userStore.updateUserInfo({ email, password });
      showInput.value = false;
      console.log('Изменения успешно сохранены');
    } else {
      throw new Error('Вы ввели неправильный пароль');
    }
  } catch (e) {
    console.log(e?.message);
  }

}
</script>

<template>
  <div class="view-container">
    <!-- Для тестов, убрать из прода -->
    <div v-if="user" style="margin-bottom: 20px; padding: 20px; border: 1px dashed #999">
      <p>Для тестирования</p>
      <div style="margin: 10px 0; display: flex; gap: 10px">
        <my-button style="background-color: rgb(85, 194, 1); border: none; color: black" @click="chRole('user')">Стать
          юзером</my-button>
        <my-button style="background-color: rgb(85, 194, 1); border: none; color: black" @click="chRole('mentor')">Стать
          ментором</my-button>
        <my-button style="background-color: rgb(85, 194, 1); border: none; color: black" @click="chRole('admin')">Стать
          админом</my-button>
        <my-button style="background-color: rgb(85, 194, 1); border: none; color: black" @click="chRole('head')">Стать
          хедом</my-button>
      </div>
      <p>Привет, {{ user.role.name }} {{ user.name + ' ' + user.surname }}</p>
    </div>
    <!--  -->
    <div class="user-info">
      <div class="user-info__block user-info__block--container">
        <user-avatar class="user-info__block-1-2 avatar-container" :user="user" :size="150" @click="openAvatarUpload">
          <div class="avatar-overlay">
            <span class="avatar-overlay__text">Загрузить</span>
          </div>
          <input type="file" id="avatar-upload" style="display: none;" @change="uploadAvatar" />
        </user-avatar>
        <div class="user-info__block-1-2">
          <div class="user-info__block user-info__block--name">
            {{ user.name }} {{ user.surname }}
          </div>
          <router-link :to="{ name: 'profile' }">
            <div class="user-info__block user-info__block--link user-info__block--profile">
              Профайл
              <Icon icon="carbon:next-outline" />
            </div>
          </router-link>
        </div>
      </div>
      <div v-if="!showInput" class="user-info__block user-info__block--modifiable user-info__block--email">{{ user.email
      }}
        <span class="edit" @click="editFields">Изменить</span>
      </div>
      <div v-if="!showInput" class="user-info__block user-info__block--modifiable user-info__block--password">**********
        <span class="edit" @click="editFields">Изменить</span>
      </div>
      <div v-if="showInput" class="my-form">
        <FormKit type="form" :actions="false" @submit="submitChanges">
          <FormKit
            type="email"
            label="Почта"
            name="email"
            :placeholder="user.email"
            validation="length:5|*email" />
          <FormKit
            type="password"
            label="Старый пароль"
            name="oldpassword"
            validation="required"
            prefix-icon="password"
            suffix-icon="eyeClosed"
            @suffix-icon-click="pwVisibile" />
          <FormKit
            type="password"
            label="Новый пароль"
            name="password"
            validation=""
            prefix-icon="password"
            suffix-icon="eyeClosed"
            @suffix-icon-click="pwVisibile" />
          <FormKit
            type="password"
            name="password_confirm"
            label="Подтвердите пароль"
            validation="confirm"
            prefix-icon="password"
            suffix-icon="eyeClosed"
            @suffix-icon-click="pwVisibile" />
          <div style="display: flex; gap: 10px; align-items: flex-start;">
            <FormKit type="submit" label="Сохранить изменения"
              style="background-color: green; border: green; font-size: inherit;" />
            <my-button @click="cancelEditing">Отмена</my-button>
          </div>
        </FormKit>
      </div>
      <div class="user-info__block user-info__block--role">Роль: {{ user.role.name }} </div>
      <div v-if="user.role.name === 'mentor'" class="user-info__block user-info__block--container">
        <router-link style="width: 100%" :to="{ name: 'my-articles' }">
          <div class="user-info__block user-info__block user-info__block--link">Мои статьи
            <Icon icon="carbon:next-outline" />
          </div>
        </router-link>
        <router-link style="width: 100%" :to="{ name: 'my-subscriptions'}">
          <div class="user-info__block user-info__block user-info__block--link">Подписки
            <Icon icon="carbon:next-outline" />
          </div>
        </router-link>
      </div>
      <router-link :to="{name: 'quarantine'}">
        <div v-if=" user.role.name === 'admin' " class="user-info__block user-info__block--link">Карантин
          <Icon icon="carbon:next-outline" />
        </div>
      </router-link>
      <router-link :to="{name: 'articles-to-verify'}">
        <div v-if=" user.role.name === 'admin' " class="user-info__block user-info__block--link">Статьи на верификацию
          <Icon icon="carbon:next-outline" />
        </div>
      </router-link>
      <router-link :to="{name: 'search-users'}">
        <div v-if=" user.role.name === 'admin' " class="user-info__block user-info__block--link">Список пользователей
          <Icon icon="carbon:next-outline" />
        </div>
      </router-link>

      <div class="user-info__block user-info__block--logout">

        <div v-if=" authStore.isAuth ">
          <my-button @click=" logout ">Выйти</my-button>
        </div>
      </div>
    </div>





  </div>
</template>


<style scoped lang="scss">
.avatar-container {
  position: relative;
  overflow: hidden;

  &:hover .avatar-overlay {
    height: 50%;

    &__text {
      opacity: 1
    }
  }
}

.avatar-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 0;
  background: rgba(0, 0, 0, 0.5);
  transition: .5s ease;
  overflow: hidden;

  &__text {
    font-weight: bold;
    color: white;
    opacity: 0;
    transition: opacity .5s ease;
  }
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 800px;
  padding: 30px;
  // border: 1px solid #ccc;
  // border-radius: 20px;

  &__block {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    line-height: 21px;
    text-align: center;

    &--container {
      padding: 0;
      border: none;
      display: flex;
      align-items: center;
      gap: 30px
    }

    &-1-2 {
      width: 100%;
      display: flex;
      gap: 30px;
      flex-direction: column;
    }

    &--link {
      & svg {
        display: inline;
        transform: translateY(2px);
      }

      &:hover {
        background-color: #e7e7e7;
      }
    }

    &--modifiable {
      position: relative;

      & .edit {
        visibility: hidden;
        position: absolute;
        right: 20px;
        font-size: 12px;
        text-decoration: underline;
        color: #999;
        cursor: pointer;
      }

      &:hover .edit {
        visibility: visible;
      }
    }

    &--logout {
      display: flex;
      gap: 20px;
      justify-content: flex-end;
      border: none;
    }
  }
}</style>
