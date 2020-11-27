import { CHANGE_ALERT_STATE, REMOVE_TODO, GET_TODOS, START_FETCHING, STOP_FETCHING } from './types';
import axios from 'axios';
import { AlertType, ITodo, ITodoFormState, Optional } from 'types';

function getTodosAction(todos: ITodo[]) {
  return {
    type: GET_TODOS,
    todos,
  };
}

function changeAlertAction(alert: Optional<AlertType>) {
  return {
    type: CHANGE_ALERT_STATE,
    alert,
  };
}

function removeTodoAction(id: string) {
  return {
    type: REMOVE_TODO,
    id,
  };
}

function startFetching() {
  return {
    type: START_FETCHING,
  };
}
function stopFetching() {
  return {
    type: STOP_FETCHING,
  };
}

export function getTodos() {
  return async (dispatch: any) => {
    try {
      dispatch(startFetching());
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/todos`);
      dispatch(stopFetching());
      dispatch(getTodosAction(res.data));
    } catch (e) {
      dispatch(stopFetching());
      console.error('Getting todos error: ', e);
    }
  };
}

export function removeTodo(id: string) {
  return async (dispatch: any) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/todos/${id}`);
      dispatch(removeTodoAction(id));
    } catch (e) {
      console.error('Removing todo error: ', e);
    }
  };
}

export function createTodo(todoFormState: ITodoFormState) {
  return async (dispatch: any) => {
    try {
      const data = new FormData();
      for (const [key, value] of Object.entries(todoFormState)) {
        data.append(key, key === 'image' ? value[0] : value);
      }
      await axios.post(`${process.env.REACT_APP_API_URL}/todos`, data);
      dispatch(changeAlertAction({ variant: 'success', text: 'Todo was successfully added', show: true }));
    } catch (e) {
      dispatch(changeAlertAction({ variant: 'danger', text: e, show: true }));
      console.error('Removing todo error: ', e);
    } finally {
      setTimeout(() => dispatch(changeAlertAction({ show: false })), 5000);
    }
  };
}
