import React, { Component } from 'react';
import * as todosRequest from './../request/todosRequest.js'
import * as goalsRequest from './../request/goalsRequest.js'

class App extends Component {
  state = {
    todos: [],
    goals: []
  }

  componentDidMount() {
    todosRequest.getTodos().then((todos) => {
      this.setState({todos});
    });
    goalsRequest.getGoals().then((goals) => {
      this.setState({goals});
    });
  }

  addTodo(name) {
    todosRequest.addTodo(name).then( todo => {
      const todos = [...this.state.todos];
      todos.push(todo);
      this.setState({todos});
    });
  }

  updateTodo(id, complete) {
    todosRequest.updateTodo(id, complete).then( todo => {
      const todos = [...this.state.todos];
      const index = todos.findIndex(todo => todo.id === id);
      todos[index] = todo;
      this.setState({todos});
    });
  }

  deleteTodo(id) {
    todosRequest.deleteTodo(id).then( response => {
      const todos = [...this.state.todos];
      const index = todos.findIndex(todo => todo.id === id);
      todos.splice(index, 1);
      this.setState({todos});
    });
  }

  addGoal(name) {
    goalsRequest.addGoal(name).then( goal => {
      const goals = [...this.state.goals];
      goals.push(goal);
      this.setState({goals});
    });
  }

  deleteGoal(id) {
    goalsRequest.deleteGoal(id).then( response => {
      const goals = [...this.state.goals];
      const index = goals.findIndex(goal => goal.id === id);
      goals.splice(index, 1);
      this.setState({goals});
    });
  }

  render() {

    const todos = this.state.todos.map(todo => 
      <li key={todo.id}>
        <span key={'span ' + todo.id} onClick={()=>{this.updateTodo(todo.id, todo.complete)}}>
          {'ID: ' + todo.id +
          ' Name: ' + todo.name +
          ' Complete: ' + todo.complete}
        </span>
        <button onClick={()=>{this.deleteTodo(todo.id)}}>
          X
        </button>
      </li>
    )

    const goals = this.state.goals.map(goal => 
      <li key={goal.id}>
        <span key={'span ' + goal.id}>
          {'ID: ' + goal.id +
          ' Name: ' + goal.name}
        </span>
        <button onClick={()=>{this.deleteGoal(goal.id)}}>
          X
        </button>
      </li>
    )

    return (
      <div>
        <h1>TODOS</h1>
        <input
          key='todo-input'
          placeholder='Add todo'
          ref={(input) => this.todoInput = input}
        ></input>
        <button
          onClick={()=>{
            this.addTodo(this.todoInput.value);
            this.todoInput.value=''
          }}
        >
          Add todo
        </button>
        <ul>
          {todos}
        </ul>
        <h1>GOALS</h1>
        <input
          key='goal-input'
          placeholder='Add goal'
          ref={(input) => this.goalInput = input}
        ></input>
        <button
          onClick={()=>{
            this.addGoal(this.goalInput.value);
            this.goalInput.value=''
          }}
        >
          Add goal
        </button>
        <ul>
          {goals}
          </ul>
      </div>
    )
  }
}

export default App;
