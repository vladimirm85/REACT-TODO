import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Row } from 'react-bootstrap';

const AllTodos = props => 
    <div>
        {props.todos.map(todo =>
            <Row key={'AllTodosRow' + todo.id} id={'Row' + todo.id}>
                <Col sm={1}>
                    <input
                        type="checkbox"
                        key={'Input' + todo.id}
                        onClick={() => { props.toggleTodo(todo.id, todo.isCompleted) }}
                        checked={todo.isCompleted}
                        readOnly
                    />
                </Col>
                <Col>{todo.name}</Col>
                <Col sm={1}>
                    <Button onClick={() => { props.removeTodo(todo) }}>X</Button>
                </Col>
            </Row>
        )}
    </div>
;

AllTodos.propTypes = {
    todos: PropTypes.array.isRequired,
    toggleTodo: PropTypes.func.isRequired,
    removeTodo: PropTypes.func.isRequired
};


export default AllTodos;