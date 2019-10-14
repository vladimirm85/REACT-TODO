import * as apiRequest from '../request/todosRequest.js';
export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';

function addTodoAction (todo) {
    return {
      type: ADD_TODO,
      todo
    };
};

function removeTodoAction (id) {
    return {
      type: REMOVE_TODO,
      id
    };
};
  
function toggleTodoAction (id) {
    return {
      type: TOGGLE_TODO,
      id
    };
};


export function handleDeleteTodo (todo) {
    return (dispatch) => {
      dispatch(removeTodoAction(todo.id));
      return apiRequest.deleteTodo(todo.id)
        .catch(() => {
          dispatch(addTodoAction(todo));
          alert('An error occurred. Try again.');
        });
    };
};

export function handleAddTodo (name, cb) {
    return (dispatch) => {
      return apiRequest.addTodo(name)
        .then((todo) => {
          dispatch(addTodoAction(todo));
          cb();
        })
        .catch(() => alert('There was an error. Try again.'));
    };
};

export function handleToggle (id) {
    return (dispatch) => {
      dispatch(toggleTodoAction(id));
      return apiRequest.toggleTodo(id)
        .catch(() => {
          dispatch(toggleTodoAction(id));
          alert('An error occurred. Try again.');
        });
    };
};