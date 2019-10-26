import {
    ADD_TODO,
    REMOVE_TODO,
    TOGGLE_TODO,
    RECEIVE_DATA,
    LOADER_PENDING,
    LOADER_READY
} from '../actions';

const initialState = {
    todos: [],
    loading: 'init'
}

export default function todosReducer(state = initialState, action) {

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
                todos: state.todos.map(todo => todo.id !== action.id
                    ? {...todo}
                    : {...todo, isCompleted: !todo.isCompleted})
            };

        case RECEIVE_DATA:
            return {
                ...state,
                todos: action.todos
            };

        case LOADER_PENDING:
            return {
                ...state,
                loading: true
            };

        case LOADER_READY:
            return {
                ...state,
                loading: false
            };

        default:
            return state;
    };
};