import API from '../request';
export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const RECEIVE_DATA = 'RECEIVE_DATA';


function receiveDataAction (todos) {
  return {
    type: RECEIVE_DATA,
    todos    
  };
};

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

export function handleInitialData () {
  return (dispatch) => {
    return API.get().then( todos => {
        dispatch(receiveDataAction(todos.data));
      }).catch ( error => {
        console.log('Error ' + error);
        dispatch(receiveDataAction([]));
    });
  };
};

export function handleDeleteTodo (todo) {
    return (dispatch) => {
      dispatch(removeTodoAction(todo.id));
      return API.delete(`/${todo.id}`)
        .catch( error => {
          console.log('Error ' + error);
          dispatch(addTodoAction(todo));
          alert('An error occurred. Try again.');
        });
    };
};

export function handleAddTodo (name, cb) {
    return (dispatch) => {
      return API.post(`/`, {
        name,
        complete: false
      }).then( todo => {
          dispatch(addTodoAction(todo.data));
          cb();
        })
        .catch( error => {
          console.log('Error ' + error);
          alert('There was an error. Try again.')
        });
    };
};

export function handleToggle (id, complete) {
    return (dispatch) => {
      dispatch(toggleTodoAction(id));
      return API.put(`/${id}`, {complete: !complete})
        .catch( error => {
          console.log('Error ' + error);
          dispatch(toggleTodoAction(id));
          alert('An error occurred. Try again.');
        });
    };
};