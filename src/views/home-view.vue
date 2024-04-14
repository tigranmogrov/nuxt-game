<script setup lang="ts">
import ISpinner from '@/components/I-spinner.vue';
import IUserInfo from '@/components/i-user-info.vue';
import ITodoList from '@/components/todo/i-todo-list.vue';
import IInput from '@/components/ui/I-input.vue';
import ISelect from '@/components/ui/I-select.vue';
import IButton from '@/components/ui/i-button.vue';
import FormValidator, { todoCreateRules } from '@/composable/form/validation';
import { useTodosStore } from '@/stores/todos.store';
import type { ICreateTodo, ISelectedFilters, ISelectStatusOptions } from '@/types';
import { storeToRefs } from 'pinia';
import { computed, reactive, ref } from 'vue';

const todoStore = useTodosStore();
const { isLoading, userIds } = storeToRefs(todoStore);

const createTodoModel = reactive<ICreateTodo>({
  userId: '',
  title: ''
});
const selectedFilterModel = reactive<ISelectedFilters>({
  status: 'all',
  userId: 'all',
  searchText: ''
});
const userIdOptions = computed(() => [
  { name: 'All', value: 'all' },
  ...userIds.value.map((id: number) => ({ name: `User-${id}`, value: `${id}` }))
]);

const statusOptions: ISelectStatusOptions[] = [
  { name: 'All', value: 'all' },
  { name: 'Completed', value: 'completed' },
  { name: 'Uncompleted', value: 'uncompleted' },
  { name: 'Favorites', value: 'favorites' }
];

const formValidator = new FormValidator(createTodoModel, todoCreateRules);
const fieldErrors = formValidator.getErrors();
const isDisabled = ref(false);

const createTodo = async () => {
  const errors = formValidator.validateForm();
  if (!errors) {
    isDisabled.value = true;
    try {
      await todoStore.createNewTodo(createTodoModel);
      createTodoModel.userId = '';
      createTodoModel.title = '';
    } catch (error: any) {
      console.error('Error creating todo:', error.message);
    } finally {
      isDisabled.value = false;
    }
  }
};

todoStore.fetchTodos();
todoStore.setTodoFavorites();
</script>
<template>
  <div class="container">
    <i-user-info />
    <div class="home__content">
      <form class="form home__form" novalidate @submit.prevent="createTodo">
        <i-input
          v-model="createTodoModel.userId"
          :class="fieldErrors['userId'] ? 'field-error' : null"
          placeholder="Write id"
          label="UserId"
          name="userId"
        />
        <i-input
          v-model="createTodoModel.title"
          :class="fieldErrors['title'] ? 'field-error' : null"
          placeholder="Write Title"
          label="Title"
          name="title"
        />
        <i-button :disabled="isDisabled" type="submit">Create Todo</i-button>
      </form>

      <template v-if="!isLoading">
        <div class="home__filters">
          <h2>Filters</h2>
          <div class="home__filters-inner">
            <i-select
              v-model="selectedFilterModel.status"
              label="By Status"
              name="filter-status"
              :options="statusOptions"
            />
            <i-select
              v-model="selectedFilterModel.userId"
              label="By userId"
              name="filter-userId"
              :options="userIdOptions"
            />
            <i-input v-model="selectedFilterModel.searchText" label="Search" name="filter-search" />
          </div>
        </div>
        <i-todo-list :filters-option="selectedFilterModel" />
      </template>
      <i-spinner v-else />
    </div>
  </div>
</template>
