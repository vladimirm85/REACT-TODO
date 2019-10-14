import axios from 'axios';

export default axios.create({
  baseURL: `https://srapi-todo-api.herokuapp.com/todos`
});