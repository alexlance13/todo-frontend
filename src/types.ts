export interface ITodo {
  imageName?: string;
  text: string;
  title: string;
  _id: string;
}

export interface ITodoFormState {
  image?: any;
  text: string;
  title: string;
}

export type AlertType = {
  variant: '' | 'success' | 'danger';
  text: string;
  show: boolean;
};

export type Optional<T extends Object> = { [key in keyof T]?: T[key] };
