import React from 'react';
import { Button, Col, Row } from 'react-bootstrap'

export default function AllTodos (props) {

    const todosRows = props.todos.map((todo) => {
        return (
            <Row key={'AllTodosRow' + todo.id} id={'Row' + todo.id}>
                <Col sm={1}>
                <input
                    type="checkbox"
                    key={'Input' + todo.id}
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
    });
    
    return (
        <div>
            {todosRows}
        </div>
  );
};