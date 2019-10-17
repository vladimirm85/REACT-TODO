import React from 'react';
import { connect } from 'react-redux';
import { Button, Tabs, Tab, Form} from 'react-bootstrap';
import AllTodosTab from './todoTabs/allTodos.js';
import TodosTab from './todoTabs/todos.js';
import {
  handleAddTodo,
  handleDeleteTodo,
  handleToggleTodo
} from '../actions';

class Todos extends React.Component {

  state = {
    activTabKey: 'todos'
  }

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
            <Tab eventKey="todos" title="Todo">
              <TodosTab
                  todos={this.props.todos}
                  toggleTodo={this.toggleTodo}
                  removeTodo={this.removeTodo}
                  complete={false}
                /> 
            </Tab>
            <Tab eventKey="comletedTodos" title="Comleted">
              <TodosTab
                todos={this.props.todos}
                toggleTodo={this.toggleTodo}
                removeTodo={this.removeTodo}
                complete={true}
                />
            </Tab>
            <Tab eventKey="allTodos" title="All todos">
              <AllTodosTab
                todos={this.props.todos}
                toggleTodo={this.toggleTodo}
                removeTodo={this.removeTodo}
              />
            </Tab>
          </Tabs>         
        </div>
      </div>
    );
  };
}

export default connect((state) => ({
  todos: state.todosReducers.todos,
  loading: state.todosReducers.loading
}))(Todos);