import React, { useEffect } from 'react';
import Todos from './Todos';
import { connect, useDispatch } from 'react-redux';
import { handleInitialData } from '../actions';

export default connect()(() => {
    const dispatch = useDispatch();
    
    useEffect (() => {
        dispatch(handleInitialData())
    }, [dispatch]);

    return (
        <Todos />
    );
});