import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { publicRoutes, privateRoutes } from 'routes';
import ProtectedRoute from 'components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes.map((route, index) => {
          return <Route key={index} path={route.path} element={route.component} />;
        })}

        <Route path="/" element={<ProtectedRoute />}>
          {privateRoutes.map((route, index) => {
            return <Route key={index} path={route.path} element={route.component} />;
          })}
        </Route>

        <Route path="*" element={<h4>Trang web khôn tồn tại</h4>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
