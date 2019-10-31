import axios from 'axios';
const API = axios.create({
    baseURL: `https://heroku-strapi-todo-api.herokuapp.com/todos`
});

export const FETCH_TODOS = 'FETCH_TODOS';
const getTodo = todos => ({
    type: FETCH_TODOS,
    payload: {
        todos
    }
});

export const ADD_TODO = 'ADD_TODO';
const addTodo = todo => ({
    type: ADD_TODO,
    payload: {
        todo
    }
});

export const REMOVE_TODO = 'REMOVE_TODO';
const removeTodo = id => ({
    type: REMOVE_TODO,
    payload: {
        id
    }
});

export const TOGGLE_TODO = 'TOGGLE_TODO';
const toggleTodo = updatedTodo => ({
    type: TOGGLE_TODO,
    payload: {
        updatedTodo
    }
});

export const SET_LOADER_STATUS = 'SET_LOADER_STATUS';
const setLoaderStatus = loaderStatus => ({
    type: SET_LOADER_STATUS,
    payload: {
        loaderStatus
    }
});

export const handleInitialData = () => {
    return dispatch => {
        dispatch(setLoaderStatus('pending'));
        return API.get().then(response => {
            dispatch(getTodo(response.data));
        }).catch(error => {
            console.log(error);
            alert('There was an error. Try again.');
        }).finally(() => {
            dispatch(setLoaderStatus('ready'));
        });
    };
};

export const handleAddTodo = name => {
    return dispatch => {
        dispatch(setLoaderStatus('pending'));
        return API.post('/', {
            name,
            isCompleted: false
        }).then(response => {
            dispatch(addTodo(response.data));
        }).catch(error => {
            console.log(error);
            alert('There was an error. Try again.');
        }).finally(() => {
            dispatch(setLoaderStatus('ready'));
        });
    };
};

export const handleDeleteTodo = todoId => {
    return dispatch => {
        dispatch(setLoaderStatus('pending'));
        return API.delete(`/${todoId}`).then(response => {
            dispatch(removeTodo(todoId));
        }).catch(error => {
            console.log(error);
            alert('An error occurred. Try again.');
        }).finally(() => {
            dispatch(setLoaderStatus('ready'));
        });
    };
};

export const handleToggleTodo = (updatedTodo) => {
    return dispatch => {
        dispatch(setLoaderStatus('pending'));
        return API.put(`/${updatedTodo.id}`, updatedTodo).then(response => {
            dispatch(toggleTodo(response.data));
        }).catch(error => {
            console.log(error);
            alert('An error occurred. Try again.');
        }).finally(() => {
            dispatch(setLoaderStatus('ready'));
        });
    };
};