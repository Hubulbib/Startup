import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { $api } from '@/http/api';
import getRole from "@/helpers/getRole";

export const useUserStore = defineStore('user', () => {
  const user = ref({})

  const updateUserInfo = async (data) => {
    const payload = {};

    if (data.email) {
      payload.email = data.email;
    }

    if (data.password) {
      payload.password = data.password;
    }

    try {
      const res = await $api.put(`user/${user.value.id}`, { payload });
      if (res.statusText === "OK") {
        console.log(res.data);
        user.value.email = res.data.email;
      }
    } catch (e) {
      console.log(e?.message);
    }
  }

  const userRole = computed(() => getRole(user.value));

  return {
    user, updateUserInfo, userRole
  }
})
