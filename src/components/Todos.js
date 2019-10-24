import React from 'react';
import { connect } from 'react-redux';
import { Button, Tabs, Tab, Form} from 'react-bootstrap';
import TodosTabs from './todoTabs';
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
    {eventKey: "todos", title: "Uncompleted", todos: this.props.todos.filter(todo => !todo.complete)},
    {eventKey: "comletedTodos", title: "Completed", todos: this.props.todos.filter(todo => !!todo.complete)},
    {eventKey: "AllTodos", title: "All todos", todos: this.props.todos}
  ];

  addTodo = event => {
    const inputForm = event.currentTarget.inputform;
    if (inputForm.value) {
      event.preventDefault();
      event.stopPropagation();
      this.props.dispatch(handleAddTodo(inputForm.value));
      inputForm.value = '';
    };
  };

  removeTodo = (todo) => {
    this.props.dispatch(handleDeleteTodo(todo));
  };

  toggleTodo = (id, complete) => {
    this.props.dispatch(handleToggleTodo(id, complete));
  };

  render() {
    return (
      this.props.loading
      ?<h3>Loading</h3>
      :<div className="container">
        <h1 className="col-6 text-center">Todo List</h1>
        <div className="col-6">
          <Form onSubmit={this.addTodo}>
            <Form.Row>
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
          <Tabs id="todostab" activeKey={this.state.activTabKey} onSelect={key => this.setState({activTabKey: key})}>
            {
                this.getTabs().map(tab => 
                <Tab key={tab.eventKey} eventKey={tab.eventKey} title={tab.title}>
                <TodosTabs
                    todos={tab.todos}
                    toggleTodo={this.toggleTodo}
                    removeTodo={this.removeTodo}
                    /> 
                </Tab>)
            }
          </Tabs>         
        </div>
      </div>
    );
  };
}

export default connect((state) => ({
  todos: state.todos,
  loading: state.loading
}))(Todos);