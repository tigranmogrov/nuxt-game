export enum StatusFilterOptionEnum {
  ALL = 'all',
  COMPLETED = 'completed',
  UNCOMPLETED = 'uncompleted',
  FAVORITES = 'favorites'
}

export interface ISelectStatusOptions {
  value: string;
  name: string;
}

export interface ISelectedFilters {
  status: string;
  userId: string;
  searchText: string;
}
