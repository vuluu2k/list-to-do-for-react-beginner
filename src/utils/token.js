import axios from 'axios';

const setToken = token => {
  if (token) {
    localStorage.setItem('jwt-todo', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common[`Authorization`];
  }
};
export { setToken };
