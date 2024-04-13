import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(false);

  const setAuth = (payload: boolean) => (isLoggedIn.value = payload);

  return {
    isLoggedIn,
    setAuth
  };
});
