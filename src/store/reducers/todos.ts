import { ITodo } from 'types';
import { CHANGE_ALERT_STATE, START_FETCHING, STOP_FETCHING, GET_TODOS, REMOVE_TODO } from '../actions/types';

const initialState = {
  todos: [] as ITodo[],
  isLoading: false,
  alert: { variant: '', text: '', show: false },
};

export default function tableReducer(state = initialState, action: any) {
  switch (action.type) {
    case GET_TODOS:
      return {
        ...state,
        todos: action.todos,
      };
    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo: ITodo) => todo._id !== action.id),
      };
    case CHANGE_ALERT_STATE:
      return {
        ...state,
        alert: { ...state.alert, ...action.alert },
      };
    case START_FETCHING:
      return {
        ...state,
        isLoading: true,
      };
    case STOP_FETCHING:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
