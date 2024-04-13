export interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface ICreateTodo extends Pick<ITodo, 'userId' | 'title'> {}

export enum ActionEnum {
  ADD_FAVORITE = 'addFavorite',
  REMOVE_FAVORITE = 'removeFavorite'
}

export interface IUpdateFavoriteAction {
  action: ActionEnum;
  id: number;
}
