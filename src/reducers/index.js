import { combineReducers } from 'redux';
import goalsReducers from './goalsReducers.js';
import todosReducers from './todosReducers.js';
import loadingReducers from './loadingReducers.js';

export default combineReducers({
    goalsReducers,
    todosReducers,
    loadingReducers
});