import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Row } from 'react-bootstrap';

const TodosTab = props => 
    <>
        {props.todos.map(todo =>
            <Row key={'AllTodosRow' + todo.id} id={'Row' + todo.id}>
                <Col sm={1}>
                    <input
                        type="checkbox"
                        key={'Input' + todo.id}
                        onClick={() => { props.toggleTodo({...todo, isCompleted: !todo.isCompleted})}}
                        checked={todo.isCompleted}
                        readOnly />
                </Col>
                <Col style={{ wordBreak: 'break-word' }} >{todo.name}</Col>
                <Col sm={0}>
                    <Button onClick={() => { props.removeTodo(todo.id) }}>X</Button>
                </Col>
            </Row>
        )}
    </>
;

TodosTab.propTypes = {
    todos: PropTypes.array.isRequired,
    toggleTodo: PropTypes.func.isRequired,
    removeTodo: PropTypes.func.isRequired
};


export default TodosTab;