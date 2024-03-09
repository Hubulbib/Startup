<script setup>
import { ref, onMounted } from 'vue';


const { success } = defineProps({
  success: {
    type: Boolean,
    default: false
  }
})

const count = ref(6);
const fadeIn = ref(true);
const fadeOut = ref(false);
let interval;

const close = () => {
  clearInterval(interval);
  fadeIn.value = false;
  fadeOut.value = true;
}

onMounted(() => {
  interval = setInterval(() => {
    if (count.value === 1) {
      close()
    } else {
      count.value--;
    }
  }, 1000);
})

</script>
<template>
  <div
    class="wrapper"
    :class="{ 'fade--in': fadeIn, 'fade--out': fadeOut }"
  >
    <div class="actions">
      <span class="actions--counter">{{ count }}</span>
      <Icon
        width="30"
        height="30"
        icon="ep:circle-close-filled"
        style="color: #999"
        @click="close"
      />
    </div>
    <div class="popup">
      <div
        v-if="success"
        class="popup--success"
      >
        <Icon
          width="42"
          height="42"
          icon="ep:success-filled"
          style="color: #0cad00"
        />
        <p>Данные успешно сохранены!</p>
      </div>
      <div
        v-else
        class="popup--error"
      >
        <Icon
          width="42"
          height="42"
          icon="tdesign:error-circle-filled"
          style="color: #cc0000"
        />
        <p>Ошибка загрузки данных</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  display: inline-block;
  position: fixed;
  bottom: 50px;
  font-family: "Roboto", sans-serif;
  font-size: 20px;
  font-weight: 700;
  border-radius: 15px;
  background-color: white;
  box-shadow: 0 3px 7px #ccc;
  z-index: 20;
}

.fade {
  &--in {
    right: 50px;
    animation: fadein 1s ease-in-out;
  }

  &--out {
    right: -100%;
    animation: fadeout 1s ease-in-out;
  }
}

@keyframes fadein {
  from {
    right: -100%;
  }

  to {
    right: 50px;
  }
}

@keyframes fadeout {
  from {
    right: 50px;
  }

  to {
    right: -100%;
  }
}

.popup {
  position: relative;
  padding: 25px 40px;

  & div {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  &--success p {
    color: darkgreen;
  }

  &--error p {
    color: red;
  }
}

.actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;

  &:deep(svg) {
    cursor: pointer;
  }

  &--counter {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    border: 1px solid #ccc;
    font-size: 16px;
    font-weight: 500;
    line-height: 16px;
    color: #999;
    border-radius: 50%;
  }
}
</style>
