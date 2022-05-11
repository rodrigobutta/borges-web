import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainRoutes from './MainRoutes';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path={'/*'} element={<MainRoutes />} />
      </Routes>
      <div id='alertMessageDiv'></div>
    </Router>
  );
};

export default AppRoutes;
