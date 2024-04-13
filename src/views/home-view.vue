<script setup lang="ts">
import IUserInfo from '@/components/i-user-info.vue';
import IInput from '@/components/ui/I-input.vue';
import IButton from '@/components/ui/i-button.vue';
import FormValidator from '@/composable/form/validation/validate';
import { todoCreateRules } from '@/composable/form/validation/validationRules';
import { useTodosStore } from '@/stores/todos.store';
import { reactive, ref } from 'vue';

const todoStore = useTodosStore();

const createTodoModel = reactive({
  userId: '',
  title: ''
});

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
    </div>
  </div>
</template>