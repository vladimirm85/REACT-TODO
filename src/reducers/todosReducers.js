import {
    ADD_TODO,
    REMOVE_TODO,
    TOGGLE_TODO,
    RECEIVE_DATA,
    TOGGLE_LOADING
} from './../actions';

const initialState = {
  todos: [],
  loading: false
}

export default function todosReducer (state = initialState, action) {

    switch(action.type) {

      case ADD_TODO :
        state = {
          ...state,
          todos: [...state.todos, action.todo]
        };
        return state;

      case REMOVE_TODO :
        state = {
          ...state,
          todos: state.todos.filter((todo) => todo.id !== action.id)
        };
        return state;

      case TOGGLE_TODO :
        const newState = {...state};
        const newTodos = [...newState.todos]
        const index = newTodos.findIndex(todo => todo.id === action.id);
        newTodos[index] = {
          ...newTodos[index],
          complete: !newTodos[index].complete
        }
        newState.todos = newTodos;
        return newState;

      case RECEIVE_DATA :
        state = {
          ...state,
          todos: action.todos
        };
        return state;

      case TOGGLE_LOADING:
          state = {
            ...state,
            loading: !state.loading
          };
          return state;

      default :
        return state;
    };
};