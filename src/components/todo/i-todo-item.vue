<script setup lang="ts">
import IButton from '@/components/ui/i-button.vue';
import { useTodosStore } from '@/stores/todos.store';
import { ActionEnum, type ITodo } from '@/types';
import { computed } from 'vue';

const todoStore = useTodosStore();

const { post } = defineProps<{ post: ITodo }>();

const emits = defineEmits(['updateFavorites']);

const isFavorite = computed(() => todoStore.getFavorites.includes(post.id));

const updateFavorites = () => {
  const action = isFavorite.value ? ActionEnum.REMOVE_FAVORITE : ActionEnum.ADD_FAVORITE;
  emits('updateFavorites', { action, id: post.id });
};
</script>

<template>
  <li class="todo__item">
    <h3 class="todo__title">
      {{ post.title }}
    </h3>
    <i-button @click="updateFavorites">
      {{ isFavorite ? 'Remove from Favorites' : 'Add to Favorites' }}
    </i-button>
  </li>
</template>
