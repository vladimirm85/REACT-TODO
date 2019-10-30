import React from 'react';
import { connect } from 'react-redux';
import { Button, Tabs, Tab, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import TodosTab from './todoTab';
import {
    handleAddTodo,
    handleDeleteTodo,
    handleToggleTodo
} from '../actions';

class Todos extends React.Component {
    state = {
        activTabKey: 'todos'
    }

    getTabs = () => [
        { eventKey: "todos", title: "Uncompleted", todos: this.props.todos.filter(todo => !todo.isCompleted) },
        { eventKey: "comletedTodos", title: "Completed", todos: this.props.todos.filter(todo => todo.isCompleted) },
        { eventKey: "AllTodos", title: "All todos", todos: this.props.todos }
    ];

    addTodo = event => {
        event.preventDefault();
        event.stopPropagation();
        let newTodoTitle = event.currentTarget.inputform.value;
        if (newTodoTitle.trim()) {
            this.props.dispatch(handleAddTodo(newTodoTitle));
            newTodoTitle = '';
        };
    };

    removeTodo = todoId => {
        this.props.dispatch(handleDeleteTodo(todoId));
    };

    toggleTodo = updatedTodo => {
        this.props.dispatch(handleToggleTodo(updatedTodo));
    };

    render() {
        return (
            this.props.loader === 'pending'
                ? <h3>Loading</h3>
                : <div style={{ paddingLeft: '15%', paddingRight: '15%' }} className="container">
                    <h1 className="text-center">Todo List</h1>
                    <Form onSubmit={this.addTodo}>
                        <Form.Row style={{ justifyContent: 'center' }} >
                            <Form.Group controlId="inputform">
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Add Todo"
                                />
                            </Form.Group>
                            <Form.Group controlId="addTodoButton">
                                <Button variant="secondary" type="submit">Add Todo</Button>
                            </Form.Group>
                        </Form.Row>
                    </Form>
                    <Tabs id="todostab" activeKey={this.state.activTabKey} onSelect={key => this.setState({ activTabKey: key })}>
                        {this.getTabs().map(tab =>
                            <Tab key={tab.eventKey} eventKey={tab.eventKey} title={tab.title}>
                                <TodosTab
                                    todos={tab.todos}
                                    toggleTodo={this.toggleTodo}
                                    removeTodo={this.removeTodo}
                                />
                            </Tab>
                        )}
                    </Tabs>
                </div>
        );
    };
}

Todos.propTypes = {
    todos: PropTypes.array.isRequired,
    loader: PropTypes.string.isRequired
};

export default connect(state => ({
    todos: state.todos,
    loader: state.loader
}))(Todos);