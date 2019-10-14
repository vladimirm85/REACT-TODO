import checker from './checker.js';
import logger from './logger.js';
import thunk from 'redux-thunk';
import  { applyMiddleware } from 'redux';

export default applyMiddleware(
    checker,
    logger,
    thunk
);