<script setup lang="ts">
import ISpinner from '@/components/I-spinner.vue';
import IUserInfo from '@/components/i-user-info.vue';
import ITodoList from '@/components/todo/i-todo-list.vue';
import IInput from '@/components/ui/I-input.vue';
import ISelect from '@/components/ui/I-select.vue';
import IButton from '@/components/ui/i-button.vue';
import FormValidator from '@/composable/form/validation/validate';
import { todoCreateRules } from '@/composable/form/validation/validationRules';
import { useTodosStore } from '@/stores/todos.store';
import { storeToRefs } from 'pinia';
import { computed, reactive, ref } from 'vue';

export interface ISelectOptions {
  value: string;
  name: string;
}

const todoStore = useTodosStore();
const { isLoading, userIds } = storeToRefs(todoStore);

const createTodoModel = reactive({
  userId: '',
  title: ''
});
const selectedFilter = reactive<{ [key: string]: string }>({
  status: 'all',
  userId: 'all',
  searchText: ''
});
const statusOptions: ISelectOptions[] = [
  { name: 'All', value: 'all' },
  { name: 'Completed', value: 'completed' },
  { name: 'Uncompleted', value: 'uncompleted' },
  { name: 'Favorites', value: 'favorites' }
];
const userIdOptions = computed(() => [
  { name: 'All', value: 'all' },
  ...userIds.value.map((id: number) => ({ name: `User-${id}`, value: `${id}` }))
]);

const formValidator = new FormValidator(createTodoModel, todoCreateRules);
const fieldErrors = formValidator.getErrors();
const isDisabled = ref(false);

const createTodo = async () => {
  const errors = formValidator.validateForm();
  if (!errors) {
    isDisabled.value = true;
    await todoStore.createNewTodo({ ...createTodoModel, userId: Number(createTodoModel.userId) });
    createTodoModel.userId = '';
    createTodoModel.title = '';
    isDisabled.value = false;
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
              v-model="selectedFilter.status"
              label="By Status"
              name="filter-status"
              :options="statusOptions"
            />
            <i-select
              v-model="selectedFilter.userId"
              label="By userId"
              name="filter-userId"
              :options="userIdOptions"
            />
            <i-input v-model="selectedFilter.searchText" label="Search" name="filter-search" />
          </div>
        </div>
        <i-todo-list :filters-option="selectedFilter" />
      </template>
      <i-spinner v-else />
    </div>
  </div>
</template>
