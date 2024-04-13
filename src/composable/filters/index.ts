import { useTodosStore } from '@/stores/todos.store';
import type { ITodo } from '@/types';

enum StatusFilterOptionEnum {
  AlL = 'all',
  COMPLETED = 'completed',
  UNCOMPLETED = 'uncompleted',
  FAVORITES = 'favorites'
}

const filterCompleted = (todos: ITodo[], status: boolean = true): ITodo[] => {
  return todos.filter((todo: ITodo) => todo.completed === status);
};

const filterFavorites = (todos: ITodo[]): ITodo[] => {
  const todoStore = useTodosStore();
  if (todoStore.getFavorites) {
    return todos.filter((todo: ITodo) => todoStore.getFavorites.includes(todo.id));
  }
  return [];
};

const filterStatusOptions = new Map<StatusFilterOptionEnum, (todos: ITodo[]) => ITodo[]>([
  [StatusFilterOptionEnum.AlL, (todos: ITodo[]) => todos],
  [StatusFilterOptionEnum.COMPLETED, (todos: ITodo[]) => filterCompleted(todos)],
  [StatusFilterOptionEnum.UNCOMPLETED, (todos: ITodo[]) => filterCompleted(todos, false)],
  [StatusFilterOptionEnum.FAVORITES, (todos: ITodo[]) => filterFavorites(todos)]
]);
export const filterByStatus = (todos: ITodo[], option: string) => {
  const filterFunction = filterStatusOptions.get(option as StatusFilterOptionEnum);
  return filterFunction ? filterFunction(todos) : todos;
};

export const filterByUserId = (todos: ITodo[], option: string) => {
  return option === 'all' ? todos : todos.filter((todo: ITodo) => todo.userId === Number(option));
};

export const searchByText = (todos: ITodo[], titleText: string) => {
  const text = titleText.trim().toLowerCase();
  return text ? todos.filter((todo: ITodo) => todo.title.toLowerCase().includes(text)) : todos;
};
