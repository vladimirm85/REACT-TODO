import React, { Component } from 'react';
import ConnectedTodos from './Todos';
import ConnectedGoals from './Goals';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/sharedActions.js';

class App extends Component {

  componentDidMount () {
    const { dispatch } = this.props;
    dispatch(handleInitialData());
  };

  render() {
    
    const { loading } = this.props;

    if (loading === true) {
      return <h3>Loading</h3>
    };

    return (
      <div>
        <ConnectedTodos />
        <ConnectedGoals />
      </div>
    );
  };
};

export default connect((state) => ({
  loading: state.loadingReducers
}))(App);