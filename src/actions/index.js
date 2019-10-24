import axios from 'axios';

export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const RECEIVE_DATA = 'RECEIVE_DATA';
export const TOGGLE_LOADING = 'TOGGLE_LOADING';

const API = axios.create({
    baseURL: `https://srapi-todo-api.herokuapp.com/todos`
});


const receiveDataAction = todos => {
    return {
        type: RECEIVE_DATA,
        todos
    };
};

const addTodoAction = todo => {
    return {
        type: ADD_TODO,
        todo
    };
};

const removeTodoAction = id => {
    return {
        type: REMOVE_TODO,
        id
    };
};

const toggleTodoAction = id => {
    return {
        type: TOGGLE_TODO,
        id
    };
};

const toggleLoading = () => {
    return {
        type: TOGGLE_LOADING
    };
};

export function handleInitialData() {
    return dispatch => {
        dispatch(toggleLoading());
        return API.get().then(todos => {
            dispatch(receiveDataAction(todos.data));
        }).catch(error => {
            console.log('Error ' + error);
            dispatch(receiveDataAction([]));
        }).finally(() => {
            dispatch(toggleLoading());
        });
    };
};

export function handleAddTodo(name) {
    return dispatch => {
        dispatch(toggleLoading());
        return API.post('/', {
            name,
            complete: false
        }).then(todo => {
            dispatch(addTodoAction(todo.data));
        }).catch(error => {
            console.log('Error ' + error);
            alert('There was an error. Try again.')
        }).finally(() => {
            dispatch(toggleLoading());
        });
    };
};

export function handleDeleteTodo(todo) {
    return dispatch => {
        dispatch(toggleLoading());
        return API.delete(`/${todo.id}`).then(response => {
            dispatch(removeTodoAction(todo.id));
        }).catch(error => {
            console.log('Error ' + error);
            dispatch(addTodoAction(todo));
            alert('An error occurred. Try again.');
        }).finally(() => {
            dispatch(toggleLoading());
        });
    };
};

export function handleToggleTodo(id, complete) {
    return dispatch => {
        dispatch(toggleLoading());
        return API.put(`/${id}`, { complete: !complete }).then(response => {
            dispatch(toggleTodoAction(id));
        }).catch(error => {
            console.log('Error ' + error);
            dispatch(toggleTodoAction(id));
            alert('An error occurred. Try again.');
        }).finally(() => {
            dispatch(toggleLoading());
        });
    };
};