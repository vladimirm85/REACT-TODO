import {
    ADD_TODO,
    REMOVE_TODO,
    TOGGLE_TODO,
    FETCH_TODOS,
    SET_LOADER_STATUS
} from '../actions';

const initialState = {
    todos: [],
    loader: 'init'
}

export default (state = initialState, action) => {
    switch (action.type) {

        case ADD_TODO:
            return {
                ...state,
                todos: [...state.todos, action.payload.todo]
            };

        case REMOVE_TODO:
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload.id)
            };

        case TOGGLE_TODO:
            return {
                ...state,
                todos: state.todos.map(todo => todo.id !== action.payload.updatedTodo.id
                    ? todo
                    : {...action.payload.updatedTodo})
            };

        case FETCH_TODOS:
            return {
                ...state,
                todos: action.payload.todos
            };

        case SET_LOADER_STATUS:
            return {
                ...state,
                loader: action.payload.loaderStatus
            };

        default:
            return state;
    };
};