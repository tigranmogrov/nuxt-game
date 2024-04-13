import { API } from '@/api';
import type { ICreateTodo, ITodo } from '@/types';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useTodosStore = defineStore('todos', () => {
  const todos = ref<ITodo[]>([]);
  const isLoading = ref<boolean>(false);
  const favorites = ref<number[]>([]);

  const getTodos = computed(() => todos.value);
  const getFavorites = computed(() => favorites.value);
  const userIds = computed(() => Array.from(new Set(todos.value.map((todo) => todo.userId))));

  const fetchTodos = async (): Promise<void> => {
    try {
      isLoading.value = true;
      const { data } = await API.get<ITodo[]>('/todos');
      todos.value = data || [];
    } catch (error: any) {
      console.error(error.message);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    todos,
    getTodos,
    getFavorites,
    isLoading,
    userIds,
    fetchTodos
  };
});
