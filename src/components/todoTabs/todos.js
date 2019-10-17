import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';

export default function CompletedTodos (props) {

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