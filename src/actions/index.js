import axios from 'axios';
const API = axios.create({
    baseURL: `https://heroku-strapi-todo-api.herokuapp.com/todos`
});

export const RECEIVE_DATA = 'RECEIVE_DATA';
const getTodo = todos => ({type: RECEIVE_DATA, todos});

export const ADD_TODO = 'ADD_TODO';
const addTodo = todo => ({type: ADD_TODO, todo});

export const REMOVE_TODO = 'REMOVE_TODO';
const removeTodo = id => ({type: REMOVE_TODO, id});

export const TOGGLE_TODO = 'TOGGLE_TODO';
const toggleTodo = id => ({type: TOGGLE_TODO, id});

export const LOADER_PENDING = 'LOADER_PENDING';
const loaderPending = () => ({type: LOADER_PENDING});

export const LOADER_READY = 'LOADER_READY';
const loaderReady = () => ({type: LOADER_READY});

const handleInitialData = () => {
    return dispatch => {
        dispatch(loaderPending());
        return API.get().then(todos => {
            dispatch(getTodo(todos.data));
        }).catch(error => {
            console.log('Error ' + error);
            alert('There was an error. Try again.');
        }).finally(() => {
            dispatch(loaderReady());
        });
    };
};

const handleAddTodo = name => {
    return dispatch => {
        dispatch(loaderPending());
        return API.post('/', {
            name,
            isCompleted: false
        }).then(todo => {
            dispatch(addTodo(todo.data));
        }).catch(error => {
            console.log('Error ' + error);
            alert('There was an error. Try again.');
        }).finally(() => {
            dispatch(loaderReady());
        });
    };
};

const handleDeleteTodo = todo => {
    return dispatch => {
        dispatch(loaderPending());
        return API.delete(`/${todo.id}`).then(response => {
            dispatch(removeTodo(todo.id));
        }).catch(error => {
            console.log('Error ' + error);
            alert('An error occurred. Try again.');
        }).finally(() => {
            dispatch(loaderReady());
        });
    };
};

const handleToggleTodo = (id, isCompleted) => {
    return dispatch => {
        dispatch(loaderPending());
        return API.put(`/${id}`, { isCompleted: !isCompleted }).then(response => {
            dispatch(toggleTodo(id));
        }).catch(error => {
            console.log('Error ' + error);
            alert('An error occurred. Try again.');
        }).finally(() => {
            dispatch(loaderReady());
        });
    };
};

export { handleInitialData, handleAddTodo, handleDeleteTodo, handleToggleTodo };