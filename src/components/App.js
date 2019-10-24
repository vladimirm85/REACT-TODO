import React from 'react';
import Todos from './Todos';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions';

class App extends React.Component {

  componentDidMount () {
    this.props.dispatch(handleInitialData());
  };

  render() {
    return (
      <Todos />
    );
  }
};

export default connect()(App);