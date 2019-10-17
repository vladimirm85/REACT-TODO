import React from 'react';
import ConnectedTodos from './Todos';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions';

class App extends React.Component {

  componentDidMount () {
    this.props.dispatch(handleInitialData());
  };

  render() {
    return (
      this.props.loading
      ?<h3>Loading</h3>
      :<div>
        <ConnectedTodos />
      </div>
    );
  }
};

export default connect((state) => ({
  loading: state.loadingReducers
}))(App);