import React, { useEffect } from 'react';
import Todos from './Todos';
import { useDispatch } from 'react-redux';
import { handleInitialData } from '../actions';

export default () => {
    const dispatch = useDispatch();
    
    useEffect (() => {
        dispatch(handleInitialData())
    }, [dispatch]);

    return (
        <Todos />
    );
};