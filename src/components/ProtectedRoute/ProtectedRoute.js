import React from 'react';
import { Navigate, Outlet } from 'react-router';

import { routes } from 'config';

function ProtectedRoute() {
  const jwt_todo = localStorage.getItem('jwt-todo');

  return jwt_todo ? <Outlet /> : <Navigate to={routes.login} />;
}

export default ProtectedRoute;
