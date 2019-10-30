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

const reducer = (state = initialState, action) => {

    switch (action.type) {

        case ADD_TODO:
            return {
                ...state,
                todos: [...state.todos, action.todo]
            };

        case REMOVE_TODO:
            return {
                ...state,
                todos: state.todos.filter((todo) => todo.id !== action.id)
            };

        case TOGGLE_TODO:
            return {
                ...state,
                todos: state.todos.map(todo => todo.id !== action.updatedTodo.id
                    ? todo
                    : {...action.updatedTodo})
            };

        case FETCH_TODOS:
            return {
                ...state,
                todos: action.todos
            };

        case SET_LOADER_STATUS:
            return {
                ...state,
                loader: action.loaderStatus
            };

        default:
            return state;
    };
};

export default reducer;