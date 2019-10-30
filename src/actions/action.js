import axios from 'axios';
const API = axios.create({
    baseURL: `https://heroku-strapi-todo-api.herokuapp.com/todos`
});

export const FETCH_TODOS = 'RECEIVE_DATA';
const getTodo = todos => ({type: FETCH_TODOS, todos});

export const ADD_TODO = 'ADD_TODO';
const addTodo = todo => ({type: ADD_TODO, todo});

export const REMOVE_TODO = 'REMOVE_TODO';
const removeTodo = id => ({type: REMOVE_TODO, id});

export const TOGGLE_TODO = 'TOGGLE_TODO';
const toggleTodo = updatedTodo => ({type: TOGGLE_TODO, updatedTodo});

export const SET_LOADER_STATUS = 'SET_LOADER_STATUS';
const setLoaderStatus = loaderStatus => ({type: SET_LOADER_STATUS, loaderStatus});

const handleInitialData = () => {
    return dispatch => {
        dispatch(setLoaderStatus('pending'));
        return API.get().then(response => {
            dispatch(getTodo(response.data));
        }).catch(error => {
            console.log('Error ' + error);
            alert('There was an error. Try again.');
        }).finally(() => {
            dispatch(setLoaderStatus('ready'));
        });
    };
};

const handleAddTodo = name => {
    return dispatch => {
        dispatch(setLoaderStatus('pending'));
        return API.post('/', {
            name,
            isCompleted: false
        }).then(response => {
            dispatch(addTodo(response.data));
        }).catch(error => {
            console.log('Error ' + error);
            alert('There was an error. Try again.');
        }).finally(() => {
            dispatch(setLoaderStatus('ready'));
        });
    };
};

const handleDeleteTodo = todoId => {
    return dispatch => {
        dispatch(setLoaderStatus('pending'));
        return API.delete(`/${todoId}`).then(response => {
            dispatch(removeTodo(todoId));
        }).catch(error => {
            console.log('Error ' + error);
            alert('An error occurred. Try again.');
        }).finally(() => {
            dispatch(setLoaderStatus('ready'));
        });
    };
};

const handleToggleTodo = (updatedTodo) => {
    return dispatch => {
        dispatch(setLoaderStatus('pending'));
        return API.put(`/${updatedTodo.id}`, updatedTodo).then(response => {
            dispatch(toggleTodo(response.data));
        }).catch(error => {
            console.log('Error ' + error);
            alert('An error occurred. Try again.');
        }).finally(() => {
            dispatch(setLoaderStatus('ready'));
        });
    };
};

export { handleInitialData, handleAddTodo, handleDeleteTodo, handleToggleTodo };