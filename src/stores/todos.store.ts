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
      throw new Error(error);
    } finally {
      isLoading.value = false;
    }
  };

  const createNewTodo = async ({ userId, ...payload }: ICreateTodo): Promise<void> => {
    try {
      const todo: Omit<ITodo, 'id'> = {
        ...payload,
        userId: Number(userId),
        completed: false
      };
      const { data } = await API.post('/todos', { body: todo });
      setTodo({ ...data.body, id: data.id });
    } catch (error: any) {
      throw new Error(error);
    }
  };

  const setTodo = (payload: ITodo): void => {
    todos.value.push(payload);
  };
  const setTodoFavorites = (): void => {
    const storageFavorites: string | null = window.localStorage.getItem('favorites');
    favorites.value = storageFavorites ? JSON.parse(storageFavorites) : [];
  };

  return {
    todos,
    getTodos,
    getFavorites,
    isLoading,
    userIds,
    fetchTodos,
    createNewTodo,
    setTodoFavorites
  };
});
