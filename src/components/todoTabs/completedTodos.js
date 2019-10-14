import React from 'react';
import { Button, Col, Row } from 'react-bootstrap'

export default function CompletedTodos (props) {

    const todosRows = props.todos.map((todo) => {
        if (todo.complete){
            return (
                <Row key={'CompletedTodosRow' + todo.id} id={'Row' + todo.id}>
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
        return;
    });
    
    return (
        <div>
            {todosRows}
        </div>
  );
};