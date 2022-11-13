import React from 'react';
import { Navigate } from 'react-router';

import { routes } from 'config';

function Home() {
  return <Navigate to={routes.login} />;
}

export default Home;
