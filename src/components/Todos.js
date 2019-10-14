import React, { Component } from 'react';
import { connect } from 'react-redux';
import { InputGroup, FormControl, Button, Tabs, Tab} from 'react-bootstrap';
import AllTodos from './todoTabs/allTodos.js';
import CompletedTodos from './todoTabs/completedTodos.js';
import IncompletedTodos from './todoTabs/incompletedTodos.js';
import {
  handleAddTodo,
  handleDeleteTodo,
  handleToggle
} from '../actions';

class Todos extends Component {
  
  addTodo = (e) => {
    if (this.inputs.value) {
      e.preventDefault();
      this.props.dispatch(handleAddTodo(
        this.inputs.value,
        () => this.inputs.value = ''
      ));
    };
  };

  removeTodo = (todo) => {
    this.props.dispatch(handleDeleteTodo(todo));
  };

  toggleTodo = (id, complete) => {
    this.props.dispatch(handleToggle(id, complete));
  };

  render() {

    return (
      <div className="container">
        <h1 className="col-6 text-center">Todo List</h1>
        <div className="col-6">
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Add Todo"
              aria-label="Add Todo"
              ref={(input) => this.inputs = input}
            />
            <InputGroup.Append>
              <Button
                variant="outline-secondary"
                onClick={this.addTodo}
              >
                Add Todo
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </div>

        <div className="col-6">
          <Tabs id="controlled-tab-example" onSelect={() => {}}>
            <Tab eventKey="todo" title="Todo">
              <IncompletedTodos
                  todos={this.props.todos}
                  toggleTodo={this.toggleTodo}
                  removeTodo={this.removeTodo}
                /> 
            </Tab>
            <Tab eventKey="comleted" title="Comleted">
              <CompletedTodos
                todos={this.props.todos}
                toggleTodo={this.toggleTodo}
                removeTodo={this.removeTodo}
              />            
            </Tab>
            <Tab eventKey="allTodos" title="All todos">
              <AllTodos
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
  todos: state.todosReducers
}))(Todos);