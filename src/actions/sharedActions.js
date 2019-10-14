import * as goalsApiRequest from '../request/goalsRequest.js';
import * as todosApiRequest from '../request/todosRequest.js';
export const RECEIVE_DATA = 'RECEIVE_DATA';

function receiveDataAction (todos, goals) {
    return {
      type: RECEIVE_DATA,
      todos,
      goals
    };
};

export function handleInitialData () {
    return (dispatch) => {
      return Promise.all([
        todosApiRequest.getTodos(),
        goalsApiRequest.getGoals()
      ]).then(([ todos, goals ]) => {
        dispatch(receiveDataAction(todos, goals));
      });
    };
};