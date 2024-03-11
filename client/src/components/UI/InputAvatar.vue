<template>
    <user-avatar
        v-if="authStore.isAuth && !authStore.isLoading"
        :size="100"
        :user="userStore.user"
        @click="() => show = true"
    />
    <drop-modal
        for="file"
        class="input"
        :show="show"
        v-on-click-outside="() => show = false"
        @click="() => show = false"
    />
    <input
        id="file"
        type="file"
        class="input-file"
    >
</template>

<script>
export default {
    name: 'input-avatar',
}
</script>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/AuthStore';
import { useUserStore } from '@/stores/userStore';
import { vOnClickOutside } from '@vueuse/components'

const authStore = useAuthStore()
const userStore = useUserStore()

const show = ref(false)
</script>

<style
    lang="scss"
    scoped
>
.input-file {
    opacity: 0;
    position: absolute;
    z-index: -1;
}

.input {
    cursor: pointer;
}
</style>