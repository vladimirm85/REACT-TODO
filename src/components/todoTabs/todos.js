import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Row } from 'react-bootstrap';

const CompletedTodos = (props) => {

    const todosRows = props.todos.map((todo) => {
        if (todo.complete === props.complete){
            return (
                <Row key={'Row' + todo.id} id={'Row' + todo.id}>
                    <Col sm={1}>
                    <input
                        key={'Input' + todo.id}
                        type="checkbox"
                        onClick={() => {props.toggleTodo(todo.id, todo.complete)}}
                        checked={todo.complete}
                        readOnly
                    />
                    </Col>
                    <Col>{todo.name}</Col>
                    <Col sm={1}>
                    <Button onClick={() => {props.removeTodo(todo)}}>X</Button>
                    </Col>        
                </Row>
            );
        };
    });
    
    return (
        <div>
            {todosRows}
        </div>
  );
};

CompletedTodos.propTypes = {
    todos: PropTypes.array.isRequired,
    toggleTodo: PropTypes.func.isRequired,
    removeTodo: PropTypes.func.isRequired,
    complete: PropTypes.bool.isRequired
};


export default CompletedTodos;