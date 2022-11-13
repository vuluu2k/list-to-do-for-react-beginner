// pages
import Login from 'pages/Login';
import SignUp from 'pages/Register';
import ToDoList from 'pages/ToDo';
import Home from 'pages/Home';

// config
import { routes } from 'config';

const publicRoutes = [
  {
    path: routes.home,
    component: <Home />,
  },
  {
    path: routes.login,
    component: <Login />,
  },
  {
    path: routes.register,
    component: <SignUp />,
  },
];

const privateRoutes = [
  {
    path: routes.todo,
    component: <ToDoList />,
  },
];

export { publicRoutes, privateRoutes };
