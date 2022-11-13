const API_URL = process.env.NODE_ENV === 'production' ? 'https://farm-api-todo.herokuapp.com/' : 'https://farm-api-todo.herokuapp.com/';

const routes = {
  home: '/',
  login: '/login',
  register: '/register',
  todo: '/todo',
};

export { routes };

export default API_URL;
