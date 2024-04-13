import { API } from '@/api';
import { useAuthStore } from '@/stores/auth.store';
import type { IUser } from '@/types';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const authStore = useAuthStore();
  const user = ref<IUser | null>(null);
  const error = ref<string | null>(null);

  const getError = computed(() => error.value);
  const getUser = computed(() => user.value);

  const loginUser = async (userName: string, phone: string): Promise<void> => {
    try {
      const { data } = await API.get<IUser[]>('/users');
      const userData = data.find((userData) => {
        return (
          userData.username.toLowerCase() === userName.toLowerCase() && userData.phone === phone
        );
      });
      if (userData) {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        setError();
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const logoutUser = (): void => {
    user.value = null;
    localStorage.removeItem('user');
    authStore.setAuth(false);
  };

  const getCurrentUser = (): void => {
    const user = localStorage.getItem('user');
    if (user) {
      setUser(JSON.parse(user));
    }
  };

  const setUser = (payload: IUser): void => {
    user.value = payload;
    authStore.setAuth(true);
  };

  const setError = (): void => {
    error.value = 'Login error';
    throw new Error('User not exist');
  };

  return {
    user,
    error,
    getError,
    getUser,
    loginUser,
    logoutUser,
    getCurrentUser,
    setUser
  };
});
