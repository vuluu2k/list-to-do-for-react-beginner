import axios from 'axios';
import './GlobalWrapper.scss';

axios.defaults.baseURL = 'https://farm-api-todo.herokuapp.com/';

function GlobalWrapper({ children }) {
  return children;
}

export default GlobalWrapper;
