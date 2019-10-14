import * as apiRequest from '../request/goalsRequest.js';
export const ADD_GOAL = 'ADD_GOAL';
export const REMOVE_GOAL = 'REMOVE_GOAL';

function addGoalAction (goal) {
    return {
      type: ADD_GOAL,
      goal
    };
};

function deleteGoalAction (id) {
    return {
      type: REMOVE_GOAL,
      id
    };
};

export function handleAddGoal (name, cb) {
    return (dispatch) => {
      return apiRequest.addGoal(name)
        .then((goal) => {
          dispatch(addGoalAction(goal));
          cb();
        })
        .catch(() => alert('There was an error. Try again.'));
    };
};

export function handleDeleteGoal (goal) {
    return (dispatch) => {
      dispatch(deleteGoalAction(goal.id));
      return apiRequest.deleteGoal(goal.id)
        .catch(() => {
          dispatch(addGoalAction(goal));
          alert('An error occurred. Try again.');
        });
    };
};