import { combineReducers } from 'redux';
import todosReducers from './todosReducers.js';
import loadingReducers from './loadingReducers.js';

export default combineReducers({
    todosReducers,
    loadingReducers
});