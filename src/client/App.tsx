import React from 'react';
import { Route, Routes } from 'react-router-dom';
import routes from './routes';

const App: React.FC = () => {
  return (
    <Routes>
      {routes.map(({ path, element: Element }, index) => (
        <Route key={index} path={path} element={<Element />} />
      ))}
    </Routes>
  );
};

export default App;
