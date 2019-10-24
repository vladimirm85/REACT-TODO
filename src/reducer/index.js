import {
    ADD_TODO,
    REMOVE_TODO,
    TOGGLE_TODO,
    RECEIVE_DATA,
    TOGGLE_LOADING
} from '../actions';

const initialState = {
  todos: [],
  loading: false
}

export default function todosReducer (state = initialState, action) {

    switch(action.type) {

      case ADD_TODO :
        return {
          ...state,
          todos: [...state.todos, action.todo]
        };

      case REMOVE_TODO :
        return {
          ...state,
          todos: state.todos.filter((todo) => todo.id !== action.id)
        };

      case TOGGLE_TODO :
        const updatedTodos = [...state.todos]
        const index = updatedTodos.findIndex(todo => todo.id === action.id);
        const updatedTodo = {
          ...updatedTodos[index],
          complete: !updatedTodos[index].complete
        }
        updatedTodos[index] = updatedTodo;
        return {
          ...state,
          todos: updatedTodos
        };

      case RECEIVE_DATA :
        return {
          ...state,
          todos: action.todos
        };

      case TOGGLE_LOADING:
        return {
          ...state,
          loading: !state.loading
        };

      default :
        return state;
    };
};