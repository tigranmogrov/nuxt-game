<script setup lang="ts">
import ITodoItem from '@/components/todo/i-todo-item.vue';
import { filterByStatus, searchByText, filterByUserId } from '@/composable/filters';
import { useTodosStore } from '@/stores/todos.store';
import { ActionEnum, type IUpdateFavoriteAction } from '@/types';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const { filtersOption } = defineProps<{
  filtersOption: { [key: string]: string };
}>();

const todoStore = useTodosStore();

const { getTodos: todos } = storeToRefs(todoStore);

const filteredTodos = computed(() => {
  if (!todos.value) return [];

  const searchByTitle = searchByText(todos.value, filtersOption.text);
  const filteredByUserId = filterByUserId(searchByTitle, filtersOption.userId);
  return filterByStatus(filteredByUserId, filtersOption.status);
});

const addToFavorite = (id: number) => {
  const favorites = todoStore.getFavorites ?? [];
  localStorage.setItem('favorites', JSON.stringify([...favorites, id]));
  todoStore.setTodoFavorites();
};

const removeFavorite = (id: number) => {
  const newFavorites = todoStore.getFavorites.filter((favorite: number) => favorite !== id);
  localStorage.setItem('favorites', JSON.stringify([...newFavorites]));
  todoStore.setTodoFavorites();
};

const updateFavorites = ({ action, id }: IUpdateFavoriteAction) => {
  switch (action) {
    case ActionEnum.ADD_FAVORITE:
      addToFavorite(id);
      break;
    case ActionEnum.REMOVE_FAVORITE:
      removeFavorite(id);
      break;
  }
};
</script>

<template>
  <div class="todo">
    <ul v-if="filteredTodos.length" class="todo__list">
      <i-todo-item
        v-for="todo in filteredTodos"
        :key="todo.id"
        :post="todo"
        @update-favorites="updateFavorites"
      />
    </ul>
    <h3 v-else class="todo__title">Ooops... Todos is empty</h3>
  </div>
</template>
